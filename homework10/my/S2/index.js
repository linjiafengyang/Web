$(document).ready(function() {
	// 点击@+执行机器人程序
	$(".icon").click(function() {
		robotAction();
	});
	// 机器人按A~E的顺序点击li按钮
	function robotAction() {
		var callback = [];
		for (var i = 1; i <= 4; i++) {
			(function(i) {
				callback[i] = function() {
					clickAction($("li").get(i), callback[i + 1]);
				}
			})(i);
		}
		callback[5] = function() {
			setTimeout(func, 1500);
		}
		clickAction($("li").get(0), callback[1]);
	}
	// 触发li按钮，显示并处理红色圆圈，并发送请求到服务器获取随机数
	function clickAction(obj, callback) {
		if ($(obj).find("p").text() == "") {
			var temp = disableOtherLi(obj);// 灭活其他li按钮
			$(obj).find("p").css({
				'visibility': 'visible'
			}).text("...");
			var that = obj;
			$.get("/", function(data) {
				$(that).removeClass('active').addClass('inactive').find("p").text(data);
				enableOtherLi(temp);// 获得后激活其他li按钮
				checkLiForInforbar();// 检查li按钮是否已全部获得随机数，成功则激活大气泡
				callback();
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
			if ($(this).find("p").text() == "") {
				check = false;
			}
		});
		return check;
	}
	// 实现延时
	function func() {
		infoClickAction($('#info-bar'));
	}
	// 成功激活大气泡，计算A~E的随机数之和，灭活大气泡
	function infoClickAction(obj) {
		if (isProcessed()) {
			var result = 0;
			$("li p").each(function() {
				result = parseInt(result) + parseInt($(this).text());
			});
			$("#info-bar p").text(result);
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
		$("#info-bar div").removeClass('active').find("p").text("");
		$("li p").each(function() {
			$(this).css({
				'visibility': 'hidden'
			}).text("");
		});
		$("li").removeClass('inactive').addClass('active');
	}
});