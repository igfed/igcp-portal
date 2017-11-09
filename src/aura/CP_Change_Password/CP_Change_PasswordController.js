({
	doneRendering: function(cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";
	},
	onSubmit: function(cmp, evt, hlpr) {

		var events = cmp.find('CP_Events')

		//Reset input errors	
		cmp.set("v.inputErrors", false);
		cmp.set("v.inputsReceived", 0);

		events.fire("CP_Evt_Get_Input_Value", { 'formId': cmp.get("v.pageId") });

	},
	onInputValueReceived: function(cmp, evt, hlpr) {

		var inputs = cmp.get("v.inputsReceived");

		hlpr.validateInput(cmp, evt.getParam("payload"));

		cmp.set("v.inputsReceived", (inputs += 1));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === 1 && cmp.get("v.inputErrors") === false) {

			cmp.set("v.payload", {
				"password": cmp.get("v.password"),
				"confirmPassword": cmp.get("v.confirmPassword")
			});

			cmp.onSubmitForm();
		}
	},
	onInputBlur: function(cmp, evt, hlpr) {
		hlpr.validateInput(cmp, evt.getParam("payload"));
	},
	submitForm: function(cmp, evt, hlpr) {

		var
			services = cmp.find("CP_Services"),
			formData = null;

			formData = JSON.stringify({
				"username" : "portalclient2@igext", 
				"currentPassword": "qwerty",
				"newPassword": "testPassword",
				"verifyPassword": "testPassword"
			});

			services.updatePassword(
				formData,
				cmp,
				function (success) {
					console.log('[CP_Change_Password] - onSubmit / Update():success = ', success)
				},
				function (error) {
					console.log('[CP_Change_Password] - onSubmit / Update():Error = ', error)
				}
			);
	},
	onNextStep: function(cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	},
	onKey: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");
		console.log(payload);
		if (payload.id === "password-input") {
			hlpr.validatePassword(cmp, payload);
		}
	}
})