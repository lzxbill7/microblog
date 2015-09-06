/*
 * GET home page.
 */

//exports.index = function(req, res) {
//    res.render('index', {
//        title : 'Express'
//    });
//};
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// var User = require('../models/user.js');
// var Post = require("../models/post.js");

// Home route
router.get('/', function(req, res) {
    res.render('index', {
        title : 'HOME',
        user : req.session.user,
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
});

// Rigistry route
router.get("/reg", function(req, res) {
    res.render("reg", {
        title : "User Registry"
    });
});

module.exports = router;
