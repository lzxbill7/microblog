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

router.post("/reg", function(req, res) {
    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', '两次输入的口令不一致');
        return res.redirect('/reg');
    }
    console.log(req.body['password'])

    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    return res.redirect('/reg');
    // var newUser = new User({
    // name : req.body.username,
    // password : password,
    // });
    // // 检查用户名是否已经存在
    // User.get(newUser.name, function(err, user) {
    // if (user)
    // err = 'Username already exists.';
    // if (err) {
    // req.flash('error', err);
    // return res.redirect('/reg');
    // }
    //
    // newUser.save(function(err) {
    // if (err) {
    // req.flash('error', err);
    // return res.redirect('/reg');
    // }
    // req.session.user = newUser;
    // req.flash('success', '注册成功');
    // res.redirect('/');
    // });
    // });
});

module.exports = router;
