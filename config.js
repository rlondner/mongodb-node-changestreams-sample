"use strict";

var config = {
    //mongoDBUrl : "mongodb://localhost:27017,localhost:27018,localhost:27019/demo?replicaSet=rs"
    //mongoDBUrl : "mongodb+srv://36demo:w62OQe02utjcyyha@36-cluster-nebpx.mongodb.net/demo"
    mongoDBUrl : "mongodb://36demo:w62OQe02utjcyyha@36-cluster-shard-00-00-nebpx.mongodb.net:27017,36-cluster-shard-00-01-nebpx.mongodb.net:27017,36-cluster-shard-00-02-nebpx.mongodb.net:27017/demo?ssl=true&replicaSet=36-cluster-shard-0&authSource=admin"
}

module.exports = config