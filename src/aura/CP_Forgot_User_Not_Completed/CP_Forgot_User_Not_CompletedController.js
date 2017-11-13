({
	gotoLogin: function (cmp, evt, hlpr) {
		var utils = cmp.find("CP_Utils");
		utils.gotoLogin();
	},
	doneRendering: function (cmp, event, helper) {
		if (!cmp.get("v.isDoneRendering")) {
			cmp.set("v.isDoneRendering", true);
			window.digitalData.error = {
				"type": "server",
				"code": "500",
				"description": "Forgot Username Not Completed"
			};
			window._satellite.track('saleforce-error');
		}
	}
})