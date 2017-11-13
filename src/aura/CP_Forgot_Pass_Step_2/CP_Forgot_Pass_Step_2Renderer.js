({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		//console.warn('Registration was rendered.')
		try {
			window._aa.registerHandlers();
		} catch (err) {
			console.error(err);
		}
		return ret;
	},
	rerender: function (cmp, hlpr) {
		//console.warn('Registration was re-rendered');
	}
})