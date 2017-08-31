({
	onInit: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Modal: A unique 'id' is required");
		}
	},
	onShow: function(cmp, evt, hlpr) {
		console.log("CP_Cmp_Modal: onShow");

		var modalClass = cmp.get("v.class") + " igcp-modal--show";
		cmp.set("v.class", modalClass);
	},
	onHide: function(cmp, evt, hlpr) {
		console.log("CP_Cmp_Modal: onHide");
		cmp.set("v.class", "igcp-modal slds-grid slds-wrap slds-p-around--xx-large")
	}
})