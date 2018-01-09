conn = new Mongo(
  "mongodb://localhost:27017,localhost:27018,localhost:27019/demo?replicaSet=rs"
);
db = conn.getDB("demo");
collection = db.stock;

const insertOps = {
  $match: { operationType: "insert" }
};
const lowVolumeUpdates = {
  $match: {
    $and: [
      { "fullDocument.quantity": { $lte: 10 } },
      { operationType: "update" }
    ]
  }
};

const options = {
  fullDocument: "updateLookup"
};

const changeStream = collection.watch([csFilter===0?insertOps:lowVolumeUpdates], options);

//pollStream(changeStream);
resumeStream(changeStream, true);

//this function polls a change stream and prints out each change as it comes in
function pollStream(changeStream) {
  if (changeStream.hasNext()) {
    cs = changeStream.next();
    print(JSON.stringify(cs));
  }
  pollStream(changeStream);
}

//this function is similar to the pollStream above. The only difference is that it prints out the first change right away, then simulates an app crash (for 10 seconds) and finally resumes processing the remaining changes by picking the change stream where it was left off (by using the resumeAfter option of the watch method)
function resumeStream(changeStream, forceResume = false) {
  let resumeToken;
  if (changeStream.hasNext()) {
    change = changeStream.next();
    print(JSON.stringify(change));
    resumeToken = change._id;
    if (forceResume === true) {
      print("\r\nSimulating app failure for 10 seconds...");
      sleepFor(10000);
      changeStream.close();
      const newChangeStream = collection.watch([insertOps], {
        resumeAfter: resumeToken
      });
      print("\r\nResuming change stream...\r\n");
      resumeStream(newChangeStream);
    }
  }
  resumeStream(changeStream);
}

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}
