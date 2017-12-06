({
	validatePassword: function (cmp, payload) {
		try {

			var
				validator = cmp.find('CP_Validation'),
				events = cmp.find('CP_Events');

			validator.validate(payload, function (obj) {

				if (obj.isValid === false) {

					events.fire("CP_Evt_Input_Error", {
						"id": obj.id,
						"type": obj.type !== undefined ? obj.type : "",
						"errors": obj.errors
					});

					cmp.set("v.inputErrors", true);

				} else {

					//Capture values
					if (payload.id === "password-input") {
						cmp.set("v.password", payload.value);
						cmp.set("v.confirmPassword", payload.confirmValue);
					}

					events.fire("CP_Evt_Input_Valid", {
						"id": obj.id
					});
					cmp.set("v.inputErrors", false);
				}
			});
		} catch (err) {
			console.error(err);
		}
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