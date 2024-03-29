({
	onInit: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Modal: A unique 'id' is required");
		}
	},
	onClose: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");

		if (payload) {
			if (payload.id === cmp.get("v.id")) {
				hlpr.releaseBody();
				hlpr.removeFocus();
				cmp.set("v.class", "igcp-modal slds-grid slds-wrap slds-p-around--xx-large");
			}
		} else {
			console.warn("Modal: onClose: No payload");
		}
	},
	onOpen: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");

		if (payload.id === cmp.get("v.id")) {
			hlpr.lockBody();
			hlpr.drawFocus();
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