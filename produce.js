const MongoClient = require('mongodb');
const url = require('./config.js').mongoDBUrl;
const now = Date.now();
let deviceName = "ecobee_1234";
/*
if(now % 2 == 0) {
  deviceName = "nest_5678"
}
*/
const doc = {
  device: {
    name: deviceName,
    celsiusTemperature: 16,
    timeStamp: new Date()
  }
};

MongoClient.connect(url, (err, client) => {
  const coll = client.db("demo").collection("devices");
  coll.insert(doc).then(() => client.close());
});