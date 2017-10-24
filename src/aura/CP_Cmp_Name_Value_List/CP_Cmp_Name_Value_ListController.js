({
	onInit: function(cmp, evt, hlpr) {
		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Name_Value_List: A unique 'id' is required.");
		}
	},
	onSetList: function(cmp, evt, hlpr) {
		var 
			payload = evt.getParam("payload"),
			gridSizing = cmp.get("v.gridSizing");

		if (cmp.get("v.id") === payload.id) {

			if(gridSizing === "12") {
				hlpr.generateContainer(gridSizing, cmp, function(ready) {
					hlpr.generateList(payload.values, cmp, ready.component);
				});

			} else if(gridSizing === "6") {
				//hlpr.generateList(payload.values, cmp);
			} else {
				console.warn("CP_Cmp_Name_Value_List: Grid sizing unrecognized.");
			}
		}

	}
})