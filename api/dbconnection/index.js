const mongoosse = require('mongoose');
const { callbackify } = require('util');
require('../models/users');
require('../models/trails');

require('util').callbackify;
const mongoose_disconnectCallBack = callbackify(mongoosse.disconnect);
const mongoose_disconnectWithSignalCallBack = callbackify(mongoosse.disconnect);
const mongoose_disconnectWithRestartcallBack = callbackify(mongoosse.disconnect);

mongoosse.connect(process.env.DB_URL);

mongoosse.connection.on('connected', function () {
    console.log("Mongoose connected");
});

mongoosse.connection.on('disconnected', function () {
    console.log("Mongoose disconnected");
});

mongoosse.connection.on('error', function (error) {
    console.log("Mongoose error = ", error);
});


process.on("SIGINT", function () {
    mongoose_disconnectCallBack(function () {
        console.log("Mongoose disconnected by app interupte");
        process.exit(0);
    });
});

process.on("SIGTERM", function () {
    mongoose_disconnectWithSignalCallBack(function () {
        console.log("Mongoose disconnected by app termination");
        process.exit(0);
    });
});

process.on("SIGUSR2", function () {
    mongoose_disconnectWithRestartcallBack(function () {
        console.log("Mongoose disconnected by app restart");
        process.kill(process.pid);
    });
});