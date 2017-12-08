({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		return ret;
	},
	rerender: function (cmp, hlpr) {
		//console.warn('Registration was re-rendered');
	},
	afterRender: function (cmp, hlpr) {
		this.superAfterRender();
		try {
			var analytics = setInterval(function () {
				if (window && window._aa) {
					window.digitalData.error = {
						"type": "server",
						"code": "500",
						"description": "Forgot Password Not Completed"
					};
					window._aa.track('page_load', '{"component": {"name": "CP_Forgot_Pass_Not_Completed"}}');
					window._satellite.track('salesforce-error');
					clearInterval(analytics);
				}
			}, 500);
		} catch (err) {
			console.error(err);
		}
	}
})