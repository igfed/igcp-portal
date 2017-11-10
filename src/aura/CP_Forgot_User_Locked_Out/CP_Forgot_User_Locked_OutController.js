({
	gotoLogin: function (cmp, evt, hlpr) {
		var utils = cmp.find("CP_Utils");
		utils.gotoLogin();
	},
	doneRendering: function (cmp, evt, hlpr) {

		cmp.find("CP_Events").fire(
			"CP_Evt_Analytics_Error", 
			{
				"type": "server",
				"code": "500",
				"description": "Forgot Username Locked Out"
			}
		);
	}
})