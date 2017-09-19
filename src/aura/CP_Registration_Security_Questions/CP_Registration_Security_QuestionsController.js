({
	onInit: function(cmp, evt, hlpr) {

		var
			events = cmp.find("CP_Events"),
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils");

		services.getSecurityQuestions(
			cmp,
			function(res) {

				console.log(res);

				events.fire('CP_Evt_Selector_Send_Options', {
					"id" : cmp.get("v.form"),
					"options" : res.payload
				});
			},
			function(error) {
				console.log("SecurityQuestions: ERROR");
				console.log(error);
			}
		);
	}
})