$(document).ready(function() {
	// 判断是否有li在向服务器请求随机数
	var onProcess = false;
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

	function ClickAction(obj, callback) {
		// 如果在li发出请求后，就不可以点击其他任何按钮，包括自身
		if ($(obj).find("p").text() == "") {
			var temp = disabledOtherLi(obj);
			$(obj).find("p").css({'visibility': 'visible'}).text("...");
			var that = obj;
			$.get("/", function(data) {
				$(that).removeClass('statue_activation').addClass('statue_inactivation').find("p").text(data);
				resetOtherLi(temp);
				check_infoBarForActive();
				callback();
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
		}
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
// 生成随机点亮数列
	function randomNum() {
		var temp = [];
		var count = 0;
		while (count < 5) {
			var tem = Math.floor(Math.random() * 5);
			if ($.inArray(tem, temp) == -1) {
				temp.push(tem);
				count++;
			}
		}
		console.log(temp);
		showRandomNumInInfo(temp);
		return temp;
	}
// 显示一行操作顺序的字母
	function showRandomNumInInfo(temp) {
		var ap = ['A', 'B', 'C', 'D', 'E'];
		var res = "随机顺序为：";
		for (var i = 0; i <= temp.length - 1; i++) {
			res += ap[temp[i]] + " ";
		};
		$("#InfoMessage").text(res);
	}
// 实现一个延时的函数
	function func() {
		InfoClickAction($("#info-bar"));
	}
// 机器人自动点击
	function robotAction() {
		// console.log("I am robot");
		var callback = [];
		var temp = randomNum();
		for (var i = 1; i <= 4; i++) {
			(function(i){
				callback[i] = function() {
					ClickAction($("li").get(temp[i]), callback[i + 1]);
				}
			})(i);
		};
		callback[5] = function() {
			setTimeout(func, 1500);
		}
		ClickAction($("li").get(temp[0]), callback[1]);
	}
// 中心@+点击开始机器人，每一次鼠标hover只能点击一次
	$("#icon").click(function() {
		if (!onProcess) {
			robotAction();
			onProcess = true;
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
		$("#InfoMessage").text("");
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