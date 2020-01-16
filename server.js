var express = require('express');
var app = express();
var routes = require('./routes');
var http = require('http');
var bodyParser = require('body-parser');
var config = require('./config/databaseConfig');
 var setting = require('./Config/settings');
var multer = require('multer');

// //Cross orgin issue
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    // "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,x-access-token, x-access-session,Pragma");
    res.header('Access-Control-Expose-Headers', 'x-access-token,Pragma,x-access-session');

    next();

});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('', routes.getRouter(app));


var server = http.createServer(app);

server.listen(setting.env.port, setting.env.hostname, function () {
    console.log(`Server running at http://${setting.env.hostname}:${setting.env.port}/`);
});
server.close();