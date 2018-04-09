/*
var foo = "bar";
(function() {
	console.log("Original value was " + foo);
	var foo = "foobar";
	console.log("New value is " + foo);
})();
console.log('foo: ' + foo);

var member = {
	name: '张三',//注意是逗号
	age: 23,
	'goto': 'United States',
	say: function() {
		return this.name + '前往' + this['goto'];
	}
}
alert(member.age);
alert(member['age']);
alert(member['goto']);
alert(member.goto);//语法错误，某些js引擎能够执行（chrome可以）
alert(member.say());

member.weight = 60;
alert(member.weight);
delete member.weight;
alert(member.weight);

var a = ['a', 'b', 'c', 0, {name:'张三'}];
alert(typeof a);
alert(a.length);
alert(a[4].name);

var peter = {nickname: 'rabbit'};
var littlePeter = peter;
peter.nickname = 'bear';
alert(littlePeter.nickname);//bear

var func = function(otherFunc) {
	alert('func');
	otherFunc();
	return otherFunc;
};
var func2 = function() {
	alert('func2');
};
func.method = function() {
	alert('method of func');
};
var obj = {
	myFunc: func
};
var arr = [func, func2];
alert(typeof arr);
func.method();//method of func
obj.myFunc(func2);//func func2
arr[0](arr[1]);//func func2
arr[0](arr[1])();//func func2 func2

var a = function() {
	b = function c() {};
	function d(){};
};
console.log(typeof a, typeof b, typeof c, typeof d, typeof e);
//function undefined undefined undefined function
a();
console.log(typeof a, typeof b, typeof c, typeof d, typeof e);
//function function undefined undefined function
function e(){};

var a = function() {
	b = function c() {};
	function d(){};
};
console.log(typeof a, typeof b, typeof c, typeof d, typeof e);
//function undefined undefined undefined undefined
a();
console.log(typeof a, typeof b, typeof c, typeof d, typeof e);
//function function undefined undefined undefined
var f = function e() {};
*/
/*
function outter() {
	var outterName = 'outter name';
	var inner = function() {
		alert(outterName);
		var innerName = 'inner name';
	};
	inner();//outter name
	alert(innerName);//ReferenceError:innerName is not defined
}
outter();
*/
/*
function outter() {
	var secret = 'secret';
	inner = function() {
		alert(secret);
	}
	inner();
}
outter();//secret
inner();//secret
*/
/*
var sum = function() {
	var sum = 0;
	for (var i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
};
alert(sum(1,2,3));
*/
/*
function a() {
	console.log("callee:", arguments.callee);
	console.log("caller:", arguments.callee.caller);
}
function b(){a();}
b();
*/
/*
var Foo = function() {
	this.name = 'foo';
}
var result = Foo();//普通函数
alert(name);//foo, 但不能使用result.name
var result = new Foo();//构造子
alert(result);
alert(result.name);//foo
*/
/*
var sayHello = function(message, to) {
	alert(this.name + ' says ' + message + ' to ' + to);
}
var peter = {name: 'peter'};
var name = 'global';
sayHello.apply(this, ['hello', 'Marry']);//global says..
sayHello.apply(peter, ['hello', 'Marry']);//peter says..
sayHello.call(this, 'hello', 'Marry');//global says..
sayHello.call(peter, 'hello', 'Marry');//peter says..
*/
/*
var counter = function() {
	var amount = 0;
	return function() {
		return amount++;
	};
}();
alert(counter());
alert(counter());
alert(counter());

var f = function(x) {
	var m = function(y) {
		return x * y;
	}
	return m;
}
var myDouble = f(2);//myDouble即为m函数
var myTreble = f(3);//myTreble即为m函数
alert(myDouble(10));//20
alert(myTreble(10));//30

window.onload = function() {
	var lis = document.getElementsByTagName('li');
	for (var i = 0; i < lis.length; i++) {
		lis[i].onclick = function() {
			alert(i);
		}();
	}
}
*/
/*
var peter = {name: 'peter'};
var name = 'global';
var sayHello = function() {
	var helper = function() {
		alert(this.name + ' say hello');
	}
	helper();
};

peter.greeting = sayHello;
peter.greeting();//global says hello

var peter = {name: 'peter'};
var name = 'global';
var sayHello = function() {
	var that = this;
	var helper = function() {
		alert(that.name + ' say hello');
	}
	helper();
};

peter.greeting = sayHello;
peter.greeting();//peter says hello
*/
/*
var count = function() {
	var secretAmount = 0;
	count = function(n) {
		if (!count.isEnough()) {secretAmount += n;}
	};
	count.isEnough = function() {
		return secretAmount >= 2;
	};
	count.reset = function() {
		return secretAmount = 0;
	}
	return count;
}();
*/
/*
var tom = {
	name: 'tom',
	greet: function() {
		console.log("I am", this.name)
	}
};
var mike = {
	name: 'mike',
	greet: tom.greet
};
tom.greet();//I am tom
mike.greet();//I am mike

Array.prototype.forEach.call('abc', function(c){console.log(c);});
//a, b, c
*/
/*
function Animal(name) {
	this.name = name;
}
Animal.prototype.sleep = function() {
	console.log(this.name + ' is sleeping.');
};

function Dog(name, age) {
	this.age = age;
	Animal.call(this, name);
}
Dog.prototype = new Animal;
Dog.prototype.constructor = Dog;

var ace = new Dog('Ace', 2);
ace.sleep();
console.log("name: ", ace.name, " age: ", ace.age);

var bob = new Dog('Bob', 5);
bob.sleep();
console.log("name: ", bob.name, " age: ", bob.age);
*/
var fibonacci = function(n) {
	return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};
for (var i = 0; i <= 10; i++) {
	document.writeln('// ' + i + ': ' + fibonacci(i));
}

var fibonacci = function() {
	var memo = [0, 1];
	var fib = function(n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = fib(n - 1) + fib(n - 2);
			memo[n] = result;
		}
		return result;
	};
	return fib;
}();
for (var i = 0; i <= 10; i++) {
	document.writeln('// ' + i + ': ' + fibonacci(i));
}