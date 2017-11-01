({
	validateInput : function(cmp, payload) {

		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events');


		validator.validate(payload, function(obj) {

			if (obj.isValid === false) {

				cmp.set("v.inputErrors", true);

				events.fire("CP_Evt_Input_Error", {
					"id": obj.id,
					"errors": obj.errors
				});

			} else {

				var
					inputId = payload.id,
					inputValue = payload.value;

				//Capture values
				if (inputId === "password-input") {
					cmp.set("v.password", inputValue);
					cmp.set("v.confirmPassword", evt.getParam("payload").confirmValue);
				} else if (inputId === "email-input") {
					cmp.set("v.email", inputValue);
				} else if (inputId === "phone-input") {
					cmp.set("v.mobilePhone", inputValue);
				} else if (inputId === "security-1-answer") {
					cmp.set("v.answer1", inputValue);
				} else if (inputId === "security-2-answer") {
					cmp.set("v.answer2", inputValue);
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
	validateUsername: function(cmp, payload){
		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events');

		validator.validate(payload, function(obj) {

			if (obj.isValid === false) {
				events.fire("CP_Evt_Input_Error", {
					"id": obj.id,
					"errors": obj.errors
				});

			} else {
				events.fire("CP_Evt_Input_Valid", {
					"id": obj.id
				});

			}
		});
	},
	validatePassword: function(cmp, payload){
		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events');

		validator.validate(payload, function(obj) {

			if (obj.isValid === false) {
				events.fire("CP_Evt_Input_Error", {
					"id": obj.id,
					"errors": obj.errors
				});

			} else {
				events.fire("CP_Evt_Input_Valid", {
					"id": obj.id
				});

			}
		});
	},
	scrollToTop: function(){
		window.scrollTo(0,0);
	}
})