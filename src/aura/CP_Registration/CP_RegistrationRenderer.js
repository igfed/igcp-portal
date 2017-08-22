({
	render: function(cmp, hlpr) {
		var ret = this.superRender();
		console.log('RENDER!')	
		return ret;
	},
	rerender: function(cmp, hlpr) {
		console.log('RE-RENDER!');
	}
})