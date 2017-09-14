({
	render: function(cmp, hlpr) {
		var ret = this.superRender();
		console.warn('Registration was rendered.')	
		return ret;
	},
	rerender: function(cmp, hlpr) {
		console.warn('Registration was re-rendered');
	}
})