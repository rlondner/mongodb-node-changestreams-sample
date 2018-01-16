# MongoDB Change Streams Shell examples

## Replica set setup
MongoDB Change Streams require a replica set to work (i.e. they don't work with a standalone MongoDB server). Here are the instructions to start your local, single-node MongoDB 3.6 replica set:

1. Make sure [MongoDB 3.6+](https://www.mongodb.com/download-center#production) is installed and your machine and the MongoDB installation folder (containing tools such as `mongo` and `mongod`) is added to your local path.
1. Run `sh startRS.sh` to start a test, single-node replica set (in the `/data/rs1/db` sub-folder).
1. If you've started your replica set for the first time, run `sh initiateRS.sh` to initialize your replica set.
1. Run `mongo createProducts.js` to create products (one every second) in the `devices` collection of the `demo` database in your replica set. All of the documents created with that script have a `quantity` attribute greater or equal than 11.
1. In a separate Terminal console, start `sh insertChangeStream.sh` to monitor inserts of the products into your database. Note that the script logs the first change it captures, simulates an app failure for 10 seconds and then catches up the inserts it missed (using a resume token).
1. Stop the `insertChangeStream.sh` script and the `mongo createProducts.js` process (with `Ctrl+C`).
1. Run `sh updateChangeStream.sh` in a Terminal console to monitor quantity updates of documents in the `stock` collection. Specifically, this change stream only prints out document updates when the `quantity` attributes is set to a value lower or equal than 10.
1. Run `mongo updateProducts.js` to trigger `quantity` updates below 10 and watch changes being logged in the `sh updateChangeStream.sh` window.