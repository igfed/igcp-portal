({
	gotoLogin: function(cmp, evt, hlpr) {
		cmp.find("CP_Utils").gotoLogin();
	},
	doneRendering: function(cmp, evt, hlpr) {
        if (cmp.get("v.renderComplete") === false) {
			cmp.set("v.renderComplete", true);

			cmp.find("CP_Events").fire(
				"CP_Evt_Analytics_Error", {
					"type": "server",
					"code": "500",
					"description": "Registration Locked Out"
				}
			);
		}
	}
})