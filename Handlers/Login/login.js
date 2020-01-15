var winston = require('winston');
var database = require('../../Config/databaseConfig');
var logger = require('../../Utils/logger');


exports.authenticateUser = function handlelogin(req, res) {
    // request
    logger.info(req.connection.remoteAddress + " ->" + " handler -> Login -> LoginHandler -> authenticate the user started");
    database.dbConnection.query(
        'SELECT * FROM `usercredentials` where userName='+ database.dbConnection.escape(req.body.Email)+";",
        function(err, results, fields) {
            if( err){
                logger.error(req.connection.remoteAddress + "->" + "handler -> Login -> LoginHandler -> authenticate the user Error ", err.message);
            }
            else{
                console.log(results); // results contains rows returned by server
                console.log(fields); // fields contains extra meta data about results, if available
                res.send(200)
            }
          
        }
      );

}