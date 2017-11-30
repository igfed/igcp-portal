({
	onInit: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === "default") {
			console.error("CP_Registration_TOS: A unique 'id' is required");
		}
	},
	onAgreeChecked : function(cmp, evt, hlpr) {

		var payload = evt.getParam("payload");

		if(payload.id === "read_and_agree_checkbox") {
			console.log(payload);
			cmp.set("v.userAgrees", payload.checked);			
		}
	},
	onClose: function(cmp, evt, hlpr){

		var events = cmp.find("CP_Events");
		events.fire("CP_Evt_Modal_Close", {
			"id" : cmp.get("v.id")
		});

		try {
			var modal = document.querySelector('.igcp-modal');
			modal.scrollTop = 0;
		} catch(err) {
			console.error(err);
		}

	},
	onCancel: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");

		if(payload.id === "tos_agree_button-cancel") {
			cmp.close();
		}
	}
})