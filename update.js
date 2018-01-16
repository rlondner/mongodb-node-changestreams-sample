const MongoClient = require('mongodb');
const url = require('./config.js').mongoDBUrl;
/*
const update = {
  //$set: { device: {celsiusTemperature:22} }, //this works with change streams
  $set: { 'device.celsiusTemperature': 22 }, //this doesn't work with change streams
  $currentDate: { 'device.timeStamp': true },
};
*/

const update = {
  $set: { 'celsiusTemperature': 23},
  $currentDate: { 'timeStamp': true }
};

MongoClient.connect(url, (err, client) => {
  const coll = client.db("demo").collection("devices");
  coll.update({"device.name": "ecobee_1234"}, update, { multi: true}).then(() => client.close());
});