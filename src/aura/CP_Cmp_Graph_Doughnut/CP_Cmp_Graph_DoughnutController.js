({
	doneRendering: function (cmp, evt, hlpr) {
		cmp.set("v.renderComplete", true);
	},
	onSetGraph: function (cmp, evt, hlpr) {

		var payload = evt.getParam("payload");
		if (payload.id === cmp.get("v.id")) {
			var
				events = cmp.find("CP_Events"),
				data = payload.data,
				graphArr = [];

			//We need to convert the total amounts to percentages	
			data.forEach(function (item, i) {
				var itemObj = {};
				itemObj["label"] = item.label;
				itemObj["detail"] = item.detail;
				itemObj["colour"] =  hlpr.getColorArray()[i];
				graphArr.push(itemObj);
			});

			hlpr.generateGraph(graphArr, cmp, hlpr);

			//Fire evt to set graph legend
			events.fire("CP_Evt_Set_List", {
				"id": cmp.get("v.id"),
				"values": graphArr
			});

			events.fire("CP_Evt_Loading_Hide", { "id" : "graph-spinner" });
		}
	}
})