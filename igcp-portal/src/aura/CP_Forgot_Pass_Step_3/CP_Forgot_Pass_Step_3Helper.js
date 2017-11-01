({
	validateInput : function(cmp, payload) {

		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events');


		validator.validate(payload, function(obj) {

			if (obj.isValid === false) {

				cmp.set("v.inputErrors", true);

				console.error("Input Errors: " + obj.id);
				console.error(obj.errors);

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
	}
})