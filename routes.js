var express = require('express');
var loginHandler = require('./Handlers/Login/login');
var addNewPlaceHandler = require('./Handlers/NewPlace/newPlace');
var savedPlaceHandler = require('./Handlers/SavedPlaces/savedplaces');
var router = express.Router();
const multer = require('multer');
var upload= multer();

function getRouter(app) {
    //Login route
    router.route('/authenticateUser').post(function (req, res) {
        loginHandler.authenticateUser(req, res);
    });
    // new Place route
    router.route('/addPlaceSubmission').post(function (req, res) {
        addNewPlaceHandler.addNewplace(req, res);
    });
    // Saved place route
    router.route('/getSavedPlaces').post(function (req, res) {
        savedPlaceHandler.getSavedPlaces(req, res);
    });
    router.route('/getImagesByFileName').post(function (req, res) {
        savedPlaceHandler.getImageByFileName(req, res);
    });
    router.route('/getSavedPlaceById').post(function (req, res) {
        savedPlaceHandler.getSavedPlaceById(req, res);
    });
    return router;
}

module.exports.getRouter = getRouter;