({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		//console.warn('Registration was rendered.')
		try {
			var body = document.querySelector("body");
			body.className = "igcp-utils__display--block";
		} catch (err) {
			console.error(err);
		}
		return ret;
	},
	rerender: function (cmp, hlpr) {
		//console.warn('Registration was re-rendered');
	}
})