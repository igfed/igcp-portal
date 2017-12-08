({
	onInit: function (cmp, evt, hlpr) {
		var services = cmp.find("CP_Services");
		var utils = cmp.find("CP_Utils");

		// Check if user already logged in
		var loggedIn = sessionStorage.getItem('igcp_loggedIn')
		if (!loggedIn) {
			services.getUserInfo(
				cmp,
				function (success) {
					cmp.set("v.userInfo", success);

					utils.waitForDefined(cmp, "v.userInfo", function (userInfo) {
						utils.forEach(userInfo, function (key, val) {
							hlpr.waitForJquery(function () {
								if (!val) {
									val = "Not Available";
								}
								localStorage.setItem('igcp_' + key, val)
							});
						});
						var date = new Date()
						sessionStorage.setItem('igcp_loggedIn', true);
						localStorage.setItem('igcp_lastLogin', date);
					});

				},
				function (error) {
					console.error(error);
				}
			);

		}



	}
})