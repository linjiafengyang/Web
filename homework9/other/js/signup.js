var localCheck = {
	CUN : false,
	CSID : false,
	CTLP : false,
	CEA : false
};

$(document).ready(function() {
	$("#UN").focusout(checkUsername);
	$("#SID").focusout(checkStudentID);
	$("#TLP").focusout(checkTelephone);
	$("#EA").focusout(checkEmailAddress);
	$("form").submit(formSubmit);
});

function formSubmit() {
	$("#UN").focusout();
	$("#SID").focusout();
	$("#TLP").focusout();
	$("#EA").focusout();

	if (localCheck.CUN && localCheck.CSID && localCheck.CTLP && localCheck.CEA) {
		$.post("", $("form").serialize());
		$("form").attr("action", "/?username=" + $("#UN").val());
	} else {
		return false;
	}
}

function checkUsername() {
	var tips = new Array();
	if (this.value === "") {
		tips.push("Username can not be empty!");
	} else {
		if (!/[a-zA-Z]/.test(this.value[0]))
			tips.push("The first character must be a letter!");
		if (!/^[a-zA-Z0-9_]{6,18}$/.test(this.value))
			tips.push("Please input 6-18 letters or numbers or underlines!");
	}
	$("#CUN").html(tips.join(" "));
	if (tips.length === 0) {
		$.post("",
			{"username" : $("#UN").val(), "check" : "username"},
				function(data) {
					if (data === "no-repeat") {
						$("#CUN").html("OK");
						localCheck.CUN = true;
					} else {
						$("#CUN").html($("#UN").val() + " has been used");
					}
				}
		);
	}
}

function checkStudentID() {
	var tips = new Array();
	if (this.value === "") {
		tips.push("Student ID can not be empty!");
	} else {
		if (/0/.test(this.value[0]))
			tips.push("The first character can not be '0'!");
		if (!/^[0-9]{8}$/.test(this.value))
			tips.push("Please input 8 numbers!");
	}
	$("#CSID").html(tips.join(" "));
	if (tips.length === 0) {
		$.post("",
			{"studentID" : $("#SID").val(), "check" : "studentID"},
				function(data) {
					if (data === "no-repeat") {
						$("#CSID").html("OK");
						localCheck.CSID = true;
					} else {
						$("#CSID").html($("#SID").val() + " has been used");
					}
				}
		);
	}
}
function checkTelephone() {
	var tips = new Array();
	if (this.value === "") {
		tips.push("Telephone can not be empty!");
	} else {
		if (/0/.test(this.value[0]))
			tips.push("The first character can not be '0'!");
		if (!/^[0-9]{11}$/.test(this.value))
			tips.push("Please input 11 numbers!");
	}

	$("#CTLP").html(tips.join(" "));
	if (tips.length === 0) {
		$.post("",
			{"telephone" : $("#TLP").val(), "check" : "telephone"},
				function(data) {
					if (data === "no-repeat") {
						$("#CTLP").html("OK");
						localCheck.CTLP = true;
					} else {
						$("#CTLP").html($("#TLP").val() + " has been used");
					}
				}
		);
	}
}

function checkEmailAddress() {
	var tips = new Array();
	if (this.value === "") {
		tips.push("Email address can not be empty!");
	} else {
		if (!/^[a-zA-Z0-9_\-]+@(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$/.test(this.value))
			tips.push("You email address is invalid!");
	}
	$("#CEA").html(tips.join(" "));
	if (tips.length === 0) {
		$.post("",
			{"email" : $("#EA").val(), "check" : "email"},
				function(data) {
					if (data === "no-repeat") {
						$("#CEA").html("OK");
						localCheck.CEA = true;
					} else {
						$("#CEA").html($("#EA").val() + " has been used");
					}
				}
		);
	}
}