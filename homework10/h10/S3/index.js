$(document).ready(function() {
	// 在得到结果前灭活其它li按钮，变为灰色
	function disabledOtherLi(obj) {
		var that = obj;
		var temp = [];
		$("li").each(function(index, el) {
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

	function ClickAction(obj) {
		// 如果在li发出请求后，就不可以点击其他任何按钮，包括自身
		if ($(obj).find("p").text() == "") {
			// var temp = disabledOtherLi(obj);
			$(obj).find("p").css({'visibility': 'visible'}).text("...");
			var that = obj;
			$.get("/", function(data) {
				$(that).removeClass('statue_activation').addClass('statue_inactivation').find("p").text(data);
				// resetOtherLi(temp);
				check_infoBarForActive();
			});
		};
	}

// 判断A~E按钮是否全部获得了自己的随机数，确定激活大气泡
	function ifReadyForRes() {
		var res = true;
		$("li").each(function(index, el) {
			if ($(this).find("p").text() == "" || $(this).find("p").text() == "...") {
				res = false;
			}
		});
		return res;
	}
// 判断A~E按钮是否全部获得了自己的随机数，确定激活大气泡

	function check_infoBarForActive() {
		if (ifReadyForRes()) {
			$("#info-bar").find("div").addClass('statue_activation');
			// 激活大气泡之后停留1.5s，等待颜色动画的切换，效果比较明显，然后就自动执行点击事件
			setTimeout(func, 1500);
		}
	}
// 实现一个延时的函数
	function func() {
		InfoClickAction($("#info-bar"));
	}
// 点击大气泡
	function InfoClickAction(obj) {
		if (ifReadyForRes()) {
			var res = 0;
			$("li p").each(function(index, el) {
				res = parseInt(res) + parseInt($(this).text());
			});
			$("#info-bar p").text(res);
			$(obj).find("div").removeClass('statue_activation');
		}
	}
// 机器人同时点击
	function robotAction() {
		var callback = [];
		for (var i = 0; i <= 4; i++) {
			ClickAction($("li").get(i));
		}
	}
// 中心@+点击开始机器人
	$("#button").hover(function() {
		// 鼠标再次指向@+，可以开始新一轮的计算操作
		restore();
		$("#icon").click(function() {
			robotAction();
		});
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		restore();
	});
// 任何时候，鼠标离开@+区域，将重置整个计算器，清除所有A~E按钮的随机数和大气泡内的和
	function restore() {
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