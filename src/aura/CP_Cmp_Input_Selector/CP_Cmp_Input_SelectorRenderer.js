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
	}
})