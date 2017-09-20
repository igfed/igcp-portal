({
	onInit: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Modal: A unique 'id' is required");
		}
	},
	onClose: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");

		if (payload) {
			console.log("MODAL: onClose");
			console.log(payload);
			
			if (payload.id === cmp.get("v.id")) {
				cmp.set("v.class", "igcp-modal slds-grid slds-wrap slds-p-around--xx-large");
			}
		} else {
			console.warn("Modal: onClose: No payload");
		}
	},
	onOpen: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");

		console.log("MODAL: onOpen: " + payload.id);

		if (payload.id === cmp.get("v.id")) {

			var modalClass = cmp.get("v.class") + " igcp-modal--show";
			cmp.set("v.class", modalClass);
		}
	},
	onClick: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");

		if (payload.id === "tos_agree_button") {

			cmp.onClose();
		}
	}
})