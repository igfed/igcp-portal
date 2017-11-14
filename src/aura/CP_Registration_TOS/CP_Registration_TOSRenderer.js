({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		try {
			window._aa.registerHandlers();
		} catch (err) {
			console.error(err);
		}
		return ret;
	},
	rerender: function (cmp, hlpr) {}
})