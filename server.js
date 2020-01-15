var express = require('express');
var app = express();
// var logger = require("./utils/logger");
var routes = require('./routes');

var http = require('http');
var bodyParser = require('body-parser');
var config = require('./config/databaseConfig');
 var setting = require('./Config/settings');
// var multer = require('multer');
// var upload = multer({
//     dest: './tests'
// }).single('upl');
// // var multicahin = require('./handlers/blockChain/connectToBlockchain');

// //Cross orgin issue
app.use(function (req, res, next) {
    // bodyParser.json();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    // "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,x-access-token, x-access-session,Pragma");
    res.header('Access-Control-Expose-Headers', 'x-access-token,Pragma,x-access-session');

    next();

});
app.use(bodyParser.json());
app.use('', routes.getRouter(app));


var server = http.createServer(app);

server.listen(setting.env.port, setting.env.hostname, function () {
    console.log(`Server running at http://${setting.env.hostname}:${setting.env.port}/`);
    // multicahin.getInfo()
    // const used = process.memoryUsage().heapUsed / 1024 / 1024;
// console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
});
server.close();