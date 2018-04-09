window.onload = function() {

	var div_example = document.getElementById('example');
	alert(div_example.textContent);
	alert(div_example.innerHTML);
	changeTextContent = function() {
		div_example.textContent = "<p>新文本内容</p>";
	}
	changeInnerHTML = function() {
		div_example.innerHTML = "<p>新文本内容</p>";
	}
	document.getElementById("changeButton").onclick = function() {
		var poem = document.getElementById("poem");
		var className = poem.className;
		if (className.indexOf('changed') < 0) {poem.className += 'changed';}
		/*document.getElementById("poem").className = 'changed';*/
		/*document.getElementById("poem").style.textDecoration = 'underline';*/
	}

	var node = document.getElementById("dom-node");
	alert(node.nodeName);
	alert(node.nodeType);
	alert(node.nodeValue);

	var child = node.firstChild;
	alert(child.nodeName);
	alert(child.nodeType);
	alert(child.nodeValue);

	var p = document.getElementById("dom");
	var textNode1 = p.firstChild.nextSibling.firstChild;
	var textNode2 = p.childNodes[1].childNodes[0];
	alert(textNode1.nodeValue);
	alert(textNode2.nodeValue);
	alert(textNode1 === textNode2);

	alert(textNode1.firstChild);
	alert(textNode1.lastChild);
	alert(textNode1.nextSibling);
	alert(textNode1.previousSibling);
	alert(textNode1.childNodes.length);
}
