({
	onInit: function (cmp, evt, hlpr) {
		
		var radios = cmp.get("v.radios");
		var data = { 
			username: 'portalclient2@igext', 
			currentEmail: 'test@example.com',
			newEmail: '',
			mobilePhone: '416-555-1234',
			mobileNotifications: false,
			newsOffers: false,
			language: 'english'
		}
		// set form data
		cmp.set("v.formData", data)

		// set radios -- logic won't work in radio component - must be in parent
		if(data.language){
			radios.value = data.language;
			radios.radios.forEach(function (radio) {
				if (radio.label.toLowerCase() === radios.value.toLowerCase()) {
					radio.checked = true;
				} else {
					radio.checked = false;
				}
			});
		}

	},
	onInputValueSend: function (cmp, evt, hlpr) {
		console.log('onInputValueSend', evt.getParam("payload"))
	},
	onSubmit: function (cmp, evt, hlpr) {
		console.log('onSubmit', evt.getParam("payload"))
		/*var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", {
			'formId': cmp.get("v.pageId")
		});*/

		var formData = cmp.get('v.formData');
		formData.language = cmp.get('v.radios').value;

		$A.enqueueAction( cmp.get('c.onSubmitForm') );
		
	},
	onSubmitForm: function (cmp, evt, hlpr) {

		var services = cmp.find("CP_Services"),
			// emailInput = cmp.find("email-input").get("v.inputValue"), //ex. get child component value
			formData = JSON.stringify(cmp.get("v.formData"));

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