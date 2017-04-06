var expression = '';
window.onload() = function() {
	attachNumberOrOperatorToExpressionWhenButtonClicked();
	removeLastCharactorFromExpressionWhenBackButtonClicked();
	evaluateExpressionWhenEqualButtonClicked();
	clearExpressionWhenClearButtonClicked();
}
function attachNumberOrOperatorToExpressionWhenButtonClicked() {
	Array.prototype.forEach.call(document.getElementsByTagName('button'), function(button) {
		if (button.id != 'back' && button.id != 'ce' && button.id != 'equal') {
			button.onclick = function(event) {
				expression += event.target.textContent;
				document.getElementById('output').value = expression;
			}
		}
	});
}
function removeLastCharactorFromExpressionWhenBackButtonClicked() {
	document.getElementById('back').onclick = function() {
		expression = expression.substr(0, expression.length - 1);
		document.getElementById('output').value = expression;
	}
}
function evaluateExpressionWhenEqualButtonClicked() {
	document.getElementById('equal').onclick = function() {
		try {
			var result = eval(expression);
			document.getElementById('output').value = result;
			expression = '';
		} catch(e) {
			alert("expression: " + expression + " is invalid!");
		}
	}
}
function clearExpressionWhenClearButtonClicked() {
	document.getElementById('ce').onclick = function() {
		document.getElementById('output').value = expression = '';
	}
}