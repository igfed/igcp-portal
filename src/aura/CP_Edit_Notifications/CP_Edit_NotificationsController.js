({
	doneRendering: function(cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId': cmp.get("v.pageId") });


	},
	onInputValueReceived: function(cmp, evt, hlpr){
		console.log('onInputValue', evt.getParam("payload"))
	},
	onSubmit: function(cmp, evt, hlpr){
		
		var services = cmp.find("CP_Services"),
			formData = null;

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