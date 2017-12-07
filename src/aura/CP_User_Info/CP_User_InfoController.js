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

						try {
							var analytics = setInterval(function () {
								if (window._aa) {
									window._aa.track('signin-start', '{"component": {"name": "CP_User_InfoController"}}');
									clearInterval(analytics);
								}
							}, 500);
						} catch(err) {
							console.error("CP_User_Info: onInit: analytics");
							console.error(err);
						}
					});

				},
				function (error) {
					console.error(error);
				}
			);

		}



	}
})