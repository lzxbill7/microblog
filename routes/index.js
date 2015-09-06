/*
 * Route module functions.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
// var Post = require("../models/post.js");

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', 'loggined');
        return res.redirect('/');
    }
    next();
}

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
router.get("/reg", checkNotLogin);
router.get("/reg", function(req, res) {
    res.render("reg", {
        title : "User Registry"
    });
});

router.post("/reg", checkNotLogin);
router.post("/reg", function(req, res) {
    if (req.body['password-repeat'] !== req.body.password) {
        req.flash('error', 'passwords input are not same');
        return res.redirect('/reg');
    }

    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name : req.body.username,
        password : password,
    });

    // check user exists or not
    User.get(newUser.name, function(err, user) {
        if (user) {
            err = 'Username already exists';
        }

        if (err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }

        newUser.save(function(err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            req.session.user = newUser;
            req.flash('success', 'Register successfully');
            res.redirect('/');
        });
    });
});

module.exports = router;
