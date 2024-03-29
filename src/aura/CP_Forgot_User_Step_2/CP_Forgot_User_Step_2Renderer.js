({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		return ret;
	},
	rerender: function (cmp, hlpr) {},
	afterRender: function (cmp, hlpr) {
		this.superAfterRender();

		try {
			
			var parent = document.querySelector(".igcp-forgot-user__step-2");
			cmp.set("v.numberOfInputs", parent.querySelectorAll("input").length);
		} catch (err) {
			console.error("CP_Forgot_User_Step_2: afterRender");
			console.error(err);
		}

		try {
			var analytics = setInterval(function () {
				if (window && window._aa) {
					window._aa.registerHandlers();
					window._aa.track('page_load', '{"component": {"name": "CP_Forgot_User_Step2"}}');
					clearInterval(analytics);
				}
			}, 500);
		} catch (err) {
			console.error(err);
		}
	}
})