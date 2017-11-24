({
	onInit: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === "default") {
			console.error("CP_Edit_Documents_TOS: A unique 'id' is required");
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
		cmp.set('v.checked', false)

		if(payload.id === "tos_agree_button-cancel") {
			cmp.close();
		}
	}
})