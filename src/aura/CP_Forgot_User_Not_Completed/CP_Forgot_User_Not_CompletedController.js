({
	gotoLogin: function(cmp, evt, hlpr) {
		var utils = cmp.find("CP_Utils");
		utils.gotoLogin();
	},
	doneRendering: function(cmp, evt, hlpr) {
        window.digitalData.error = {
			"type": "server",
			"code": "500",
			"description": "Forgot Username Not Completed"
		};
		window._satellite('server-error');
	}
})