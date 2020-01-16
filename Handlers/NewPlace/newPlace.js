var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
const database = require('../../Config/databaseConfig');
const logger = require('../../Utils/logger');


exports.addNewplace = function handleNewPlaceFormSubmission(req, res) {
    var form = new formidable.IncomingForm({
        uploadDir: '/Public/Uploads/',  // don't forget the __dirname here
        keepExtensions: true
    });
    let UserId = {};
    form.parse(req);
    form.on('field', (name, field) => {
        UserId[name] = field;
    });
    form.on('fileBegin', function (name, file) {
        var jsonPath = path.join(__dirname, '../../', 'Public', 'Uploads');
        file.path = jsonPath + '/' + file.name;
        UserId["fileName"] = file.name;

    });
    form.on('error', (err) => {
        logger.error(req.connection.remoteAddress + "->" + "handler -> Add place -> newPlace -> User file upload  Error ", err.Message);
                    res.status(500);
                    res.json({
                        status: 500,
                        Message: "User file upload  Error"
                    })
    });
    form.on('file', function (name, file) {
        var insertQuery = "INSERT INTO `savedplaces` (`Name`, `Description`, `ImagePath`, `Address`, `Createdby`)" + " select '" + UserId.newPlaceName + "','" + UserId.newPlaceDescription + "','" + UserId.fileName + "','" + UserId.newPlaceAddress + "'," + "usercredentials.id from usercredentials where usercredentials.id=" + UserId.UserId + ";";
        database.dbConnection.query(
            insertQuery,
            function (err, results, fields) {
                if (err) {
                    logger.error(req.connection.remoteAddress + "->" + "handler -> Add place -> newPlace -> User file upload  Error ", err.sqlMessage);
                    res.status(500)
                    res.json({
                        status: 500,
                        Message: "Unable to connect to database"
                    })
                }
                else {
                    if (results.affectedRows == 0) {
                        res.status(200).send({
                            status: 404,
                            Message: "User doesn't exists"
                        })
                    }
                    else {
                        res.status(200).send({
                            status: 200,
                            Message: "New place Added Successfully!!"
                        })
                    }
                }
            })

    });
}