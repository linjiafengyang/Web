$(document).ready(function() {
	// 点击@+执行机器人程序
	$(".icon").click(function() {
			robotAction();
	});
	// 机器人按生成的随机顺序点击li按钮
	function robotAction() {
		var handler = [aHandler, bHandler, cHandler, dHandler, eHandler];
		var callback = [];
		var temp = randomSort();
		for (var i = 1; i <= 4; i++) {
			(function(i) {
				callback[i] = function(error, currentSum) {
					if (error) {
						$("#message").text(error);
						$("#info-bar p").text(currentSum);
					} else {
						handler[temp[i]](currentSum, callback[i + 1]);
					}
				}
			})(i);
		}
		callback[5] = function(error, currentSum) {
			if (error) {
				$("#message").text(error);
				$("#info-bar p").text(currentSum);
			} else {
				setTimeout(func, 1500);
			}
		}
		handler[temp[0]](0, callback[1]);
	}
	// 生成随机顺序
	function randomSort() {
		var randomSortNumber = [];
		var count = 0;
		while (count < 5) {
			var temp = Math.floor(Math.random() * 5);
			if ($.inArray(temp, randomSortNumber) == -1) {
				randomSortNumber.push(temp);
				count++;
			}
		}
		showRandomSort(randomSortNumber);
		return randomSortNumber;
	}
	// 在大气泡上方显示机器人的操作顺序
	function showRandomSort(randomSortNumber) {
		var abcde = ['A', 'B', 'C', 'D', 'E'];
		var showInfoMessage = "随机顺序为:";
		for (var i = 0; i < randomSortNumber.length - 1; i++) {
			showInfoMessage += abcde[randomSortNumber[i]] + "→";
		}
		showInfoMessage += abcde[randomSortNumber[4]];
		$("#infoMessage").text(showInfoMessage);
	}
	// 五个小按钮的处理函数
	function aHandler(currentSum, callback) {
		$("#message").text("A:这是个天大的秘密");
		var obj = $("li").eq(0);
		if ($(obj).find("p").text() == "") {
			var temp = disableOtherLi(obj);
			$(obj).find("p").css({
				'visibility': 'visible'
			}).text("...");
			var that = obj;
			$.get("/", function(data) {
				var errorCode = Math.floor(Math.random() * 10);
				if (errorCode != 2) {
					$(that).removeClass('active').addClass('inactive').find("p").text(data);
					enableOtherLi(temp);
					checkLiForInforbar();
					currentSum += parseInt(data);
					callback(null, currentSum);
				} else {
					callback(new Error("A:这不是个天大的秘密"), currentSum);
				}
			});
		}
	}
	function bHandler(currentSum, callback) {
		$("#message").text("B:我不知道");
		var obj = $("li").eq(1);
		if ($(obj).find("p").text() == "") {
			var temp = disableOtherLi(obj);
			$(obj).find("p").css({
				'visibility': 'visible'
			}).text("...");
			var that = obj;
			$.get("/", function(data) {
				var errorCode = Math.floor(Math.random() * 10);
				if (errorCode != 2) {
					$(that).removeClass('active').addClass('inactive').find("p").text(data);
					enableOtherLi(temp);
					checkLiForInforbar();
					currentSum += parseInt(data);
					callback(null, currentSum);
				} else {
					callback(new Error("B:我知道"), currentSum);
				}
			});
		}
	}
	function cHandler(currentSum, callback) {
		$("#message").text("C:你知道");
		var obj = $("li").eq(2);
		if ($(obj).find("p").text() == "") {
			var temp = disableOtherLi(obj);
			$(obj).find("p").css({
				'visibility': 'visible'
			}).text("...");
			var that = obj;
			$.get("/", function(data) {
				var errorCode = Math.floor(Math.random() * 10);
				if (errorCode != 2) {
					$(that).removeClass('active').addClass('inactive').find("p").text(data);
					enableOtherLi(temp);
					checkLiForInforbar();
					currentSum += parseInt(data);
					callback(null, currentSum);
				} else {
					callback(new Error("C:你知道"), currentSum);
				}
			});
		}
	}
	function dHandler(currentSum, callback) {
		$("#message").text("D:他不知道");
		var obj = $("li").eq(3);
		if ($(obj).find("p").text() == "") {
			var temp = disableOtherLi(obj);
			$(obj).find("p").css({
				'visibility': 'visible'
			}).text("...");
			var that = obj;
			$.get("/", function(data) {
				var errorCode = Math.floor(Math.random() * 10);
				if (errorCode != 2) {
					$(that).removeClass('active').addClass('inactive').find("p").text(data);
					enableOtherLi(temp);
					checkLiForInforbar();
					currentSum += parseInt(data);
					callback(null, currentSum);
				} else {
					callback(new Error("D:他知道"), currentSum);
				}
			});
		}
	}
	function eHandler(currentSum, callback) {
		$("#message").text("E:才怪");
		var obj = $("li").eq(4);
		if ($(obj).find("p").text() == "") {
			var temp = disableOtherLi(obj);
			$(obj).find("p").css({
				'visibility': 'visible'
			}).text("...");
			var that = obj;
			$.get("/", function(data) {
				var errorCode = Math.floor(Math.random() * 10);
				if (errorCode != 2) {
					$(that).removeClass('active').addClass('inactive').find("p").text(data);
					enableOtherLi(temp);
					checkLiForInforbar();
					currentSum += parseInt(data);
					callback(null, currentSum);
				} else {
					callback(new Error("E:才不怪"), currentSum);
				}
			});
		}
	}
	// 有li正在向服务器请求随机数时，灭活（disable）其他li按钮，变为灰色
	function disableOtherLi(obj) {
		var temp = [];
		$("li").each(function() {
			if (this != obj && $(this).find("p").text() == "") {
				temp.push(this);
				$(this).removeClass('active').addClass('inactive');
			}
		});
		return temp;
	}
	// 获得随机数后激活（enable）其他li按钮
	function enableOtherLi(temp) {
		for (var i = temp.length - 1; i >= 0; i--) {
			$(temp[i]).removeClass('inactive').addClass('active');
		}
	}
	// 检查li按钮是否已全部获得随机数，成功则激活大气泡
	function checkLiForInforbar() {
		if (isProcessed()) {
			$("#info-bar").find("div").addClass('active');
		}
	}
	// 判断li按钮是否已全部获得随机数
	function isProcessed() {
		var check = true;
		$("li").each(function() {
			if ($(this).find("p").text() == "" || $(this).find("P").text() == "...") {
				check = false;
			}
		});
		return check;
	}
	// 实现延时
	function func() {
		infoClickAction($('#info-bar'));
	}
	// 成功激活大气泡，计算A~E的随机数之和，灭活大气泡（大气泡的处理函数）
	function infoClickAction(obj) {
		if (isProcessed()) {
			var result = 0;
			$("li p").each(function() {
				result = parseInt(result) + parseInt($(this).text());
			});
			$("#info-bar p").text(result);
			$("#message").text("楼主异步调用战斗力感人，目测不超过" + result);
			$(obj).find("div").removeClass('active');
			$("li").removeClass('inactive').addClass('active');
		}
	}
	// 鼠标再次指向@+，可以开始新一轮的计算操作
	$("#button").hover(function() {
		restore();
	}, function() {
		restore();
	});
	// 鼠标离开@+区域，重置整个计算器，清除随机数及其和
	function restore() {
		$("#infoMessage").text("");
		$("#message").text("");
		$("#info-bar div").removeClass('active').find("p").text("");
		$("li p").each(function() {
			$(this).css({
				'visibility': 'hidden'
			}).text("");
		});
		$("li").removeClass('inactive').addClass('active');
	}
});