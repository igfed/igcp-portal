({
	onInit: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === "default") {
			console.error("CP_Edit_Documents_TOS: A unique 'id' is required");
		}
	},
	onAgreeChecked : function(cmp, evt, hlpr) {

		var payload = evt.getParam("payload");

		console.log(payload);

		if(payload.id === "read_and_agree_checkbox") {
			cmp.set("v.userAgrees", payload.checked);	
			console.log(cmp.get("v.userAgrees"));		
		}
	},
	onClose: function(cmp, evt, hlpr){

		var events = cmp.find("CP_Events");

		events.fire("CP_Evt_Modal_Close", {
			"id" : cmp.get("v.id")
		});

	},
	onCancel: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");

		if(payload.id === "tos_agree_button-cancel") {
			cmp.close();
		}
	}
})