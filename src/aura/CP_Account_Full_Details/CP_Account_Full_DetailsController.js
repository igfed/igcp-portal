({
	onDetailsSet: function(cmp, evt, hlpr) {
		console.log("onDetailsSet");

		console.log(evt.getParam("payload"));

		var
			utils = cmp.find("CP_Utils"),
			events = cmp.find("CP_Events"),
			payload = evt.getParam("payload"),
			detailArr = [];

		utils.forEach(JSON.parse(payload.data), function(key, val) {

			detailArr.push({
				"label": key,
				"detail": val
			});
		});

		events.fire("CP_Evt_Set_List", {
			"id": "account-details-list",
			"values": detailArr
		});

	},
	onClose : function(cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");

		events.fire("CP_Evt_Modal_Close", {
			"id": cmp.get("v.id")
		});
	}
})