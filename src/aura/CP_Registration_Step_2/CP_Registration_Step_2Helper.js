({
	validateInput: function (cmp, payload, errorCallback) {

		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events');

		validator.validate(payload, function (obj) {

			if (obj.isValid === false) {

				cmp.set("v.inputErrors", true);

				events.fire("CP_Evt_Input_Error", {
					"id": obj.id,
					"type" : obj.type !== undefined ? obj.type : "",
					"errors": obj.errors
				});

				if (errorCallback) {
					errorCallback(obj);
				}
				
			} else {

				var
					inputId = payload.id,
					inputValue = payload.value;

				//Capture values
				if (inputId === "username-input") {
					cmp.set("v.username", inputValue);
				} else if (inputId === "password-input") {
					cmp.set("v.password", inputValue);
					cmp.set("v.confirmPassword", payload.confirmValue);
				} else if (inputId === "email-input") {
					cmp.set("v.email", inputValue);
					cmp.set("v.emailConfirm", payload.confirmValue);
				} else if (inputId === "phone-input") {
					cmp.set("v.mobilePhone", inputValue);
				} else if (inputId === "security-1-selector") {
					cmp.set("v.securityQuestion1", inputValue);
				} else if (inputId === "security-1-answer") {
					cmp.set("v.answer1", inputValue);
				} else if (inputId === "security-2-selector") {
					cmp.set("v.securityQuestion2", inputValue);
				} else if (inputId === "security-2-answer") {
					cmp.set("v.answer2", inputValue);
				} else if (inputId === "security-3-selector") {
					cmp.set("v.securityQuestion3", inputValue);
				} else if (inputId === "security-3-answer") {
					cmp.set("v.answer3", inputValue);
				}

				//Fire valid evt	
				events.fire("CP_Evt_Input_Valid", {
					"id": obj.id
				});
			}
		});
	},
	scrollToTop: function (cmp) {
		cmp.find("CP_Utils").waitForJQuery(function($){
			$("html, body").animate({
				scrollTop: 0
			}, 500);
		});
	},
	scrollToError: function (id, cmp) {
		cmp.find("CP_Utils").waitForJQuery(function($){
			$("html, body").animate({
				scrollTop: $(id).offset().top
			}, 500);
		});
	},
	showLoading: function (cmp) {

		cmp.find("CP_Events").fire("CP_Evt_Loading_Show", {
			"id": "registration-step-2-spinner"
		});
	},
	hideLoading: function (cmp) {
		cmp.find("CP_Events").fire("CP_Evt_Loading_Hide", {
			"id": "registration-step-2-spinner"
		});
	}
})