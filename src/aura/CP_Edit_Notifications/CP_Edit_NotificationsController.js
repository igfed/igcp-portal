({
	doneRendering: function(cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";
	},
	onSubmit: function(cmp, evt, hlpr){
		
		var services = cmp.find("CP_Services"),
			formData = null;

		formData = JSON.stringify({
			"username" : "portalclient2@igext", 
			"newEmail": "test1@example.com",
			"currentEmail": "test1@example.com"
		});

		console.log(formData)

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

		console.log('submit edit notifications')
	}
})