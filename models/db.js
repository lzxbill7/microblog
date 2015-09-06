/**
 * Mongodb connection
 */

var settings = require('../settings');
var Db = require('mongodb').Db;
var mongo = require("mongodb");

// TODO: Check Connection object usage
// var Connection = require('mongodb').Connection;

var Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, 27017, {}), {
    safe : true
});
