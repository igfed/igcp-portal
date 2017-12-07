({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
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

		try {
			var body = document.querySelector("body");
			body.className = "igcp-utils__display--block";
		} catch (err) {
			console.error(err);
		}
	}
})