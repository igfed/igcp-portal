({
	onInit: function(cmp, evt, hlpr) {

		var
			events = cmp.find("CP_Events"),
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils");

		services.getSecurityQuestions(
			cmp,
			function(res) {

				events.fire('CP_Evt_Selector_Send_Options', {
					"id" : cmp.get("v.form"),
					"options" : res.payload
				});

				cmp.set("v.options", re.payload);
			},
			function(error) {
				console.log("SecurityQuestions: ERROR");
				console.log(error);
			}
		);
	},
	onSetValue: function(cmp, evt, hlpr) {
		var
			events = cmp.find("CP_Events"),
			inputId = evt.getParam("payload").id,
			inputValue = evt.getParam("payload").selected;

		if (inputId === "security-1-selector") {
			cmp.set("v.securityQuestion1", inputValue);
		} else if (inputId === "security-2-selector") {
			cmp.set("v.securityQuestion2", inputValue);
		} else if (inputId === "security-3-selector") {
			cmp.set("v.securityQuestion3", inputValue);
		}
	}
})