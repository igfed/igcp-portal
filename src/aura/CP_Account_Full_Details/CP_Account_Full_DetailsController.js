({
	onDetailsSet: function(cmp, evt, hlpr) {
		console.log("onDetailsSet");
		console.log(evt.getParam("payload"));

		var
			events = cmp.find("CP_Events"),
			payload = evt.getParam("payload"),
			detailArr = [];

			cmp.find("CP_Utils").forEach(JSON.parse(payload.data), function(key, val) {

			hlpr.checkForExemptions(key, function(){
				hlpr.formatValue(cmp, key, val, function(formattedKey, formattedVal){
					console.info(formattedKey);
					console.info(formattedVal);
				});

				detailArr.push({
					"label": key,
					"detail": val
				});
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