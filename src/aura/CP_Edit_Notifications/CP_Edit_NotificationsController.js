({
	doneRendering: function(cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";

	},
	onComplete: function(cmp, evt){
		console.log('onComplete', evt.getParam("payload"))
		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId': cmp.get("v.pageId") });
	},
	onInputValueReceived: function(cmp, evt, hlpr){
		console.log('onInputValueReceived', evt.getParam("payload"))
	},
	onInputValueSend: function(cmp, evt, hlpr){
		console.log('onInputValueSend', evt.getParam("payload"))
	},
	onSubmit: function(cmp, evt){
		console.log('onSubmit', evt.getParam("payload"))
		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId': cmp.get("v.pageId") });
	},
	onSubmitForm: function(cmp, evt, hlpr){
		
		var services = cmp.find("CP_Services"),
			formData = null;

		var input = cmp.find("text-input")

		console.log('test', input)

		formData = JSON.stringify({
			username: "portalclient2@igext", 
			newEmail: "test2@example.com",
			currentEmail: "test@example.com",
			mobilePhone: '4168882121'
		});

		services.emailChange(
			formData,
			cmp,
			function (success) {
				console.log('[CP_Edit_Notification] - onSubmit / emailChange():success = ', success)
			},
			function (error) {
				console.log('[CP_Edit_Notification] - onSubmit / emailChange():Error = ', error)
			}
		);
	}
})