({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		try {
			var body = document.querySelector("body");
			body.className = "igcp-utils__display--block";
		} catch (err) {
			console.error(err);
		}
		return ret;
	},
	rerender: function (cmp, hlpr) {},
	afterRender: function (cmp, hlpr) {
		this.superAfterRender();

		try {
			if(document.documentElement.lang === "fr") {
				cmp.set("v.lang", "fr_CA");
			}
		} catch (err) {
			console.error("CP_Overview: renderer: afterRender: get lang");
			console.error(err);
		}

		//Disable back button due ISAM bug
		try {
			history.pushState(null, null, document.URL);
			window.addEventListener('popstate', function () {
				history.pushState(null, null, document.URL);
			});
		} catch (err) {
			console.error("CP_Overview: renderer: afterRender: Could not disable back button.")
		}
	}
})