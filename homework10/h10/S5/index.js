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
// 5个事件处理函数
	function aHandler(curSum, callback) {
		$("#ringMessage").text("这是个天大的秘密");
		var obj = $("li").eq(0);
		if ($(obj).find("p").text() == "") {
			var temp = disabledOtherLi(obj); // 灭活其他圆圈
			$(obj).find("p").css({
				'visibility': 'visible'
			}).text("...");
			var that = obj;
			$.get("/", function(data) {
				var errCode = Math.floor(Math.random() * 10);
				// var errCode = 2;
				if (errCode != 2) {
					$(that).removeClass('statue_activation').addClass('statue_inactivation').find("p").text(data);
					resetOtherLi(temp);
					check_infoBarForActive();
					curSum += parseInt((data));
					callback(null, curSum);
				} else {
					callback(new Error("这不是个天大的秘密"), curSum)
				}
			});
		};
	}

	function bHandler(curSum, callback) {
		$("#ringMessage").text("我不知道");
		var obj = $("li").eq(1);
		if ($(obj).find("p").text() == "") {
			var temp = disabledOtherLi(obj);
			$(obj).find("p").css({
				'visibility': 'visible'
			}).text("...");
			var that = obj;
			$.get("/", function(data) {
				var errCode = Math.floor(Math.random() * 10);
				// var errCode = 2;
				if (errCode != 2) {
					$(that).removeClass('statue_activation').addClass('statue_inactivation').find("p").text(data);
					resetOtherLi(temp);
					check_infoBarForActive();
					curSum += parseInt((data));
					callback(null, curSum);
				} else {
					callback(new Error("我知道"), curSum)
				}
			});
		};
	}

	function cHandler(curSum, callback) {
		$("#ringMessage").text("你知道");
		var obj = $("li").eq(2);
		if ($(obj).find("p").text() == "") {
			var temp = disabledOtherLi(obj);
			$(obj).find("p").css({
				'visibility': 'visible'
			}).text("...");
			var that = obj;
			$.get("/", function(data) {
				var errCode = Math.floor(Math.random() * 10);
				// var errCode = 2;
				if (errCode != 2) {
					$(that).removeClass('statue_activation').addClass('statue_inactivation').find("p").text(data);
					resetOtherLi(temp);
					check_infoBarForActive();
					curSum += parseInt((data));
					callback(null, curSum);
				} else {
					callback(new Error("你知道"), curSum)
				}
			});
		};
	}

	function dHandler(curSum, callback) {
		$("#ringMessage").text("他不知道");
		var obj = $("li").eq(3);
		if ($(obj).find("p").text() == "") {
			var temp = disabledOtherLi(obj);
			$(obj).find("p").css({
				'visibility': 'visible'
			}).text("...");
			var that = obj;
			$.get("/", function(data) {
				var errCode = Math.floor(Math.random() * 10);
				// var errCode = 2;
				if (errCode != 2) {
					$(that).removeClass('statue_activation').addClass('statue_inactivation').find("p").text(data);
					resetOtherLi(temp);
					check_infoBarForActive();
					curSum += parseInt((data));
					callback(null, curSum);
				} else {
					callback(new Error("他知道"), curSum)
				}
			});
		};
	}

	function eHandler(curSum, callback) {
		$("#ringMessage").text("才怪");
		var obj = $("li").eq(4);
		console.log($(obj));
		if ($(obj).find("p").text() == "") {
			var temp = disabledOtherLi(obj);
			$(obj).find("p").css({
				'visibility': 'visible'
			}).text("...");
			var that = obj;
			$.get("/", function(data) {
				var errCode = Math.floor(Math.random() * 10);
				// var errCode = 2;
				if (errCode != 2) {
					$(that).removeClass('statue_activation').addClass('statue_inactivation').find("p").text(data);
					resetOtherLi(temp);
					check_infoBarForActive();
					curSum += parseInt((data));
					callback(null, curSum);
				} else {
					callback(new Error("才不怪"), curSum)
				}
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
			$("#ringMessage").text("楼主异步调用战斗力感人，目测不超过：" + res);
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
		var ap = [aHandler, bHandler, cHandler, dHandler, eHandler];
		var callback = [];
		var temp = randomNum();
		for (var i = 1; i <= 4; i++) {
			(function(i) {
				callback[i] = function(err, curSum) {
					if (err) {
						$("#ringMessage").text(err);
						$("#info-bar p").text(curSum);
					} else {
						ap[temp[i]](curSum, callback[i + 1]);
					}
				}
			})(i);
		};
		callback[5] = function(err, curSum) {
			if (err) {
				$("#ringMessage").text(err);
				$("#info-bar p").text(curSum);
			} else {
				setTimeout(func, 1500);
			}
		}
		ap[temp[0]](0, callback[1]);
	}
// 中心@+点击开始机器人
	$("#icon").click(function() {
		robotAction();
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
		$("#InfoMessage").text("");
		$("#ringMessage").text("");
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