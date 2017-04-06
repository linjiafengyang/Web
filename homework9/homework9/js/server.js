// 获取所要用到的模块
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
// 写入网页的文本类型
var MIME = {
	'.html' : 'text/html',
	'.css'	: 'text/css',
	'.js'	: 'application/javascript',
};
// 当接收到相应的请求后，做出响应
function multiple(request, response, pathname, query, post) {
	if (post == '' && query == null) return init(response, pathname);
	if (post != '') return post_data(response, post);
	if (query != null) return jump(request, response, pathname, query);
}
// 在地址栏中输入相应的用户信息，若成功则跳转到详情界面，否则则回到注册界面
function jump(request, response, pathname, query) {
	var n;
	var my = querystring.parse(query);
	console.log(my);
	var hh = JSON.parse(fs.readFileSync("../js/data.json"));
	for (n = 0; hh[n]; n++) {
		if (hh[n]['name'] == my['name']) break;
		if (hh[n]['id'] == my['id']) break;
		if (hh[n]['phone'] == my['phone']) break;
		if (hh[n]['email'] == my['email']) break;
	}
	if (typeof(hh[n]) == "undefined") {
		console.log(url.parse(request.url).query);
		return init(response, pathname);
	}
	response.writeHead(200, {'Content-Type': 'text/html'});
	make_new(response, hh[n]);
}
// 初始化开启服务器后注册的界面
function init(response, pathname) {
	if (pathname == '/') {
		pathname = '../html/signup.html';
	} else {
		pathname = '..' + pathname;
	}
	console.log(pathname);
	fs.readFile(pathname, function(err, file) {
		var contenttype = MIME[path.extname(pathname)];
		response.writeHead(200, {"Content-Type": contenttype});
		response.end(file);
	});
}
// 处理接收到的表单数据
function post_data(response, post) {
	var n;
	var hh = JSON.parse(fs.readFileSync("../js/data.json"));
	var temp = querystring.parse(post);
	var flag = 0;
	var s = "";
	for (n = 0; hh[n]; n++) {
		if (hh[n]['name'] == temp['name']) s = new_info(s, temp['name'], 'name');
		if (hh[n]['id'] == temp['id']) s = new_info(s, temp['id'], 'id');
		if (hh[n]['phone'] == temp['phone']) s = new_info(s, temp['phone'], 'phone');
		if (hh[n]['email'] == temp['email']) s = new_info(s, temp['email'], 'email');
		if (hh[n]['name'] != temp['name'] && hh[n]['id'] != temp['id'] && hh[n]['phone'] != temp['phone'] && hh[n]['email'] != temp['email']) flag = 1;
	}
	if (flag == 0) {
		s += "请重新注册！";
		return display(response, s);
	}
	hh[n] = temp;
	console.log(JSON.stringify(querystring.parse(post)));
	fs.writeFile("../js/data.json", JSON.stringify(hh, null, 4), function(err) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		make_new(response, hh[n]);
	});
}
// 构造用户名重复时的提示信息
function new_info(s, info, pos) {
	if (pos == 'name') s += "用户名：" + info + "已存在！ ";
	if (pos == 'id') s += "学号: " + info + "已存在！ ";
	if (pos == 'phone') s += "电话： " + info + "已存在！ ";
	if (pos == 'email') s += "邮箱： " + info + "已存在！ ";
	console.log("my" + s);
	return s;
}
// 做一个replace模板以跳转到对应的用户详情界面
function make_new(response, user) {
	fs.readFile("../html/success.html", function(err, data) {
		var newString = data.toString();
		newString = newString.replace(/user_name/i, user['name']);
		newString = newString.replace(/my_id/i, user['id']);
		newString = newString.replace(/my_phone/i, user['phone']);
		newString = newString.replace(/my_email/i, user['email']);
		response.write(newString);
		response.end();
	});
}
// 若出现重复信息则提示用户要重新注册
function display(response, info) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('../html/signup.html', function(err, data) {
		response.write(data);
		var s = "<script type='text/javascript'>"+"alert(" + "\'" + info +  "\'" + ");</script>";
		response.write(s);
		response.end();
	});
}
// 服务器函数，处理url路径并对请求做出响应
function begin(request, response) {
	var pathname = url.parse(request.url).pathname;
	var query = url.parse(request.url).query;
	var post = '';
	request.on('data', function(chunk) {
		post += chunk;
	});
	request.on('end', function() {
		multiple(request, response, pathname, query, post);
	});
}
http.createServer(begin).listen(8000);
console.log("Server running at http://127.0.0.1:8000/");