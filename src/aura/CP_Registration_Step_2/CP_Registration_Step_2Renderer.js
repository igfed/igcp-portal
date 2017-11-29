({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		return ret;
	},
	rerender: function (cmp, hlpr) {},
	afterRender: function (cmp, hlpr) {
		this.superAfterRender();

		try {
			cmp.set("v.numberOfInputs", document.querySelectorAll("input").length);
		} catch (err) {
			console.error("CP_Registration_Step_2: afterRender");
			console.error(err);
		}

		var analytics = setInterval(function () {
			if (window && window._aa) {
				window._aa.registerHandlers();
				clearInterval(analytics);
			}
		}, 500);
	}
})