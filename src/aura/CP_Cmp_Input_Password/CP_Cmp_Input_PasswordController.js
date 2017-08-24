({
	onInit: function(cmp, evt, hlpr) {
		if(cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Password: A unique 'id' is required.");
		}

		if(cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Input_Password: Input needs to be associated with a 'form'.")
		}
	},
	onGetValue: function(cmp, evt, hlpr) {

		var
			events = cmp.find('CP_Events'),
			formId = evt.getParam('payload').formId,
			form = cmp.get('v.form');

		if (formId === form) {
			events.fire("CP_Evt_Send_Input_Value", {
				"id": cmp.get("v.id"),
				"type": cmp.get("v.type"),
				"value": cmp.get("v.passcode")
			});
		}
	},
	onValid: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === evt.getParam("payload").id) {
			var field = cmp.find("password-input");
			field.set("v.errors", []);
		}
	},
	onError: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === evt.getParam("payload").id) {

			console.log(evt.getParam('payload').errors);

			var field = cmp.find("password-input");
			field.set("v.errors", [{ message: cmp.get("v.errorText") }]);
		}
	}
})