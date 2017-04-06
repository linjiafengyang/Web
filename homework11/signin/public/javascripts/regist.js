$(function () {
    $('input:not(.button)').blur(function () {
        if (validator.isFieldValid(this.id, $(this).val())) {
            $(this).parent().find('.error').text('');
        } else {
            $(this).parent().find('.error').text(validator.form[this.id].errorMessage);
        }
    });

    //表单提交时进行检查
	$("form").submit(function() {
		//console.log("submit");
        $('input:not(.button)').blur();
		if (validator.isFormValid()) {
			return true;
		} else {
			return false;
		}
	});

    //$('input[type=submit]').click(function() {
    //    $('input:not(.button)').blur();
    //    //console.log(this.type == 'submit')
    //    if (!validator.isFormValid() && this.type == 'submit'){
    //        console.log(validator.isFormValid())
    //        return false;
    //    } else {
    //        console.log("sucee")
    //        return true;
    //    }
    //});
});

//$(document).ready(function() {
//// 四个输入格式检查函数
//	function name_check(obj) {
//		var word = $(obj).val();
//		if (/^[a-zA-Z]{1}[a-zA-Z0-9_]{5,17}/.test(word)) {
//			$("#error").text("\t");
//			return true;
//		} else {
//			$("#error").text("用户名输入格式不正确，请重新输入！");
//			return false;
//		}
//	}
//
//	function num_check(obj) {
//		var word = $(obj).val();
//		if (/^[1-9]{1}[0-9]{7}/.test(word)) {
//			$("#error").text("\t");
//			return true;
//		} else {
//			$("#error").text("学号输入格式不正确，请重新输入！");
//			return false;
//		}
//	}
//
//	function phone_check(obj) {
//		var word = $(obj).val();
//		if (/^[1-9]{1}[0-9]{10}/.test(word)) {
//			$("#error").text("\t");
//			return true;
//		} else {
//			$("#error").text("手机输入格式不正确，请重新输入！");
//			return false;
//		}
//	}
//
//	function email_check(obj) {
//		var word = $(obj).val();
//		if (/^[a-zA-Z0-9_]+@(([a-zA-Z0-9_])+\.)+[a-zA-Z]{2,4}/.test(word)) {
//			$("#error").text("\t");
//			return true;
//		} else {
//			$("#error").text("邮箱输入格式不正确，请重新输入！");
//			return false;
//		}
//	}
//// 文本框失去焦点时，检查输入
//	$("#name").blur(function() {
//		name_check(this);
//	});
//	$("#num").blur(function() {
//		num_check(this);
//	});
//	$("#phone").blur(function() {
//		phone_check(this);
//	});
//	$("#email").blur(function() {
//		email_check(this);
//	});
//// 表单提交时进行检查
//	$("form").submit(function() {
//		//console.log("submit");
//		if (name_check($("#name")) && num_check($("#num")) &&
//			phone_check($("#phone")) && email_check($("#email"))) {
//			console.log("submit true");
//			return true;
//		} else {
//            console.log("submit false");
//			return false;
//		}
//	});
//});