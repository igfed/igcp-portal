({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		return ret;
	},
	rerender: function (cmp, hlpr) {},
	afterRender: function (cmp, hlpr) {
		this.superAfterRender();

		try {
			var 
				parent = document.querySelector(".igcp-registration__step-2"),
				inputLength = parent.querySelectorAll("input").length,
				selectLength = parent.querySelectorAll("select").length,
				totalInputLength = (inputLength + selectLength) + 1;

			cmp.set("v.numberOfInputs", totalInputLength);
		} catch (err) {
			console.error("CP_Registration_Step_2: afterRender");
			console.error(err);
		}

		try {
			var analytics = setInterval(function () {
				if (window && window._aa) {
					window._aa.registerHandlers();
					window._aa.track('page_load', '{"component": {"name": "CP_Registration_Step_2"}}');
					clearInterval(analytics);
				}
			}, 500);
		} catch (err) {
			console.error(err);
		}
	}
})