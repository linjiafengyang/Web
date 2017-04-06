window.onload = function() {
	for (var i = 1; i < 16; ++i) {
		puzzle.pieces[i].onclick = function() {swapPosition(this);}//move puzzle
		puzzle.pieces[i].onmouseover = function() {scale(this);}//give puzzle css(scale)
		puzzle.pieces[i].onmouseout = function() {cancleScale(this);}//cancle puzzle css(scale)
	}
	chooseOnclick();//choose [start] or [give up] or [auto]
}
function chooseOnclick() {
	puzzle.start.onclick = function() {if (puzzle.running === 0) shuffle();}//start the game and shuffle the puzzles
	puzzle.giveUp.onclick = function() {if (puzzle.running === 0) distribute([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);}//give up the game and restore the puzzles
	puzzle.auto.onclick = function() {
		if (puzzle.running === 0) {
			puzzle.running = 1;
			automation();
		}
	}//when you just start(not move even a puzzle),clicking it can restore the puzzles
}
function shuffle() {
	var number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	for (var j, x, i = number.length; i; j = parseInt(Math.random() * 2), x = number[--i], number[i] = number[j], number[j] = x);//shuffling the pieces
	if (shuffleFail(number)) {
		var temp = number[13];
		number[13] = number[14];
		number[14] = temp;
	}//if fail, it means the last two pieces is in wrong places so changing them
	distribute(number);
}
function shuffleFail(number) {
	var total = 0;
	for (var i = 0; i < number.length - 1; ++i) {
		for (var j = i + 1; j < number.length; ++j) if (number[j] < number[i]) ++total;
	}
	return !(total % 2 === 0)
}
function distribute(number) {//set the initial stage as you like
	for (var i = 1; i < 16; ++i) {//distribute
		operationOnClassName(puzzle.pieces[i], puzzle.pieces[i].Position, NumberToPosition(number[i - 1]));
		puzzle.pieces[i].Position = NumberToPosition(number[i - 1]);
	}
	operationOnClassName(puzzle.space, puzzle.space.Position, NumberToPosition(16));
	puzzle.space.Position = NumberToPosition(16);//fix the space at right bottom to make the shuffling easier
}
function scale(piece) {
	var temp = piece.className;
	temp += ' scaleEffect';
	piece.className = temp;
}
function cancleScale(piece) {
	operationOnClassName(piece, ' scaleEffect', '');
}
function NumberToPosition(number) {
	return puzzle.positionMemory[number - 1];
}
function getPosition(obj) {
	return obj.className.substring(obj.className.indexOf('position'));
}
function swapPosition(element) {
	if (checkMobility(element)) {
		var tempPosition = puzzle.space.Position;
		puzzle.space.Position = element.Position;
		element.Position = tempPosition;
		operationOnClassName(puzzle.space, tempPosition, puzzle.space.Position);
		operationOnClassName(element, puzzle.space.Position, tempPosition);
		if (isSeted(15)) $('#notice')[0].innerHTML = 'Finish!';
		else $('#notice')[0].innerHTML = 'Continue...';
	}
}
//operation on class name
function operationOnClassName(needswap, needReplace, replacement) {needswap.className = needswap.className.replace(needReplace, replacement);}
function checkMobility(piece) {//check if puzzle can move
	var spaceRow = parseInt(puzzle.space.Position[9]);
	var spaceCol = parseInt(puzzle.space.Position[11]);
	var row = parseInt(piece.Position[9]);
	var col = parseInt(piece.Position[11]);
	if (row === spaceRow && col === spaceCol + 1 || row === spaceRow && col === spaceCol - 1) return true;
	if (col === spaceCol && row === spaceRow + 1 || col === spaceCol && row === spaceRow - 1) return true;
	return false;
}
function isSeted(number) {//check if finish the game
	for (var i = 1; i <= number; ++i) if (puzzle.pieces[i].Position != NumberToPosition(i)) return false;
	return true;
}
//OOP design puzzle
var puzzle = {
	space: (function() {
		var space = $('#space')[0];
		space.Position = getPosition(space);
		space.Move = spaceMove;
		space.MoveSet = spaceMoveSet;
		return space;
	})(),
	pieces: (function() {
		var pieces = [];
		pieces.push(null);// no used pieces[0]
		for (var i = 1; i < 16; ++i) {
			var piece = $('#piece_' + i)[0];
			piece.Position = getPosition(piece);
			piece.Move = pieceMove;
			pieces.push(piece);
		}
		return pieces;
	})(),
	//set buttons
	start: (function() { return $('#start')[0]; })(),
	giveUp: (function() { return $('#giveUp')[0]; })(),
	change: (function() { return $('#change')[0]; })(),
	auto: (function() { return $('#auto')[0]; })(),

	positionMemory: ['position_1_1', 'position_1_2', 'position_1_3', 'position_1_4',
		'position_2_1', 'position_2_2', 'position_2_3', 'position_2_4',
		'position_3_1', 'position_3_2', 'position_3_3', 'position_3_4',
		'position_4_1', 'position_4_2', 'position_4_3', 'position_4_4'],
	solution: new Array(),
	running: 0,
	here: 0
};
/* ----------------------- Auto Move ----------------------- */
function PositionToArray(position) {//position to array
	return new Array(parseInt(position[9]), parseInt(position[11]));
}
function clickByRowAndCol(PArray) {//click by row and col
	$('.position_' + PArray[0] + '_' + PArray[1])[0].onclick();
}
function spaceMove(direction) {
	var spacePA = PositionToArray(this.Position);
	if (direction === "up")
		if (spacePA[0] > 1) {
			clickByRowAndCol([spacePA[0] - 1, spacePA[1]]);
			puzzle.solution.unshift("up");
		}
	if (direction === "down")
		if (spacePA[0] < 4) {
			clickByRowAndCol([spacePA[0] + 1, spacePA[1]]);
			puzzle.solution.unshift("down");
		}
	if (direction === "left")
		if (spacePA[1] > 1) {
			clickByRowAndCol([spacePA[0], spacePA[1] - 1]);
			puzzle.solution.unshift("left");
		}
	if (direction === "right")
		if (spacePA[1] < 4) {
			clickByRowAndCol([spacePA[0], spacePA[1] + 1]);
			puzzle.solution.unshift("right");
		}
}
function spaceMoveSet(road) {
	for (var i = 0; i < road.length; ++i) puzzle.space.Move(road[i]);
}
function Where(i, j) {
	this.row = i;
	this.col = j;
}
function BFS(startPA, goalPA, piecePA) {
	var map = [ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ];
	for (var i = 0, k = 1; i < 4; ++i) {
		for (var j = 0; k < 16 && j < 4; ++j) map[i][j] = isSeted(k++) ? -1 : 0;
	}
	map[startPA[0]][startPA[1]] = 0;
	map[goalPA[0]][goalPA[1]] = 0;
	map[piecePA[0]][piecePA[1]] = -1;
	var start = new Where(startPA[0], startPA[1]);
	var queue = new Array();
	queue.unshift(start);
	while (queue.length != 0) {
		var queueTop = queue[queue.length - 1];
		if (queueTop.row - 1 >= 0 && map[queueTop.row - 1][queueTop.col] === 0) {//up
			map[queueTop.row - 1][queueTop.col] = map[queueTop.row][queueTop.col] + 1;
			queue.unshift(new Where(queueTop.row - 1, queueTop.col));
		}
		if (queueTop.row + 1 < 4 && map[queueTop.row + 1][queueTop.col] === 0) {//down
			map[queueTop.row + 1][queueTop.col] = map[queueTop.row][queueTop.col] + 1;
			queue.unshift(new Where(queueTop.row + 1, queueTop.col));
		}
		if (queueTop.col - 1 >= 0 && map[queueTop.row][queueTop.col - 1] === 0) {//left
			map[queueTop.row][queueTop.col - 1] = map[queueTop.row][queueTop.col] + 1;
			queue.unshift(new Where(queueTop.row, queueTop.col - 1));
		}
		if (queueTop.col + 1 < 4 && map[queueTop.row][queueTop.col + 1] === 0) {//right
			map[queueTop.row][queueTop.col + 1] = map[queueTop.row][queueTop.col] + 1;
			queue.unshift(new Where(queueTop.row, queueTop.col + 1));
		}
		queue.pop();
	}
	return map;
}
function getRoad(start, end, map) {
	map[start[0]][start[1]] = 0;
	var road = new Array();
	var now = new Where(end[0], end[1]);
	for (var i = map[now.row][now.col]; i > 0; --i) {
		if (now.row + 1 < 4 && map[now.row + 1][now.col] === i - 1) {
			road.unshift('up');
			now.row = now.row + 1;
		} else if (now.col + 1 < 4 && map[now.row][now.col + 1] === i - 1) {
			road.unshift('left');
			now.col = now.col + 1;
		} else if (now.row - 1 >= 0 && map[now.row - 1][now.col] === i - 1) {
			road.unshift('down');
			now.row = now.row - 1;
		} else if (now.col - 1 >= 0 && map[now.row][now.col - 1] === i - 1) {
			road.unshift('right');
			now.col = now.col - 1;
		}
	}
	return road;
}
function pieceMove(direction) {
	var piecePA = PositionToArray(this.Position);
	piecePA[0]--;
	piecePA[1]--;
	var spacePA = PositionToArray(puzzle.space.Position);
	spacePA[0]--;
	spacePA[1]--;
	var spaceGoalPA = [piecePA[0], piecePA[1]];
	if (direction === "up") spaceGoalPA[0]--;
	if (direction === "down") spaceGoalPA[0]++;
	if (direction === "left") spaceGoalPA[1]--;
	if (direction === "right") spaceGoalPA[1]++;
	var map = BFS(spacePA, spaceGoalPA, piecePA);
	var road = getRoad(spacePA, spaceGoalPA, map);
	puzzle.space.MoveSet(road);
	if (direction === "up") puzzle.space.Move("down");
	if (direction === "down") puzzle.space.Move("up");
	if (direction === "left") puzzle.space.Move("right");
	if (direction === "right") puzzle.space.Move("left");
}

function movePieceDirectly(number, goalPosition) {
	var piecePA = PositionToArray(puzzle.pieces[number].Position);
	var pieceGoalPA = PositionToArray(goalPosition);
	var pieceMovePA = [piecePA[0] - pieceGoalPA[0], piecePA[1] - pieceGoalPA[1]];
	while (pieceMovePA[1] > 0) {
		puzzle.pieces[number].Move("left");
		--pieceMovePA[1];
	}
	while (pieceMovePA[1] < 0) {
		puzzle.pieces[number].Move("right");
		++pieceMovePA[1];
	}
	while (pieceMovePA[0] > 0) {
		puzzle.pieces[number].Move("up");
		--pieceMovePA[0];
	}
	while (pieceMovePA[0] < 0) {
		puzzle.pieces[number].Move("down");
		++pieceMovePA[0];
	}
}
function automation() {
	var nowStage = new Array();
	for (var i = 1; i < 16; ++i) nowStage.push(PositionToNumber(puzzle.pieces[i].Position));
	getSolution();
	distribute(nowStage);
	puzzle.here = puzzle.solution.length;
	goSolution();
}
function PositionToNumber(position) {
	for (var i = 0; i < puzzle.positionMemory.length; ++i) if (position === puzzle.positionMemory[i]) return i + 1;
}
function goSolution() {
	if (puzzle.here > 0) {
		puzzle.space.Move(puzzle.solution[puzzle.solution.length - 1]);
		puzzle.solution.pop();
		puzzle.here--;
		t = setTimeout(goSolution, 100);
	} else {
		puzzle.solution.length = 0;
		puzzle.here = 0;
		clearTimeout(t);
		puzzle.running = 0;
	}
}
function getSolution() {
	movePieceDirectly(1, NumberToPosition(1));
	movePieceDirectly(2, NumberToPosition(2));
	movePieceDirectly(3, NumberToPosition(3));
	movePieceDirectly(4, NumberToPosition(16));
	puzzle.pieces[4].Move("up");
	if (puzzle.pieces[4].Position != NumberToPosition(4)) // place piece 4
		puzzle.space.MoveSet(["up", "up", "up", "left", "down", "right","down", "down", "left", "up", "up", "right", "down", "left", "up", "up", "right", "down"]);
	movePieceDirectly(5, NumberToPosition(5));
	movePieceDirectly(6, NumberToPosition(6));
	movePieceDirectly(7, NumberToPosition(7));
	movePieceDirectly(8, NumberToPosition(16));
	puzzle.pieces[8].Move("up");
	if (puzzle.pieces[8].Position != NumberToPosition(8)) // place piece 8
		puzzle.space.MoveSet(["up", "up", "left", "down", "right",
		"down", "left", "up", "up", "right", "down"
	]);
	movePieceDirectly(9, NumberToPosition(9));
	movePieceDirectly(10, NumberToPosition(10));
	if (puzzle.pieces[9].Position === NumberToPosition(9) && puzzle.space.Position === NumberToPosition(13) && puzzle.pieces[10].Position === NumberToPosition(14)) // place piece 10
		puzzle.space.MoveSet(["up", "right", "down", "right", "up", "left","left", "down", "right", "up", "left"]);
	if (puzzle.pieces[9].Position === NumberToPosition(10) && puzzle.space.Position === NumberToPosition(9) && puzzle.pieces[10].Position === NumberToPosition(11)) // ENSURANCES FOR THE NEXT STEPS
		puzzle.space.MoveSet(["right", "right"]);
	puzzle.space.MoveSet(["down", "down", "left", "left", "left", "up", "right"]);
	while (puzzle.pieces[13].Position != NumberToPosition(14)) { // place piece 13 
		puzzle.space.MoveSet(["down", "right"]);
		if (puzzle.pieces[13].Position === NumberToPosition(14)) break;
		puzzle.space.MoveSet(["right", "up", "left", "left"]);
	}
	puzzle.space.MoveSet(["right", "right", "right", "down", "down"]);
	if (puzzle.pieces[14].Position === NumberToPosition(10)) // place piece 14
		puzzle.space.MoveSet(["left", "left", "up", "right", "right", "down", "left","up", "left", "down", "right", "right", "up", "left", "left", "down", "right", "up"]);
	else
		while (puzzle.pieces[14].Position != NumberToPosition(15)) {
			puzzle.space.MoveSet(["left", "up"]);
			if (puzzle.pieces[14].Position === NumberToPosition(15)) break;
			puzzle.space.MoveSet(["right", "down"]);
		}
	if (puzzle.space.Position === NumberToPosition(16)) puzzle.space.MoveSet(["up", "left"]);
	puzzle.space.MoveSet(["left", "left", "down", "right", "right", "right"]);
	while (puzzle.pieces[15].Position != NumberToPosition(15)) puzzle.space.MoveSet(["up", "left", "down", "right"]);
}