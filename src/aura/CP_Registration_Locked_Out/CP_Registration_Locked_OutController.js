({
	gotoLogin: function (cmp, evt, hlpr) {
		cmp.find("CP_Utils").gotoLogin();
	},
	doneRendering: function (cmp, event, helper) {
		if (!cmp.get("v.isDoneRendering")) {
			cmp.set("v.isDoneRendering", true);
			window.digitalData.error = {
				"type": "server",
				"code": "500",
				"description": "Registration Locked Out"
			};
			window._satellite.track('saleforce-error');
		}
	}
})