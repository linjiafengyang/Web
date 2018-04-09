/*
var http = require('http');
var url = require('url');
var querystring = require('querystring');
function parseName(_url) {
	return querystring.parse(url.parse(_url).query).username;
}
http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello ' + (parseName(request.url) || 'world') + '!\n');
}).listen(8124);
console.log('Server running at http://127.0.0.1:8124/');
*/
const assert = require('assert');
assert(true);
assert(1);
//assert(false);// throws "AssertionError: false == true"
//assert(0);// throws "AssertionError: 0 == true"
//assert(false, 'it\'s false');// throws "AssertionError: it's false"
const obj1 = {
	a: {
		b: 1
	}
};
const obj2 = {
	a: {
		b: 2
	}
};
const obj3 = {
	a: {
		b: 1
	}
};
const obj4 = Object.create(obj1);

assert.deepEqual(obj1, obj1);
//assert.deepEqual(obj1, obj2);// AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } }
assert.deepEqual(obj1, obj3);
//assert.deepEqual(obj1, obj4);// AssertionError: { a: { b: 1 } } deepEqual {}
assert.deepEqual({
	a: 1
}, {
	a: '1'
});
//assert.deepStrictEqual({a: 1}, {a: '1'});// AssertionError: { a: 1 } deepStrictEqual { a: '1' }
/*
assert.doesNotThrow(
	() => {
		throw new TypeError('Wrong value');
	},
	SyntaxError
);//TypeError: Wrong value
assert.doesNotThrow(
	() => {
		throw new TypeError('Wrong value');
	},
	TypeError
);//AssertionError: Got unwanted exception (TypeError)..
assert.doesNotThrow(
	() => {
		throw new TypeError('Wrong value');
	},
	TypeError,
	'Whoops'
);//AssertionError: Got unwanted exception (TypeError). Whoops
*/
assert.equal(1, 1);
assert.equal(1, '1');
//assert.equal(1, 2);// AssertionError: 1 == 2
//assert.equal({a: {b: 1}}, {a: {b: 1}});//AssertionError: { a: { b: 1 } } == { a: { b: 1 } }

//assert.fail(1, 2, undefined, '>');// AssertionError: 1 > 2
//assert.fail(1, 2, 'whoops', '>');// AssertionError: whoops

assert.ifError(0);
//assert.ifError(1);// Throws 1
//assert.ifError('error');// Throws 'error'
//assert.ifError(new Error());// Throws Error

//assert.notDeepEqual(obj1, obj1);// AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }
assert.notDeepEqual(obj1, obj2);
//assert.notDeepEqual(obj1, obj3);// AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }
assert.notDeepEqual(obj1, obj4);

//assert.notDeepEqual({a: 1}, {a: '1'});// AssertionError: { a: 1 } notDeepEqual { a: '1' }
assert.notDeepStrictEqual({
	a: 1
}, {
	a: '1'
});

assert.notEqual(1, 2);
//assert.notEqual(1, 1);// AssertionError: 1 != 1
//assert.notEqual(1, '1');// AssertionError: 1 != '1'

assert.notStrictEqual(1, 2);
//assert.notStrictEqual(1, 1);// AssertionError: 1 != 1
assert.notStrictEqual(1, '1');

assert.ok(true); // OK
assert.ok(1); // OK
//assert.ok(false);// throws "AssertionError: false == true"
//assert.ok(0);// throws "AssertionError: 0 == true"
//assert.ok(false, 'it\'s false');// throws "AssertionError: it's false"

//assert.strictEqual(1, 2);// AssertionError: 1 === 2
assert.strictEqual(1, 1); // OK
//assert.strictEqual(1, '1');// AssertionError: 1 === '1'

assert.throws(
	() => {
		throw new Error('Wrong value');
	},
	Error
);
assert.throws(
	() => {
		throw new Error('Wrong value');
	},
	/value/
)
assert.throws(
	() => {
		throw new Error('Wrong value');
	},
	function(err) {
		if ((err instanceof Error) && /value/.test(err)) return true;
	},
	'unexpected error'
);

/*
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
	console.log('an event occurred!');
});
myEmitter.emit('event');

myEmitter.on('event', function(a, b) {
	console.log(a, b, this);
});
myEmitter.emit('event', 'a', 'b');
/*
a b MyEmitter {
  domain: null,
  _events: { event: [ [Function], [Function] ] },
  _eventsCount: 1,
  _maxListeners: undefined }
*/
/*
myEmitter.on('event', (a, b) => {
	console.log(a, b, this);
});
myEmitter.emit('event', 'a', 'b');//a b {}

myEmitter.on('event', (a, b) => {
	setImmediate(() => {
		console.log('this happens asynchronously');
	});
});
myEmitter.emit('event', 'a', 'b');

var m = 0;
myEmitter.on('event', () => {
	console.log(++m);
});
myEmitter.emit('event');//1
myEmitter.emit('event');//2

var n = 0;
myEmitter.once('event', () => {
	console.log(++n);
});
myEmitter.emit('event');//1
myEmitter.emit('event');//ignored

process.on('uncaughtException', (err) => {
	console.log('whoops! there was an error');
});
myEmitter.emit('error', new Error('whoops!'));//whoops! there was an error

myEmitter.on('error', (err) => {
	console.log('whoops! there was an error');
});
myEmitter.emit('error', new Error('whoops!'));
*/
/*
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.once('newListener', (event, listener) => {
	if (event === 'event') {
		myEmitter.on('event', () => {
			console.log('B');
		});
	}
});
myEmitter.on('event', () => {
	console.log('A');
});
myEmitter.emit('event'); //B A

myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(EventEmitter.listenerCount(myEmitter, 'event')); //2

myEmitter.setMaxListeners(myEmitter.getMaxListeners() + 1);
myEmitter.once('event', () => {
	myEmitter.setMaxListeners(Math.max(myEmitter.getMaxListeners() - 1, 0))
});

const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});
const sym = Symbol('symbol');
myEE.on(sym, () => {});
console.log(myEE.eventNames());//[ 'foo', 'bar', Symbol(symbol) ]

myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');//b a
*/
/*
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
var callbackA = () => {
	console.log('A');
	myEmitter.removeListener('event', callbackB);
};
var callbackB = () => {
	console.log('B');

};
myEmitter.on('event', callbackA);
myEmitter.on('event', callbackB);
myEmitter.emit('event');// A B
myEmitter.emit('event');// A
*/
/*
const fs = require('fs');
fs.unlink('/tmp/hello', (err) => {
	if (err) {throw err;}
	console.log('successfully deleted /tmp/hello');
});

const fs = require('fs');
fs.unlinkSync('/tmp/hello');
console.log('successfully deleted /tmp/hello');
*/
/*
const fs = require('fs');
fs.rename('/tmp/hello', '/tmp/world', (err) => {
	if (err) {throw err;}
	console.log('renamed complete');
});
fs.stat('/tmp/world', (err, stats) => {
	if (err) {throw err;}
	console.log(`stats: ${JSON.stringify(stats)}`);
});

fs.rename('/temp/hello', '/tmp/world', (err) => {
	if (err) {throw err;}
	fs.stat('/tmp/world', (err, stats) => {
		if (err) {throw err;}
		console.log(`stats: ${JSON.stringify(stats)}`);
	});
});

const fs = require('fs');
fs.watch('./tmp/', {encoding: 'buffer'}, (event, filename) => {
	if (filename) {console.log(filename);}
});
*/
/*
var http = require('http');

http.get({
	hostname: 'localhost',
	port: 8124,
	path: '/',
	agent: false
}, (res) => {}).on('socket', (socket) => {
	socket.emit('agentRemove');
});

var keepAliveAgent = new http.Agent({ keepAlive: true});
options.agent = keepAliveAgent;
http.request(options, onResponseCallback);
*/
/*
const http = require('http');
const net = require('net');
const url = require('url');
// Create an HTTP tunneling proxy
var proxy = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('okay');
});
proxy.on('connect', (req, cltSocket, head) => {
	// connect to an origin server
	var srvUrl = url.parse(`http://${req.url}`);
	var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
		cltSocket.write('HTTP/1.1 200 Connection Established\r\n' + 
			'Proxy-agent: Node.js-Proxy\r\n' + '\r\n');
		srvSocket.write(head);
		srvSocket.pipe(cltSocket);
		cltSocket.pipe(srvSocket);
	});
});
// now that proxy is running
proxy.listen(1337, '127.0.0.1', () => {
	// make a request to a tunneling proxy
	var options = {
		port: 1337,
		hostname: '127.0.0.1',
		method: 'CONNECT',
		path: 'www.google.com:80'
	};
	var req = http.request(options);
	req.end();
	req.on('connect', (res, socket, head) => {
		console.log('got connected!');
		// make a request over an HTTP tunnel
		socket.write('GET / HTTP/1.1\r\n' + 
			'Host: www.google.com:80\r\n' + 
			'Connection: close\r\n' + '\r\n');
		socket.on('data', (chunk) => {
			console.log(chunk.toSring());
		});
		socket.on('end', () => {
			proxy.close();
		});
	});
});
*/
const http = require('http');
// Create an HTTP server
var srv = http.create.Server((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('okay');
});
srv.on('upgrade', (req, socket, head) => {
	socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' + 
		'Upgrade: WebSocket\r\n' + 
		'Connection: Upgrade\r\n' + 
		'\r\n');
	socket.pipe(socket);// echo back
});
// now that server is running
srv.listen(1337, '127.0.0.1', () => {
	// make a request
	var options = {
		port: 1337,
		hostname: '127.0.0.1',
		headers: {
			'Connection': 'Upgrade',
			'Upgrade': 'websocket'
		}
	};
	var req = http.require('options');
	req.end();
	req.on('upgrade', (res, socket, upgradeHead) => {
		console.log('got upgraded!');
		socket.end();
		process.exit(0);
	});
});