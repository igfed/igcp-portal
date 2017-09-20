({
	onInit: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === "default") {
			console.error("CP_Registration_TOS: A unique 'id' is required");
		}
	},
	onAgreeChecked : function(cmp, evt, hlpr) {

		var payload = evt.getParam("payload");

		if(payload.id === "read_and_agree_checkbox") {
			cmp.set("v.userAgrees", payload.checked);			
		}
	}
})