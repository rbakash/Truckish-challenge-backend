var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
const database = require('../../Config/databaseConfig');
const logger = require('../../Utils/logger');

// To get the saved places according to user ID; 
exports.getSavedPlaces = function handleGetSavedPlace(req, res) {
    logger.info(req.connection.remoteAddress + " ->" + " handler -> savedPlace -> savedPlaceHandler -> handleGetSavedPlace started");
    database.dbConnection.query(
        'SELECT Id,ImagePath,Description,Name,Address FROM savedplaces where Createdby =' + database.dbConnection.escape(req.body.UserId) + ";",
        function (err, results, fields) {
            if (err) {
                logger.error(req.connection.remoteAddress + "->" + "handler -> savedPlace -> savedPlaceHandler -> handleGetSavedPlace Error ", err.sqlMessage);
                res.status(500)
                res.json({
                    status: 500,
                    Message: "Unable to connect to database"
                })
            }
            else {
                if (results.length == 0) {
                    res.status(200).send({
                        status: 404,
                        Message: "User doesn't have any photo"
                    })
                }
                else {
                    console.log(results);
                    res.status(200).send({
                        "status": 200,
                        results
                    })
                }
            }
        });
}
// To fetch the Uploded Image by fileName from the filesystem under the Directory Public/Uploads
exports.getImageByFileName = function fetchImage(req, res) {
    var jsonPath = path.join(__dirname, '../../', 'Public', 'Uploads', req.body.FileName);
    var stat = fs.statSync(jsonPath);
    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': stat.size
    });
    var readStream = fs.createReadStream(jsonPath);
    res.status(200);
    readStream.pipe(res);
}
// To fetch the saved places detials by ID fo DB
exports.getSavedPlaceById = function handleGetSavedPlaceById(req, res) {
    // request
    logger.info(req.connection.remoteAddress + " ->" + " handler -> savedPlace -> savedPlaceHandler -> handleGetSavedPlaceById started");
    database.dbConnection.query(
        'SELECT Id,ImagePath,Description,Name,Address FROM savedplaces where id =' + database.dbConnection.escape(req.body.Id) + ";",
        function (err, results, fields) {
            if (err) {
                logger.error(req.connection.remoteAddress + "->" + "handler -> savedPlace -> savedPlaceHandler -> handleGetSavedPlaceById Error ", err.sqlMessage);
                res.status(500)
                res.json({
                    status: 500,
                    Message: "Unable to connect to database"
                })
            }
            else {
                if (results.length == 0) {
                    res.status(200).send({
                        status: 404,
                        Message: "User doesn't have any places saved"
                    })
                }
                else {
                    console.log(results);
                    res.status(200).send({
                        "status": 200,
                        results
                    })
                }
                logger.info(req.connection.remoteAddress + " ->" + " handler -> savedPlace -> savedPlaceHandler -> handleGetSavedPlaceById ended");
            }
        });
}