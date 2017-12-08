({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		return ret;
	},
	rerender: function (cmp, hlpr) {},
	afterRender: function (cmp, helper) {
		this.superAfterRender();

		try {
			var parent = document.querySelector(".igcp-forgot-pass__step-3");
			cmp.set("v.numberOfInputs", parent.querySelectorAll("input").length);
		} catch (err) {
			console.error("CP_Forgot_Pass_Step_3: afterRender");
			console.error(err);
		}

		try {
			var analytics = setInterval(function () {
				if (window && window._aa) {
					window._aa.registerHandlers();
					window._aa.track('page_load', '{"component": {"name": "CP_Forgot_Pass_Step_3"}}');
					clearInterval(analytics);
				}
			}, 500);
		} catch (err) {
			console.error(err);
		}
	}
})