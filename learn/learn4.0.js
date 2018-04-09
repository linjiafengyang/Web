
	function open_win() {
		window.open("https://www.baidu.com")
	}

window.onload = function() {
	document.getElementsByTagName("button")[0].onclick = writeNewHTML;
	var button = document.getElementsByTagName("button")[1];
	button.addEventListener('click', showClickTimes);
	button.addEventListener('click', handler1);
}
function writeNewHTML() {
	document.open();
	var txt = "<html><head><style>*{color:red}</style></head><body>前段动态生成的HTML</body></html>";
	document.write(txt);
	document.close();
}
var count = 0;
function showClickTimes(event) {
	var paragraph = document.getElementsByTagName("p")[0];
	count++;
	paragraph.textContent = "第" + count + "次点击";
}
function handler1(event) {
	alert("去年今日此门中，人面桃花相映红");
	event.target.removeEventListener('click', handler1);
	event.target.addEventListener('click', handler2);
}
function handler2(event) {
	alert("人面不知何处去，桃花依旧笑春风");
	event.target.removeEventListener('click', handler2);
	event.target.addEventListener('click', handler1);
}
function delayMsg() {
	setTimeout(booyah, 5000);
	document.getElementById("output").innerHTML = "Wait for it...";
}
function booyah() {
	document.getElementById("output").innerHTML = "BOOYAH!";
}

var timer = null;
function delayMsg2() {
	if (timer == null) {
		timer = setInterval(rudy, 1000);
	} else {
		clearInterval(timer);
		timer = null;
	}
}
function rudy() {
	document.getElementById("output2").innerHTML += "Rudy!";
}

function delayedMultiply() {
	setTimeout(multiply, 2000, 6, 7);
}
function multiply(a, b) {
	alert(a * b);
}

function pageLoad() {
	document.getElementById("ok").onclick = okayClick;
}
function okayClick() {
	alert("booyah");
}
window.onload = pageLoad;
/*
	newParagraph = document.createElement("p");
	var newText = document.createTextNode("君不见高堂明镜悲白发，朝如青丝暮成雪");
	newParagraph.className = "newParagraph";
	newParagraph.appendChild(newText);
	document.getElementsByTagName('button')[0].onclick = toggleNewParagraph;
*/

/*
function toggleNewParagraph() {
	var poem = document.getElementsByTagName('div')[0];
	var paragraphs = document.getElementsByTagName('p');
	if (paragraphs.length > 1) {
		poem.removeChild(newParagraph);
	} else {
		var oldParagraph = document.getElementsByTagName('p')[0];
		poem.insertBefore(newParagraph, oldParagraph.nextSibling);
	}
}*/