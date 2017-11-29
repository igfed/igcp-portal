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
				cmp.find("CP_Utils").waitForJQuery(function($) {
					$("#username-input-field .slds-input").focus();
				});
			}
		} catch (err) {
			console.error("CP_Cmp_Input_Username: render: could not set focus on input.");
			console.error(err);
		}
	}
})