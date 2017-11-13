({
	gotoLogin: function(cmp, evt, hlpr) {
		cmp.find("CP_Utils").gotoLogin();
	},
	doneRendering: function (cmp, event, helper) {
		if (!cmp.get("v.isDoneRendering")) {
			window.digitalData.error = {
				"type": "server",
				"code": "500",
				"description": "Registration Not Completed"
			};
			window._satellite.track('saleforce-error');
			cmp.set("v.isDoneRendering", true);
		}
	}
})