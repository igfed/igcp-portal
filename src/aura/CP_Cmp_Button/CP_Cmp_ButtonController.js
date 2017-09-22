({
	onInit : function(cmp, evt, hlpr) {
		if(cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Button: A unique 'id' is required.");
		}

		if(cmp.get("v.label") === "default") {
			console.error("CP_Cmp_Button: This button requires an unique 'label'.")
		}
	},
	onClick : function(cmp, evt, hlpr) {

		var events = cmp.find('CP_Events');

		events.fire("CP_Evt_Click", 
			{
				"id" : cmp.get("v.id"),
				"buttonType" : cmp.get("v.buttonType")
			});
	}
})