var express = require('express');
var loginHandler = require('./Handlers/Login/login');
var addNewPlaceHandler = require('./Handlers/NewPlace/newPlace');
var router = express.Router();
const multer = require('multer');
var upload= multer();

function getRouter(app) {
    console.log("get router called");
    //Login route
    router.route('/authenticateUser').post(function (req, res) {
        loginHandler.authenticateUser(req, res);
    });
    // new Place Router
    router.route('/addPlaceSubmission').post(function (req, res) {
        addNewPlaceHandler.addNewplace(req, res);
    });
    return router;
}

module.exports.getRouter = getRouter;