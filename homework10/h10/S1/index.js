$(document).ready(function() {
	// 判断是否有li在向服务器请求随机数
	var onProcess = false;
	// 在得到结果前灭活其它li按钮，变为灰色
	function disabledOtherLi(obj) {
		var that = obj;
		var temp = [];
		$("li").each(function(index, el) {
			console.log(this != obj);
			if (this != obj && $(this).find("p").text() == "") {
				temp.push(this);
				$(this).removeClass('statue_activation').addClass('statue_inactivation');
			}
		});
		return temp;
	}
	// 得到服务器发回的随机数后激活（enable）其余按钮
	function resetOtherLi(temp) {
		for (var i = temp.length - 1; i >= 0; i--) {
			$(temp[i]).removeClass('statue_inactivation').addClass('statue_activation');
		};
	}

	$("li").click(function(event) {
		if (onProcess != true && $(this).find("p").text() == "") {
			onProcess = true;
			var temp = disabledOtherLi(this);
			$(this).find("p").css({
				'visibility': 'visible'
			}).text("...");
			var that = this;
			$.get("/", function(data) {
				$(that).removeClass('statue_activation').addClass('statue_inactivation').find("p").text(data);
				resetOtherLi(temp);
				onProcess = false;
				check_infoBarForActive();
			});
		};
	});

// 判断A~E按钮是否全部获得了自己的随机数，确定激活大气泡
	function ifReadyForRes() {
		var res = true;
		$("li").each(function(index, el) {
			if ($(this).find("p").text() == "") {
				res = false;
			}
		});
		return res;
	}
// 判断A~E按钮是否全部获得了自己的随机数，确定激活大气泡
	function check_infoBarForActive() {
		if (ifReadyForRes()) {
			$("#info-bar").find("div").addClass('statue_activation');
		}
	}
// 点击大气泡
	$("#info-bar").click(function(event) {
		if (ifReadyForRes()) {
			var res = 0;
			$("li p").each(function(index, el) {
				res = parseInt(res) + parseInt($(this).text());
			});
			$("#info-bar p").text(res);
			$(this).find("div").removeClass('statue_activation');
		}
	});

	$("#button").hover(function() {
		// 鼠标再次指向@+，可以开始新一轮的计算操作
		restore();
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		restore();
	});
// 任何时候，鼠标离开@+区域，将重置整个计算器，清除所有A~E按钮的随机数和大气泡内的和
	function restore() {
		onProcess = false;
		$("#info-bar div").removeClass('statue_activation').find("p").text("");
		$("li p").each(function(index, el) {
			$(this).css({
				'visibility': 'hidden'
			}).text("");
		});
		$("li").each(function(index, el) {
			$(this).removeClass('statue_inactivation').addClass('statue_activation');
		});
	}
});