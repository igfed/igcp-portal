({
	onInit : function(cmp, evt, hlpr) {
		if(cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Submit: A unique 'id' is required.");
		}
	},
	onClick: function (cmp, evt, hlpr) {

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Submit", {
			"id": cmp.get("v.id"),
			"for": cmp.get("v.for"),
			"buttonType": cmp.get("v.buttonType")
		});
	},
	onEnable: function (cmp, evt, hlpr) {

		if (evt.getParam("payload").id === cmp.get("v.id")) {
			cmp.set("v.disabled", false);
		}
	},
	onDisable: function (cmp, evt, hlpr) {

		if (evt.getParam("payload").id === cmp.get("v.id")) {
			cmp.set("v.disabled", true);
		}
	}
})