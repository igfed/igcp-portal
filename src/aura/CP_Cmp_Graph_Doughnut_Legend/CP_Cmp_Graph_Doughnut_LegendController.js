({
	onSetList: function(cmp, evt, hlpr) {
		console.warn("CP_Cmp_Graph_Doughnut_Legend: onSetList");

		var 
			utils = cmp.find("CP_Utils"),
			payload = evt.getParam("payload");

		if (cmp.get("v.id") === payload.id) {

			var values = payload.values;

			values.forEach(function(item, i) {
				
				utils.createComponent(
					"CP_Cmp_Graph_Doughnut_Legend_Item",
					{
						"label" : item.label,
						"detail" : (item.detail + "%"),
						"colour" : item.colour
					},
					cmp,
					function(success){
						//console.log(success)
					}
				);
			});
		}
	}
})