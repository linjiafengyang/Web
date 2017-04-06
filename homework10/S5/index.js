$(document).ready(function() {

	resetAll();

	$('#button').mouseover(setAll);
	$('#button').mouseleave(resetAll);

	$('.icon').click(function() {

		var randomOrder = ['#A', '#B', '#C', '#D', '#E'];
		for (var j, x, i = randomOrder.length; i; j = parseInt(Math.random() * i), x = randomOrder[--i], randomOrder[i] = randomOrder[j], randomOrder[j] = x);
			// get a random order

		// console.log('AI_Android start', randomOrder.toString());

		$('#order').html('Random order:<br />' + randomOrder.toString().replace(/,#/g, '->').replace(/#/, '')).show();

		// AI_Android(randomOrder[0], randomOrder[1], randomOrder[2], randomOrder[3], randomOrder[4], '#info');


			// Asynchronous method, learn from ericqingwang's ppt
		sum(randomOrder[0], randomOrder[1], randomOrder[2], randomOrder[3], randomOrder[4],
			function(err, sum){

				if (isAllVisited()) {
					$('#sum').html("not more than " + sum).show();
					$('#info').removeClass('enable').addClass('disable');
				}


			});
	});

});

function setAll() {
	$('#button').removeClass('leave');
}

function resetAll() {
	$('li').unbind();
	$('#info').unbind();
	$('#sum').html('').hide();
	$('#order').html('').hide();
	$('#button').addClass('leave');
	$('span').removeClass('unread').html('').hide();
	$('#info').removeClass('enable').addClass('disable');
	$('li').removeClass('disable').removeClass('used').addClass('enable');
}

/*function getSum() {
	return	parseFloat($('#spanA').html()) +
			parseFloat($('#spanB').html()) +
			parseFloat($('#spanC').html()) +
			parseFloat($('#spanD').html()) +
			parseFloat($('#spanE').html());
}*/

function isEnable(buttonClassName) {
	return /enable/.test(buttonClassName);
}

function isVisited(buttonClassName) {
	return /used/.test(buttonClassName);
}

function isAllVisited() {
	return	isVisited($('#A').attr('class')) &&
			isVisited($('#B').attr('class')) &&
			isVisited($('#C').attr('class')) &&
			isVisited($('#D').attr('class')) &&
			isVisited($('#E').attr('class'));
}

function setButtonsEnable() {
	var buttons = $('li');
	for (var i = 0; i < buttons.length; ++i) {
		if (!isVisited(buttons[i].className))
			$('#' + buttons[i].id).removeClass('disable').addClass('enable');
	}
}

function setButtonsDisable() {
	var buttons = $('li');
	for (var i = 0; i < buttons.length; ++i) {
		if (!isVisited(buttons[i].className))
			$('#' + buttons[i].id).removeClass('enable').addClass('disable');
	}
}

/*function AI_Android() {
	var order = Array.prototype.slice.call(arguments, 0, arguments.length);
	// if mouse leave button, cancle the async
	$(order[0]).trigger('_click');
	$(order[0]).on('done', function() {
		if (!/leave/.test($('#button').attr('class'))) {
			$(order[1]).trigger('_click');
			$(order[1]).on('done', function() {
				if (!/leave/.test($('#button').attr('class'))) {
					$(order[2]).trigger('_click');
					$(order[2]).on('done', function() {
						if (!/leave/.test($('#button').attr('class'))) {
							$(order[3]).trigger('_click');
							$(order[3]).on('done', function() {
								if (!/leave/.test($('#button').attr('class'))) {
									$(order[4]).trigger('_click');
									$(order[4]).on('done', function() {
									});
								}
							});
						}
					});
				}
			});
		}
	});
}
*/


	// actually like ericqingwang's method, we can use closure to deal with
	// all the callbacks. but it is no need here and i just, just wanna
	// loaf on the job, plz. quite tired and wanna a cup of hot cocoa
function sum() {
	var addents = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
	var callbacks = arguments[arguments.length - 1];
	add(addents[0], addents[1], addents[2], addents[3], addents[4], callbacks);
}


	// loafing... just like ericqingwang said the error should be handled
	// by it's caller, callee just callback the error
function add(a, b, c, d, e, callback) {
	decrypt(a, function(err, p_a) {
		if (err) {
			var temp = $('#order').html();
			temp += err.message;
			$('#order').html(temp);
		}
		decrypt(b, function(err, p_b) {
			if (err) {
				var temp = $('#order').html();
				temp += err.message;
				$('#order').html(temp);
			}
			decrypt(c, function(err, p_c) {
				if (err) {
					var temp = $('#order').html();
					temp += err.message;
					$('#order').html(temp);
				}
				decrypt(d, function(err, p_d) {
					if (err) {
						var temp = $('#order').html();
						temp += err.message;
						$('#order').html(temp);
					}
					decrypt(e, function(err, p_e) {
						if (err) {
							var temp = $('#order').html();
							temp += err.message;
							$('#order').html(temp);
						}
						callback(null, parseFloat(p_a) + parseFloat(p_b) + 
							parseFloat(p_c) + parseFloat(p_d) + parseFloat(p_e));
					});
				});
			});
		});
	});
}

function decrypt(whichButton, callback) {
	$(whichButton).bind('_click', function() {
		if (isEnable(this.className) && !isVisited(this.className)) {

			var buttonId = this.id;

			$(this).addClass('used').find('span').html('...').addClass('unread').show();
			setTimeout(setButtonsDisable, 10);

			$.post('/id=' + buttonId, function(data, status) {

				$('#' + buttonId).removeClass('enable').addClass('disable');
				setButtonsEnable();

				var param = this.url.match(/id=(.)+/);
				$('#span' + param[1]).html(data);

				if (isAllVisited())
					$('#info').removeClass('disable').addClass('enable');

				$('#' + buttonId).trigger('done');

				var temp = $('#order').html();

				if (/*status == "success"*/
					Math.random() > 0.5
					) {

					switch(buttonId) {
						case 'A': temp += "<br /> A: it's a big secret"; break;
						case 'B': temp += "<br /> B: i don't know"; break;
						case 'C': temp += "<br /> C: you don't know"; break;
						case 'D': temp += "<br /> D: it  don't know"; break;
						case 'E': temp += "<br /> E: kidding"; break;
					}
					$('#order').html(temp);
					callback(null, data);

				} else {
					var errorMessage;
					switch(buttonId) {

						case 'A': errorMessage = "<br /> A: it's not a big secret"; break;
						case 'B': errorMessage = "<br /> B: i know"; break;
						case 'C': errorMessage = "<br /> C: you know"; break;
						case 'D': errorMessage = "<br /> D: it know"; break;
						case 'E': errorMessage = "<br /> E: not kidding"; break;
					}

					callback(new Error(errorMessage), data);
				}

			});
		}
	});
	$(whichButton).trigger('_click');
}