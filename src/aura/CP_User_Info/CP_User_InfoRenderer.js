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
				if (window._satellite) {
					window._satellite.track('signin-success');
					clearInterval(analytics);
				}
			}, 500);
		} catch (err) {
			console.error("CP_User_Info: onInit: analytics");
			console.error(err);
		}


	}
})