({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		return ret;
	},
	rerender: function (cmp, hlpr) {},
	afterRender: function (component, helper) {
		this.superAfterRender();

		var analytics = setInterval(function () {
			if (window) {
				window._aa.registerHandlers();
				clearInterval(analytics);
			}
		}, 500);
	}
})