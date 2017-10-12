({
	onSetList: function(cmp, evt, hlpr) {
		console.warn("CP_Cmp_Graph_Doughnut_Legend: onSetList");


		var 
			utils = cmp.find("CP_Utils"),
			payload = evt.getParam("payload");

		console.log(payload);
		console.log(cmp.get("v.id"))

		if (cmp.get("v.id") === payload.id) {
			console.log("MATCH");
			console.log(payload.values);

			var values = payload.values;

			values.forEach(function(item, i) {
				console.log(item);
				utils.createComponent(
					"CP_Cmp_Graph_Doughnut_Legend_Item",
					{
						"label" : item.label,
						"detail" : item.detail,
						"colour" : item.colour
					},
					cmp,
					function(success){
						console.log(success)
					}
				);
			});
		}
	}
})