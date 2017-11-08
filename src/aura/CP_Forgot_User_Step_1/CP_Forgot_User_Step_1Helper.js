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
				if (inputId === "client-number") {
					cmp.set("v.clientNum", inputValue);
				} else if (inputId === "email-input") {
					cmp.set("v.email", inputValue);
				} 

				//Fire valid evt	
				events.fire("CP_Evt_Input_Valid", {
					"id": obj.id
				});
			}
		});
	},
	disableSubmit: function(cmp) {
		console.log("Disable Submit");
		
		cmp.find("CP_Events").fire("CP_Evt_Button_Disable", {
			"id" : "form_submit"
		});
	},
	enableSubmit: function(cmp) {
		console.log("Enable Submit");
		
		cmp.find("CP_Events").fire("CP_Evt_Button_Enable", {
			"id" : "form_submit"
		});
	}
})