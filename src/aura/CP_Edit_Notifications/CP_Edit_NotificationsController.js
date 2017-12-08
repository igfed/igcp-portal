({
	doneRendering: function(cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";

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
			// emailInput = cmp.find("email-input").get("v.inputValue"), //ex. get child component value
			formData = JSON.stringify( cmp.get("v.formData") );

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