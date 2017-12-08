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
	},
	doneRendering: function(cmp, evt, hlpr) {
		window._aa.registerHandlers();
		if(cmp.get("v.renderComplete") === false) {
			cmp.set("v.renderComplete", true);
		}
	}
})