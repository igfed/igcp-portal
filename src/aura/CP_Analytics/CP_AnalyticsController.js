({
	scriptsLoaded: function (cmp, evt) {
		jQuery(document).ready(function ($) {
			console.log('CP_Analytics: loaded');
		});
	},
	onInit: function (cmp, evt, hlpr) {
		var services = cmp.find("CP_Services");

		services.getUserInfo(
			cmp,
			function (success) {
				cmp.set("v.userInfo", success);
				console.log("CP_Analytics: USER INFO");
				console.log(cmp.get("V.userInfo"));
			},
			function (error) {
				console.error(error);
			}
		);
	},
	onError: function (cmp, evt, hlpr) {

		var payload = evt.getParam("payload");

		try {
			window.digitalData.error = payload;
			window._satellite('server-error');
		} catch(err) {
			console.error(err);
		}
	}
})