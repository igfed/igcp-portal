({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		cmp.set("v.renderComplete", true);
		if (cmp.get("v.currentSelectedValue") !== "") {
			cmp.set("v.selectedValue", cmp.get("v.currentSelectedValue"));
		}
		//console.warn('INPUT SELECTOR RENDERED.');
		return ret;
	},
	rerender: function (cmp, hlpr) {
		if (cmp.get("v.currentSelectedValue") !== "") {
			cmp.set("v.selectedValue", cmp.get("v.currentSelectedValue"));
		}
		//console.warn('INPUT SELECTOR RE-RENDERED.');
	},
	afterRender: function (cmp, hlpr) {
		this.superAfterRender();
		try {
			if (cmp.get("v.hasFocus") === true) {
				cmp.find("selector-input").getElement().focus();
				console.log(document.activeElement);
			}
		} catch (err) {
			console.error("CP_Cmp_Input_Selector: render: could not set focus on input.");
			console.error(err);
		}
	}
})