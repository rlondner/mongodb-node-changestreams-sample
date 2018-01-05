# MongoDB 3.6 Change Streams Node Sample

## MongoDB 3.6 cluster configuration

You must configure a replica set for change streams to work. Follow the instructions below:

1. Make sure the latest version of [mtools](https://github.com/rueckstiess/mtools/blob/develop/INSTALL.md) is installed on your machine
1. Edit [setup.sh](./setup.sh) and update the MONGODB_LOCATION variable to point to your local MongoDB 3.6 installation root
1. Run `sh setup.sh` to set up your MongoDB 3.6 replica set using mlaunch
1. Run `sh run.sh` to start your MongoDB 3.6 replica

## Node application configuration

1. Run `npm install` to install the required Node dependencies
1. Run `node produce.js` to create the _demo_ database, the _devices_ collection and a first document.
1. Run `node listen.js` to start listening to change streams coming from the _devices_ collection of the _demo_ database.
1. In a separate Terminal window, run `node produce.js` again - this will add a document to the `devices` collection of the `demo` database.
1. Look at the window running `listen.js` and if everything was properly configured you should get a *Change Stream* log message, followed by a *waiting for change stream...* message.
1. Now stop the `listen.js` process. We're simulating an application crash and the ability to resume processing MongoDB Change Streams from the exact time the application "crashed".
1. Add a few documents by running `node produce.js` several times.
1. Start `node listen.js` again and notice that the previous documents you just added get processed right away.
