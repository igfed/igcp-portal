({
	onInit: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Modal: A unique 'id' is required");
		}
	},
	onClose: function(cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");

		events.fire("CP_Evt_Modal_Close", {
			"id" : cmp.get("v.id")
		});	

		cmp.onHide();
	},
	onShow: function(cmp, evt, hlpr) {
		console.log("CP_Cmp_Modal: onShow");

		var modalClass = cmp.get("v.class") + " igcp-modal--show";
		cmp.set("v.class", modalClass);
	},
	onHide: function(cmp, evt, hlpr) {
		console.log("CP_Cmp_Modal: onHide");
		cmp.set("v.class", "igcp-modal slds-grid slds-wrap slds-p-around--xx-large");
	},
	onClick: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");	

		if(payload.id === "tos_agree_button") {
			cmp.onClose();
		}
	}
})