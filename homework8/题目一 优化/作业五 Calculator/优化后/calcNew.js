var expression = '';
var result = 0;
window.onload = function() {
	displayExpression();
	var list = document.getElementsByTagName('li');
	for (var i = 0; i < list.length; i++) list[i].onclick = function() {selection(this.innerHTML);}
}
function selection(element) {
	switch(element) {
		case 'CE':clearExpression();break;
		case '←':backExpression();break;
		case 'CL':clearScreen();break;
		case '=':getResult();break;
		case '%':displayResultByPercent();break;
		default:addElementToExpression(element);break;
	}
}
function getResult() {
	try {
		if (expression === '') {
			result = 0;
		} else {
			calculateResult();
		}
	} catch(err) {
		document.getElementById('result').innerHTML = 'Invalid Input';
	}
}
function calculateResult() {
	var expressionTemp = '';
	for (var i = 0; i < expression.length; i++) {
		if (expression[0] === '÷' || expression[0] === '×') {
			document.getElementById('result').innerHTML = 'Invalid Input';
		}
		if (expression[i] === '÷') {
			expressionTemp += '/';
		} else if (expression[i] === '×') {
			expressionTemp += '*';
		} else {
			expressionTemp += expression[i];
		}
	}
	result = eval(expressionTemp);
	displayResult();
}
function addElementToExpression(element) {
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
		expression = expression.substring(0, expression.length - 1);
	} else {
		expression = '';
	}
	displayExpression();
}
function clearExpression() {
	expression = '';
	displayExpression();
}
function clearScreen() {
	expression = '';
	result = 0;
	displayExpression();
	displayResult();
}
function displayExpression() {
	if (expression === '') {
		document.getElementById('expression').innerHTML = '';
	} else {
		document.getElementById('expression').innerHTML = expression;
	}
}
function displayResult() {
	if (result == Infinity || isNaN(result)) {
		document.getElementById('result').innerHTML = 'Infinity';
	} else if (expression !== '') {
		document.getElementById('result').innerHTML = result;
	} else {
		document.getElementById('result').innerHTML = '';
	}
}
function displayResultByPercent() {
	if (expression !== '' && result < 1 && result > 0) {
		result *= 100;
		document.getElementById('result').innerHTML = result + '%';
	}
}