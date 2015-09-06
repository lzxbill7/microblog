/*
 * Route module functions.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require("../models/post.js");

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'not logged');
        return res.redirect('/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', 'logged');
        return res.redirect('/');
    }
    next();
}

// Home route
router.get('/', function(req, res) {
    Post.get(null, function(err, posts) {
        if (err) {
            posts = [];
        }
        res.render('index', {
            title : 'HOME',
            posts : posts,
            user : req.session.user,
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });
    });
});

// Registry route
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

// login route
router.get("/login", checkNotLogin);
router.get("/login", function(req, res) {
    res.render("login", {
        title : "User login",
    });
});

router.post("/login", checkNotLogin);
router.post("/login", function(req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function(err, user) {
        if (!user) {
            req.flash('error', 'User does not exist');
            return res.redirect('/login');
        }

        if (user.password !== password) {
            req.flash('error', 'password error');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', 'Login successfully');
        res.redirect('/');
    });
});

// logout route
router.get("/logout", checkLogin);
router.get("/logout", function(req, res) {
    req.session.user = null;
    req.flash('success', 'logout successfully');
    res.redirect('/');
});

// post route
// router.post("/post", checkLogin);
// router.post("/post", function(req, res) {
// var currentUser = req.session.user;
// var post = new Post(currentUser.name, req.body.post);
// post.save(function(err) {
// if (err) {
// req.flash('error', err);
// return res.redirect('/');
// }
// req.flash('success', 'post successfully');
// res.redirect('/u/' + currentUser.name);
// });
// });

// user route
router.get("/u/:user", function(req, res) {
    User.get(req.params.user, function(err, user) {
        if (!user) {
            req.flash('error', 'User does not exist');
            return res.redirect('/');
        }
        Post.get(user.name, function(err, posts) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('user', {
                title : user.name,
                posts : posts,
            });
        });
    });
});

module.exports = router;
