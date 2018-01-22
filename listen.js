const MongoClient = require("mongodb");
const storage = require("node-persist");
const EJSON = require("mongodb-extjson");
const url = require("./config.js").mongoDBUrl;

getValue = function (obj, f) {
  return {
    $let: {
      vars: {
        foo: {
          $arrayElemAt: [
            { $filter: { input: { $objectToArray: obj }, cond: { $eq: [f, "$$this.k"] } } },
            0
          ]
        }
      },
      in: "$$foo.v"
    }
  };
}

const matchStage = {
  $match: {
    $or: [
      { "fullDocument.device.celsiusTemperature": { $gt: 15 } } //necessary to capture inserts\
      , 
      { //necessary to capture updates without fullDocument: 'updateLookup' option
        $expr: {
          $gt: [

            getValue("$updateDescription.updatedFields", "device.celsiusTemperature"),
            15
          ]
        }
      }
    ]
  }
};
const options = {
  fullDocument: "updateLookup"
};

const CS_TOKEN = "changeStreamResumeToken";

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.warn(err);
    return;
  }

  const coll = client.db("demo").collection("devices");
  let changeStream = coll.watch([matchStage]);
  // const changeStream = coll.watch();

  storage.init({ dir: "localStorage" }).then(() => {
    if (true) {
      storage
        .getItem(CS_TOKEN)
        .then(
        token => {
          if (token !== undefined) {
            console.log(`using resume token: ${token}`);
            changeStream = coll.watch([matchStage], {
              resumeAfter: EJSON.parse(token)
            });
          }
        },
        err => {
          console.log("error retrieving change stream resume token: " + err);
        }
        )
        .then(() => {
          console.log("polling change stream...");
          pollStream(changeStream, storage);
        });
    } else {
      changeStream.on("change", c => console.log(c));
    }
  });
});

function pollStream(cs, storage) {
  console.log("waiting for change stream...");
  cs.next((err, change) => {
    if (err) return console.log(err);
    resumeToken = EJSON.stringify(change._id);
    storage.setItem(CS_TOKEN, resumeToken)//.then(console.log(change));
    console.log(change);
    pollStream(cs, storage);
  });
}

