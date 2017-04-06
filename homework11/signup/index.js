var express = require('express');
var router = express.Router();
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:route');

module.exports = function(db) {
	var userManager = require('../models/user')(db);

	router.get('/signin', function(req, res, next) {
		res.render('signin', {user: req.session.user, error:null});
	});

	router.get('/signout', function(req, res, next) {
		delete req.session.user;
		res.redirect('signin');
	});

	router.post('/signin', function(req, res, next) {
		userManager.findUser(req.body.username, req.body.password)
		.then(function(user) {
			req.session.user = user;
			res.redirect('/detail?username='+user.username);
		})
		.catch(function(error) {
			res.render('signin', {user:req.session.user, error: '用户名或者密码错误'});
		});
	});

	router.get('/regist', function(req, res, next) {
		res.render('regist', {user: {}});
	});

	router.post('/regist', function(req, res, next) {
		var user = req.body;
		userManager.checkUser(user)
		.then(userManager.createUser)
		.then(function() {
			req.session.user = user;
			res.redirect('/detail?username='+user.username);
		})
		.catch(function(error) {
			res.render('regist', {user: user, error: error});
		});
	});

	router.all('*'. function(req, res, next) {
		req.session.user ? next() : res.redirect('/signin');
	});

	router.get('/detail', function(req, res, next) {
		var username = req.query.username;
		if (req.session.user.username != null) {
			if (username != null && req.session.user.username === username) {
				res.render('detail', {user: req.session.user, error: null});
			} else {
				res.render('detail', {user: req.session.user, error: "只能够访问自己的数据"});
			}
		} else if (req.session.user.username == null || username == null) {
			res.redirect('/signin');
		}
	});

	return router;
}