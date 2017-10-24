({
	onInit: function(cmp, evt, hlpr) {
		var services = cmp.find("CP_Services");

		services.getUserInfo(
			cmp,
			function(success) {
				cmp.set("v.userInfo", success);
			},
			function(error) {
				console.error(error);
			}
		);
	},
	doneRendering: function(cmp, evt, hlpr) {
		if (cmp.get("v.renderComplete") === false) {

			var utils = cmp.find("CP_Utils");

			utils.waitForDefined(cmp, "v.userInfo", function(userInfo) {
				utils.forEach(userInfo, function(key, val) {
					if(key !== "clientBPID") {
						$('head').append("<meta name=" + 'igcp:' + key + " content=" + val + ">");
					} else {
						console.log("BPID");
						console.log(val);
					}
				});
			});

			cmp.set("v.renderComplete", true);
		}
	}
})