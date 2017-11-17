({
	onInit: function (cmp, evt, hlpr) {
		var services = cmp.find("CP_Services");

		services.getUserInfo(
			cmp,
			function (success) {
				cmp.set("v.userInfo", success);

				// Check if user already logged in
				var loggedIn = sessionStorage.getItem('igcp_loggedIn')
				if (!loggedIn) {
					setCookies();
				}
			},
			function (error) {
				console.error(error);
			}
		);

		function setCookies() {
			var date = new Date()
			sessionStorage.setItem('igcp_loggedIn', true); 
			localStorage.setItem('igcp_lastLogin', date);
			var analytics = setInterval(function () {
				if (window) {
					window._aa.track('signin-start', '{"component": {"name": "CP_User_InfoController"}}');
					clearInterval(analytics);
				}
			}, 500);
		}
	},
	doneRendering: function (cmp, evt, hlpr) {
		if (cmp.get("v.renderComplete") === false) {

			var utils = cmp.find("CP_Utils");

			utils.waitForDefined(cmp, "v.userInfo", function (userInfo) {
				utils.forEach(userInfo, function (key, val) {
					hlpr.waitForJquery(function () {
						if (!val) {
							val = "Not Available";
						}
						localStorage.setItem('igcp_' + key, val)
						console.log('key:' + key + 'val:' + val);
					});
				});
			});

			cmp.set("v.renderComplete", true);
		}
	}
})