var Q = require('q');
var validator = require('../public/javascripts/validator');
var __ = require('lodash');
var crypto = require('crypto');
module.exports = function(db) {
	var users = db.collection('users');

	return {
		findUser: function(username, password) {
			//console.log("start find user");
            return users.findOne({username: username}).then(function(user) {
                //console.log("start find user");
                //console.log(user);
                if (user){
                    return compare(password, user.password).then(function() {
                        //console.log("find then ")
                        //console.log(password + " " + user.password);
                        return user;
                    });
                } else  {
                    return Promise.reject("user doesn't exist");
                }
			});
		},
		createUser: function(user) {
            //console.log("start creat user");
            //console.log(user);
           return  MD5encryptReturnFunction(user).then(function(hash) {
               user.password = hash;
               //console.log("promise");
               console.log(user);
               //console.log(hash);
               var obj = user;
               obj = __.omit(obj, 'confirm');
               //console.log(obj);
               return users.insert(obj);
           });
		},
		checkUser: function(user) {
            //console.log("start check user");
            //console.log(user);
			var formatErrors = validator.findFormatErrors(user);
            //console.log(formatErrors.length);
			return new Promise(function(resolve, reject) {
                //console.log("in check");
                //console.log(user);
                (formatErrors.length > 0) ? reject(formatErrors) : resolve(user);
			}).then(function() {
                //console.log(user);
                return users.findOne(getQueryForUniqueInAttributes(user)).then(function(existedUser) {
                    //console.log(user);
                    return existedUser ? Promise.reject("user isn't unique") : Promise.resolve(user);
				})
			});
		}
	}
}

var MD5encryptReturnFunction = function(user) {
    var deferred = Q.defer();
    var hash = MD5encrypt(user.password);
    //console.log("hash " + hash);
    deferred.resolve(hash);
    return deferred.promise;
}

function MD5encrypt(password) {
    var content = password;
    //console.log("start md5");
    //console.log(content);
    var md5 = crypto.createHash('md5');
    md5.update(content);
    //console.log(md5.digest('hex'));
    return md5.digest('hex');
}

function getQueryForUniqueInAttributes(user) {
	return {
		$or: __(user).omit('password', 'confirm').pairs().map(pairToObject).value()
	};
}
function pairToObject(pair) {
	var obj = {};
	obj[pair[0]] = pair[1];
	return obj;
}

var compare = function(password, encodedPassword) {
	var deferred = Q.defer();
	var hash = MD5encrypt(password);
    //console.log("hash " + hash + " " + encodedPassword);

	if (encodedPassword === hash) {
		//console.log("cpmpare true");
        deferred.resolve();
	} else {
        //console.log("cpmpare false");
		deferred.reject();
	}
	return deferred.promise;
}
