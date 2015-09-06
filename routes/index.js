/*
 * GET home page.
 */

//exports.index = function(req, res) {
//    res.render('index', {
//        title : 'Express'
//    });
//};
// 引入需要的模块
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// var User = require('../models/user.js');
// var Post = require("../models/post.js");

// 主页路由
router.get('/', function(req, res) {
    res.render('index', {
        title : '首页',
        user : req.session.user,
        success : req.flash('success').toString(),
        error : req.flash('error').toString()
    });
});

module.exports = router;
