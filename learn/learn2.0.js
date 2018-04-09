/*
var a = 2;
function scopeExample() {
	alert(a);
	a = 2 * 2;
	b = 3;
	var c = 5;
	alert(a);
	for (var i = 0; i < 10; i++) {
		var d = i * i;
	}
	alert(i);
	alert(d);
}

scopeExample();
alert(b);
*/
/*数组
var a = [];
a[0] = 23;
var a2 = ["some", "strings", "in", "an", "array"];
a2.push("Ooh~");
alert(a2.length);
a2[100] = "Yeah!"
alert(a2[5]);
alert(a2.length);

var a = ["stef", "jason", "young"];
var a1 = ["hello"]
alert(a.concat(a1));
alert(a.join("/"));
alert(a.reverse());
alert(a.slice(0, 2));
alert(a.splice(0, 2, "b"));
alert(a.push("brian"));
alert(a.unshift("kelly"));
alert(a.pop());
alert(a.shift());
alert(a.sort());
*/
/*
var s = "the quick brown fox";
var a = s.split(" ");
alert(a.reverse());
s = a.join("!");
alert(s);

var userInfo = "张三|男|28|13860000660|zhangsan@mail.cn";
var userInfoArray = userInfo.split("|");
var nameAndGender = userInfoArray.slice(0, 2).join(", ");
alert(nameAndGender);
userInfoArray.splice(3, 1, "中山大学", "18509087532");
alert(userInfoArray.join("|"));
*/
alert(eval("3*-3"));

var str = "hello";
eval("str = str + 'world'");
eval(alert(str));