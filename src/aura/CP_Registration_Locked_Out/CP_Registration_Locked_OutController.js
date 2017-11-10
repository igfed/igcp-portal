({
	gotoLogin: function(cmp, evt, hlpr) {
		cmp.find("CP_Utils").gotoLogin();
	},
	doneRendering: function(cmp, evt, hlpr) {
        window.digitalData.error = {
			"type": "server",
			"code": "500",
			"description": "Registration Logged Out"
		};
		window._satellite('server-error');
	}
})