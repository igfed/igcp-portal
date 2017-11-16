({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		return ret;
	},
	rerender: function (cmp, hlpr) {},
	afterRender: function (component, helper) {
		this.superAfterRender();

		var analytics = setInterval(function () {
			if (window) {
				window._aa.registerHandlers();
				clearInterval(analytics);
			}
		}, 500);
	},
	validateInput: function (cmp, payload) {

		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events');


		validator.validate(payload, function (obj) {

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
				if (inputId === "password1") {
					cmp.set("v.password1", inputValue);
				} else if (inputId === "password2") {
					cmp.set("v.password2", inputValue);
				}

				//Fire valid evt	
				events.fire("CP_Evt_Input_Valid", {
					"id": obj.id
				});
			}
		});
	}
})