({
	onAgreeChecked : function(cmp, evt, hlpr) {

		var payload = evt.getParam("payload");

		if(payload.id === "read_and_agree_checkbox") {
			cmp.set("v.userAgrees", payload.checked);			
		}
	}
})