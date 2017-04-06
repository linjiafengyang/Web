var gameOver = true;
var time = 30;
var score = 0;
var timeOperator;
var mole = document.getElementsByTagName('li');
var len = mole.length;
//complete the mode of "$";
function $(element) {
	return document.getElementById(element);
}
window.onload = function() {
	$('control').onclick = function() {control(this);}
	$('control').onmouseover = function() {mouseOverControl(this);}
	$('control').onmouseout = function() {mouseOutControl(this);}
	for (var i = 0; i < len; ++i) {
		mole[i].onmousedown = function() {mouseDown(this);}
		mole[i].onmouseup = function() {mouseUp(this);}
		mole[i].onclick = function() {whac_a_mole(this);}
	}
}
/* ---------------- Control ---------------- */
function control(element) {
	if (element.innerHTML === 'Start') {
		start();
	} else if (element.innerHTML === 'Stop') {
		end();
	}
}
function mouseOverControl(element) {
	element.className = "mouseOverControl";
}
function mouseOutControl(element) {
	element.className = "";
}
function start() {
	$('control').innerHTML = 'Stop';
	gameOver = false;
	time = 30;
	score = 0;
	$('stage').innerHTML = 'Playing...';
	timeCountor();
	pickOneRandomly();
}
function end() {
	gameOver = true;
	$('stage').innerHTML = 'Game Over!';
	alert('Your score is: ' + score);
	clearTimeout(timeOperator);
	$('time').innerHTML = 0;
	$('control').innerHTML = "Start";
	$('stage').innerHTML = 'Ready?';
	$('score').innerHTML = score;
	for (var i = 0; i < len; ++i) {
		mole[i].id = "";
	}
}
/* -------------- Control END -------------- */

/* -------------- TimeCountor -------------- */
function timeCountor() {
	if (time >= 0) {
		$('time').innerHTML = time--;
		timeOperator = setTimeout("timeCountor()", 1000);
	} else {
		end();
	}
}
/* ------------ TimeCountor END ------------ */

/* -------------- Whac_a_mole -------------- */
function whac_a_mole(element) {
	if (gameOver === false) {
		if (isPicked(element)) {
			$('score').innerHTML = ++score;
			element.id = "";
			pickOneRandomly();
		} else {
			$('score').innerHTML = --score;
		}
	}
}

function mouseUp(element) {
	element.className = "";
}
function isPicked(element) {
	if (element.id === "bePicked")
		return true;
	else
		return false;
}
/* ------------ Whac_a_mole END ------------ */

/* ------------- Pick Randomly ------------- */
function pickOneRandomly() {
	mole[randomBetweenTwoInt(0, 59)].id = "bePicked";
}
function randomBetweenTwoInt(lowBound, upBound){
	return Math.floor(Math.random() * (upBound - lowBound + 1) + lowBound);
}
/* ----------- Pick Randomly END ----------- */