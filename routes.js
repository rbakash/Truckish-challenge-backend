var express = require('express');
var LoginHandler = require('./Handlers/Login/login');
var router = express.Router();

function getRouter(app) {
    console.log("get router called");
    //Login route
    router.route('/authenticateUser').post(function (req, res) {
        LoginHandler.authenticateUser(req, res);
    });
    return router;
}

module.exports.getRouter = getRouter;