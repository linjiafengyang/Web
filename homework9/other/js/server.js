var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var querystring = require("querystring");

exports.start = function() {
	http.createServer(switchRequestMethod).listen(8000);
	console.log("Server running at http://127.0.0.1:8000");
}

function switchRequestMethod(req, res) {
	console.log("Incoming req: (" + req.method + ") " + req.url);
	var urlObj = querystring.parse(url.parse(req.url).query);
	urlObj.check = "username";
	if (checkRepeat(urlObj) == "repeat") {
		loadFile(req, res, urlObj);
	} else {
		if (req.method === "GET")
			loadFile(req, res, "Up");
		else if (req.method === "POST")
			returnMessage(req, res);
	}
}

function returnMessage(req, res) {
	var formData = "";
	req.on(
		"readable",
		function() {
			var d = req.read();
			if (typeof d === "string")
				formData += d;
			else if (typeof d === "object" && d instanceof Buffer)
				formData += d.toString("utf8");
		}
	);
	req.on(
		"end",
		function() {
			var obj = querystring.parse(formData);
			if (obj.check != undefined) {
				var out = checkRepeat(obj);
				res.end(out);
			} else {
				userSet.push(JSON.stringify(obj));
				res.end(JSON.stringify(obj));
			}
		}
	);
}

function checkRepeat(obj) {
	if (obj.check == "username") {
		for (var i = 0; i < userSet.length; ++i) {
			var userSetObj = JSON.parse(userSet[i]);
			if (userSetObj.username == obj.username)
				return "repeat";
		}
		return "no-repeat";
	}
	if (obj.check == "studentID") {
		for (var i = 0; i < userSet.length; ++i) {
			var userSetObj = JSON.parse(userSet[i]);
			if (userSetObj.studentID == obj.studentID)
				return "repeat";
		}
		return "no-repeat";
	}
	if (obj.check == "telephone") {
		for (var i = 0; i < userSet.length; ++i) {
			var userSetObj = JSON.parse(userSet[i]);
			if (userSetObj.telephone == obj.telephone)
				return "repeat";
		}
		return "no-repeat";
	}
	if (obj.check == "email") {
		for (var i = 0; i < userSet.length; ++i) {
			var userSetObj = JSON.parse(userSet[i]);
			if (userSetObj.email == obj.email)
				return "repeat";
		}
		return "no-repeat";
	}
}

function loadFile(req, res, diff) {
	var basename = path.basename(req.url);
	console.log("url basename: " + basename);
	switch(basename) {
		case "signup.css":
		case "signup.js":
		case "signup_2.css":
		case "signup_2.js":
		case "jquery.js":
			fs.readFile({"signup.css" : "../css/signup.css",
						"signup.js" : "signup.js",
						"signup_2.css" : "../css/signup_2.css",
						"signup_2.js" : "signup_2.js",
						"jquery.js" : "jquery.js"}[basename], "utf-8", function(error, data) {
				if (error)
					throw error;
				res.writeHead(200, {"Content-Type": 
						{"signup.css" : "text/css",
						"signup.js" : "text/javascript",
						"signup_2.css" : "text/css",
						"signup_2.js" : "text/javascript",
						"jquery.js" : "text/javascript"}[basename]});
				res.write(data);
				res.end();
			});
			break;
		case "favicon.ico":
			res.end();
			break;
		default:
			if (diff === "Up") {
				fs.readFile("../signup.html", "utf-8", function(error, data) {
					if (error)
						throw error;
					res.writeHead(200, {"Content-Type": "text/html"});
					res.write(data);
					res.end();
				});
			} else {
				res.writeHead(200, {"Content-Type": "text/html"});
				res.write(
				'<!DOCTYPE html>' + 
					'<html>' +
						'<head>' +
							'<title>Sign In</title>' +
							'<link rel="stylesheet" type="text/css" href="./css/signup_2.css">' +
						'</head>' +
						'<body>' +
							'<div class="container">' +
								'<h1>Sign In</h1>'
					);
				var findObj;
				for (var i = 0; i < userSet.length; ++i) {
					var userSetObj = JSON.parse(userSet[i]);
						if (userSetObj.username == diff.username) {
							findObj = userSetObj;
							break;
						}
				}
				res.write('<div>Username: ' + findObj.username + '</div>');
				res.write('<div>Student ID: ' + findObj.studentID + '</div>');
				res.write('<div>Telephone: ' + findObj.telephone + '</div>');
				res.write('<div>Email Address: ' + findObj.email + '</div>');
				res.write(
							'<button>Back</button>' +
							'</div>' +
							'<script type="text/javascript" src="jquery.js"></script>' +
							'<script type="text/javascript" src="signup_2.js"></script>' +
						'</body>' +
					'</html>'
					);
				res.end();
			}
			break;
	}
}
function parseName(_url) {
	return querystring.parse(url.parse(_url).query).username;
}
var userSet = new Array();
userSet.push('{"username":"hehehe","studentID":"12345678","telephone":"12345678910","email":"hehe@hehe.com"}');