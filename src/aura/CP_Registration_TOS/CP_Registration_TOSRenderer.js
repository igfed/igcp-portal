({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		return ret;
	},
	rerender: function (cmp, hlpr) {},
	afterRender: function (cmp, hlpr) {
		this.superAfterRender();

		try {
			var analytics = setInterval(function () {
				if (window && window._aa) {
					
					window._aa.registerHandlers();
					window._aa.track('page_load', '{"component": {"name": "CP_Registration_TOS"}}');
					clearInterval(analytics);
				}
			}, 500);
		} catch(err) {
			console.error(err);
		}
	}
})