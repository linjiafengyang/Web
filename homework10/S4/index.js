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

		AI_Android(randomOrder[0], randomOrder[1], randomOrder[2], randomOrder[3], randomOrder[4], '#info');

	});

});

function setAll() {
	$('#button').removeClass('leave');
	$('li').bind('_click', function() {
		if (isEnable(this.className) && !isVisited(this.className)) {

			var buttonId = this.id;

			$(this).addClass('used').find('span').html('...').addClass('unread').show();
			setTimeout(setButtonsDisable, 10);

			$.post('/id=' + buttonId, function(data) {

				$('#' + buttonId).removeClass('enable').addClass('disable');
				setButtonsEnable();

				var param = this.url.match(/id=(.)+/);
				$('#span' + param[1]).html(data);

				if (isAllVisited())
					$('#info').removeClass('disable').addClass('enable');

				$('#' + buttonId).trigger('done');
			});
		}
	});

	$('#info').bind('_click', function() {
		if (isAllVisited()) {
			$(this).find('#sum').html(getSum()).show();
			$('#info').removeClass('enable').addClass('disable');
		}
	});
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

function getSum() {
	return	parseFloat($('#spanA').html()) +
			parseFloat($('#spanB').html()) +
			parseFloat($('#spanC').html()) +
			parseFloat($('#spanD').html()) +
			parseFloat($('#spanE').html());
}

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

function AI_Android() {
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

										if (!/leave/.test($('#button').attr('class'))) {
											$(order[5]).trigger('_click');

										}
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