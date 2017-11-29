({
	render: function (cmp, hlpr) {
		return this.superRender(); 
	},
	rerender: function (cmp, hlpr) {
		//console.warn('Registration was re-rendered');
	},
	afterRender: function (component, helper) {
		this.superAfterRender();

		try {
			var body = document.querySelector("body");
			body.className = "igcp-utils__display--block";
		} catch (err) {
			console.error(err);
		}
	}
})