({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		try {
			var body = document.querySelector("body");
			body.className = "igcp-utils__display--block";
		} catch (err) {
			console.error(err);
		}

		// try {
		// 	window._aa.registerHandlers();
		// } catch(err) {
		// 	console.error(err);
		// }
		return ret;
	},
	rerender: function (cmp, hlpr) {}
})