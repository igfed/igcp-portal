({
	onClose : function(cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");

		events.fire("CP_Evt_Modal_Close", {
			"id": cmp.get("v.id")
		});
	}
})