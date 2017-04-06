var Q = require('q');
var validator = require('../public/javascripts/validator');
var __ = require('lodash');
var crypto = require('crypto');

module.exports = function(db) {
	var users = db.collection('users');

	return {
		findUser: function(username, password) {
			return users.findOne({username: username}).then(function(user) {
				if (user) {
					return compare(password, user.password).then(function() {
						return user;
					});
				} else {
					return Promise.reject("user doesn't exist");
				}
			});
		},

		createUser: function(user) {
			return MD5encryptReturnFunction(user).then(function(hash) {
				user.password = hash;
				var obj = user;
				obj = __.omit(obj, 'confirm');
				return users.insert(obj);
			});
		},

		checkUser: function(user) {
			var formatErrors = validator.findFormatErrors(user);
			return new Promise(function(resolve, reject) {
				(formatErrors.length > 0) ? reject(formatErrors) : resolve(user);
			}).then(function() {
				return users.findOne(getQueryForUniqueInAttributes(user)).then(function(existedUser) {
					return existedUser ? Promise.reject("user isn't unique") : Promise.resolve(user);
				});
			});
		}
	}
}