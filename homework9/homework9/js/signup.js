$(function() {
	// 判断用户名是否符合格式
	var name_test = /^[a-zA-Z][a-zA-Z0-9_]{0,}$/;
	$('#name').on('input', function() {
		if (name_test.test($('#name').val())) {
			if ($('#name').val().length < 6) {
				$('#name_tip').text("字符串长度小于6位");
			} else if ($('#name').val().length > 18) {
				$('#name_tip').text("字符串长度大于18位");
			} else {
				$('#name_tip').text("");
			}
		} else {
			if ($('#name').val().length == 1) { 
				$('#name_tip').text("开头必须是字母");
			} else if ($('#name').val().length == 0) {
				$('#name_tip').text("");
			} else {
				$('#name_tip').text("有非法字符存在");
			}
		}
	});
	// 判断学号是否符合格式
	var id_test = /^[0-9]{0,}$/
	$('#id').on('input', function() {
		var id_length = $('#id').val().length;
		if (id_test.test($('#id').val())) {
			if (id_length == 1) {
				if ($('#id').val()[0] == '0') $('#id_tip').text("不能以0开头");
			} else {
				$('#id_tip').text("");
			} 
			if (id_length > 8) $('#id_tip').text("字符串长度大于8位");
			if (id_length < 8 && id_length != 0) $('#id_tip').text("字符串长度小于8位");
		} else {
			$('#id_tip').text("有非法字符存在");
		}
	});
	// 判断电话号码是否符合格式
	var phone_test = /^[0-9]{0,}$/
	$('#phone').on('input', function() {
		var phone_length = $('#phone').val().length;
		if (id_test.test($('#phone').val())) {
			if (phone_length == 1) {
				if (phone_length == '0') $('#phone_tip').text("不能以0开头");
			} else {
				$('#phone_tip').text("");
			} 
			if (phone_length > 11) $('#phone_tip').text("字符串长度大于11位");
			if (phone_length < 11 && phone_length != 0) $('#phone_tip').text("字符串长度小于11位");
		} else {
			$('#phone_tip').text("有非法字符存在");
		}
	});
	// 判断邮箱是否符合格式
	var email_test = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/;
	$('#email').on('input', function() {
		var email_length = $('#email').val().length;
		if (email_test.test($('#email').val()) || email_length == 0) $('#email_tip').text("");
		else $('#email_tip').text("格式错误");
	});
	// 点击重置按钮时清空所有输入和提示的信息
	$('#reset').click(function() {
		$('#name').val("");
		$('#id').val("");
		$('#phone').val("");
		$('#email').val("");
		$('#name_tip').text("");
		$('#id_tip').text("");
		$('#phone_tip').text("");
		$('#email_tip').text("");
	})
	// 格式错误和输入为空时阻止表单提交并弹出相应信息
	$('form').submit(function(event) {
		if ($('#name').val() != '' && $('#id').val() != '' && $('#phone').val() != ''
			&& $('#email').val() != '' && $('#name_tip').text() == '' && $('#id_tip').text() == ''
			&& $('#phone_tip').text() == '' && $('#email_tip').text() == '') {
		} else if (($('#name').val() == '' || $('#id').val() == '' || $('#phone').val() == ''
			|| $('#email').val() == '') && $('#name_tip').text() == '' && $('#id_tip').text() == ''
			&& $('#phone_tip').text() == '' && $('#email_tip').text() == '') {
			alert("输入不能为空，请重新输入！");
			event.preventDefault();
		} else {
			alert("输入格式错误，请重新输入！");
			event.preventDefault();
		}
	})

});