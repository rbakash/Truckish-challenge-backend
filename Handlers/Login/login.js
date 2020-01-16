const winston = require('winston');
const database = require('../../Config/databaseConfig');
const JWTSignOptions = require('../../Config/jwtConfig')
const logger = require('../../Utils/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.authenticateUser = function handlelogin(req, res) {
    // request
    logger.info(req.connection.remoteAddress + " ->" + " handler -> Login -> LoginHandler -> authenticate the user started");
    database.dbConnection.query(
        'SELECT * FROM `usercredentials` where Email=' + database.dbConnection.escape(req.body.Email) + ";",
        function (err, results, fields) {
            if (err) {
                logger.error(req.connection.remoteAddress + "->" + "handler -> Login -> LoginHandler -> authenticate the user Error ", err.sqlMessage);
                res.status(500)
                res.json({
                    status:500,
                    Message:"Unable to connect to database"
                })
            }
            else {
                if(results.length == 0){
                    res.status(200).send({
                        status:404,
                        Message:"User doesn't exists"
                    })
                } else
                {
                    // var salt = bcrypt.genSaltSync(10);
                    // var hash = bcrypt.hashSync(req.body.Password, salt);
                    bcrypt.compare(req.body.Password, results[0].Password).then(function (passwordMatch) {
                        if (passwordMatch) {
                            // res.send(200)
                            let payload = {
                                id: results[0].id,
                                Email: results[0].Email
                            }
                            let token = jwt.sign(payload,JWTSignOptions.privateKey, (TokenError, Token) => {
    
                                if (TokenError) {
                                    res.status(200).send({
                                        status:500,
                                        Message: "Unable to generate Token"
                                    })
                                }
                                else {
                                    res.status(200).send({
                                        status:200,
                                        Token,
                                        Id: results[0].id,
                                        Message: "Login successful"
                                    });
                                }
                            });
                        }
                        else {
                            res.status(200).send({
                                status:401,
                                Message:"User credential mismatch"
                            })
                        }
                    });
                    logger.info(req.connection.remoteAddress + " ->" + " handler -> Login -> LoginHandler -> authenticate the user ended");
                }
                
            }

        }
    );

}