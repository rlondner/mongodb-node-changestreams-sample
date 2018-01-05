const MongoClient = require('mongodb');
var url = require('./config.js').mongoDBUrl;
const doc = {
  device: {
    name: "ecobee_1234",
    celsiusTemperature: 16,
    timeStamp: new Date()
  }
};

MongoClient.connect(url, (err, client) => {
  const coll = client.db("demo").collection("devices");
  coll.insert(doc).then(() => client.close());
});