({
	render: function(cmp, hlpr) {
		var ret = this.superRender();
		console.log('Registration was rendered.')	
		return ret;
	},
	rerender: function(cmp, hlpr) {
		console.log('Registration was re-rendered');
	}
})