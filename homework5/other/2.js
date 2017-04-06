var expression = '';
var result = 0;

/* ---------------- OnClick ---------------- */

window.onload = function() {
	display();

	var list = document.getElementsByTagName('li');
	var len = list.length;

	for (var i = 0; i < len; ++i) {

		list[i].onclick = function() {selection(this.innerHTML);}
		//	Avoid many many many ids.
	}
}

/* -------------- OnClick END -------------- */

/* --------------- Selection --------------- */

function selection(element) {
	switch(element) {
		case 'CE':
			clearExpression();
			break;
		case 'C':
			clearAll();
			break;
		case '←':
			backExpression();
			break;
		case '=':
			getResult();
			break;
		default:
			addElementIntoExpression(element);
		break;
	}
}

/* ------------- Selection END ------------- */

/* --------------- Selection SET's Function ---------------- */

function getResult() {

	try {
		if (expression === '') {
			result = 0;
		} else {

			var expressionTemp = '';
			for (var i = 0; i < expression.length; ++i) {
				if (expression[i] === '÷')
					expressionTemp += '/';
				else if (expression[i] === '×')
					expressionTemp += '*';
				else
					expressionTemp += expression[i];
			}

			result = eval(expressionTemp);

			if (result == Infinity || isNaN(result))
				document.getElementById('result').innerHTML = 'Invalid Input!';
			else
				displayResult();
		}
	} catch(err) {
		document.getElementById('result').innerHTML = 'Invalid Input!';
	}
}

function addElementIntoExpression (element) {
	if (expression[expression.length-1] === '+' || expression[expression.length-1] === '-' ||
		expression[expression.length-1] === '÷' || expression[expression.length-1] === '×') {
		if (element === '+' || element === '-' || element === '÷' || element === '×')
			return;
	}

	expression += element;
	displayExpression();
}

function backExpression() {
	if (expression.length >= 2) {
		expression = expression.substring(0,expression.length-1);
	} else {
		expression = '';
	}
	displayExpression();
}

function clearExpression() {
	expression = '';
	displayExpression();
}

function clearAll() {
	expression = '';
	result = 0;
	display();
}

/* ------------- Selection SET's Function END -------------- */

/* ---------------- Display ---------------- */

function displayExpression() {
	if (expression === '')
		document.getElementById('expression').innerHTML = '0';
	else
		document.getElementById('expression').innerHTML = expression;
}

function displayResult() {
	document.getElementById('result').innerHTML = result;
}

function display() {
	displayExpression();
	displayResult();
}

/* -------------- Display END -------------- */