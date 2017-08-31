({
	render: function(cmp, hlpr) {
		var ret = this.superRender();
		console.log('STEP 3 RENDER.'),
		console.log(document.getElementsByTagName("BODY")[0]);	
		return ret;
	},
	rerender: function(cmp, hlpr) {
		console.log('Step 3 re-render');
	}
})