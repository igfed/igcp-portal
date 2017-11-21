({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		//console.warn('Registration was rendered.')
		try {
			var body = document.querySelector("body");
			body.className = "igcp-utils__display--block";
		} catch (err) {
			console.error(err);
		}
		return ret;
	},
	rerender: function (cmp, hlpr) {
		//console.warn('Registration was re-rendered');
	},
	afterRender: function (component, helper) {
		this.superAfterRender();

		var analytics = setInterval(function () {
			if (window && window._aa) {
				window.digitalData.error = {
					"type": "server",
					"code": "500",
					"description": "Error Description"
				};
				window._satellite.track('salesforce-error');
				clearInterval(analytics);
			}
		}, 500);
	}
})