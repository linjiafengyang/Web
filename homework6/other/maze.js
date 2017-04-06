var gameOver = true;
var gameCheat = false;

window.onload = function() {

	$('start').onmouseover = function() {start();}
	$('end').onmouseover = function() {end();}

	$('gameContainer').onmouseover = function() {cancleCheat();}
	$('gameContainer').onmouseleave = function() {Cheat();}

	var wall = document.getElementsByTagName('li'); // All walls are used tag 'li'.
	var len = wall.length;

	for (var i = 0; i < len; ++i) {
		wall[i].onmouseover = function() {wallTouch(this);}
		wall[i].onmouseout = function() {wallRestore(this);}
	}
}

function $(element) {
	// Try to complete the mode of "$"
	return document.getElementById(element);
}

/* ---------------- Control ---------------- */

function start() {
	$('notice').innerHTML = 'Game Start!';
	gameOver = false;
	gameCheat = false;
}

function end() {

	if (gameOver === false) {

		if (gameCheat === true)

			$('notice').innerHTML = "Don't cheat!";

		else

			$('notice').innerHTML = 'You Win!';

	}

	gameOver = true;
	gameCheat = false;
}

/* -------------- Control END -------------- */

/* ----------------- Wall ------------------ */

function wallTouch(element) {
	if (gameOver === false) {

		element.className = 'wall touch';

		$('notice').innerHTML = 'You Lose!';

		gameOver = true;
		gameCheat = false;

	}
}

function wallRestore(element) {
	element.className = 'wall';
}

/* --------------- Wall END ---------------- */

/* ----------------- Check ----------------- */

function Cheat() {
	gameCheat = true;
}

function cancleCheat() {
	gameCheat = false;
}

/* --------------- Check END --------------- */