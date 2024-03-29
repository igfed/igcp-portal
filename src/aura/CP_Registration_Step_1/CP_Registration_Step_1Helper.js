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
				} else if (inputId === "postal-code") {
					cmp.set("v.postalCode", inputValue);
				} else if (inputId === "dob") {
					cmp.set("v.dob", inputValue);
				}

				//Fire valid evt	
				events.fire("CP_Evt_Input_Valid", {
					"id": obj.id
				});
			}
		});
	},
	showLoading: function(cmp) {
		
		cmp.find("CP_Events").fire("CP_Evt_Loading_Show", {
			"id" : "registration-step-1-spinner"
		});
	}, 
	hideLoading: function(cmp) {
		cmp.find("CP_Events").fire("CP_Evt_Loading_Hide", {
			"id" : "registration-step-1-spinner"
		});
	}
})