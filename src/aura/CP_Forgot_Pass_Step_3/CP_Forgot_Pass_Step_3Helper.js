({
	validateInput: function (cmp, payload) {

		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events');


		validator.validate(payload, function (obj) {

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
					cmp.set("v.confirmPassword", payload.confirmValue);
				}

				//Fire valid evt	
				events.fire("CP_Evt_Input_Valid", {
					"id": obj.id
				});
			}
		});
	},
	validatePassword: function (cmp, payload) {
		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events');

		validator.validate(payload, function (obj) {

			if (obj.isValid === false) {

				events.fire("CP_Evt_Input_Error", {
					"id": obj.id,
					"errors": obj.errors
				});

				cmp.set("v.inputErrors", true);

			} else {
				events.fire("CP_Evt_Input_Valid", {
					"id": obj.id
				});
				cmp.set("v.inputErrors", false);
			}
		});
	},
	showLoading: function (cmp) {
		cmp.find("CP_Events").fire("CP_Evt_Loading_Show", {
			"id": "forgot-pass-3-spinner"
		});
	},
	hideLoading: function (cmp) {
		cmp.find("CP_Events").fire("CP_Evt_Loading_Hide", {
			"id": "forgot-pass-3-spinner"
		});
	}
})