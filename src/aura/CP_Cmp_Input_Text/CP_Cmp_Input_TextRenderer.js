({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		return ret;
	},
	rerender: function (cmp, hlpr) {},
	afterRender: function (cmp, hlpr) {
		this.superAfterRender();
		try {
			if (cmp.get("v.hasFocus") === true) {
				cmp.find("text-input").getElement().focus();
				console.log(document.activeElement);
			}
		} catch (err) {
			console.error("CP_Cmp_Input_Text: render: could not set focus on input.");
			console.error(err);
		}
	}
})