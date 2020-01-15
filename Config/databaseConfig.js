var mysql = require('mysql2');
var Logger = require('../utils/logger');
/**
 * alter user 'grafana'@'nodemysql' identified with mysql_native_password by 'gf123abc'
 */
// createPool
var dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "mysavedplaces"

});

// const Sequelize = require('sequelize');

// // Option 1: Passing parameters separately
// const sequelize = new Sequelize('mysavedplaces', 'root', 'root123', {
//   host: 'localhost',
//   dialect: 'mysql' 
// });


// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// dbConnection.getConnection(function (err) {
//     if (err) throw err;
// });

module.exports.dbConnection = dbConnection;