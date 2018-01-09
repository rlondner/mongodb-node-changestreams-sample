conn = new Mongo("mongodb://localhost:27017,localhost:27018,localhost:27019/demo?replicaSet=rs");
db = conn.getDB("demo");
collection = db.stock;

var docToInsert = {
  name: "pineapple",
  quantity: 10
};

function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* do nothing */
  }
}

function create() {
  sleepFor(1000);
  print("500ms later");
  docToInsert.quantity = 10 + Math.floor(Math.random() * 10);
  res = collection.insert(docToInsert);
  print(res)
}

while (true) {
  create();
}
