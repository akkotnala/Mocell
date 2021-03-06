var mongoose = require('mongoose');

//var dbURI = 'mongodb://admin:admin1@ds018308.mlab.com:18308/mobiles_db';

//var dbURI = 'mongodb://admin:admin1@ds018248.mlab.com:18248/mobiles_app_db';

var dbURI = 'mongodb://admin:admin1@ds018268.mlab.com:18268/electronic-store';

//if (process.env.NODE_ENV === 'production') {
//dbURI = process.env.MONGOLAB_URI;
//}

mongoose.connect(dbURI);


var readLine = require ("readline");
if (process.platform === "win32"){
        var rl = readLine.createInterface ({
                    input: process.stdin,
                    output: process.stdout
            });
        rl.on ("SIGINT", function (){
            process.emit ("SIGINT");
        });
}

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

require('./mobiles');