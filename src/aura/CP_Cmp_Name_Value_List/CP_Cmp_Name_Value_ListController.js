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
				hlpr.generateContainer(gridSizing, cmp, cmp.find("list-container"), function(ready) {
					hlpr.generateList(payload.values, cmp, ready.component);
				});

			} else if(gridSizing === "6") {

				var 
					valsArr = payload.values;
					sliceIndexOn = Math.ceil(valsArr.length / 2),
					leftArr = valsArr.slice(0, sliceIndexOn),
					rightArr = valsArr.slice(sliceIndexOn, valsArr.length);

				hlpr.generateContainer(gridSizing, cmp, cmp.find("list-container-left"), function(ready) {
					hlpr.generateList(leftArr, cmp, ready.component);
				});

				hlpr.generateContainer(gridSizing, cmp, cmp.find("list-container-right"), function(ready) {
					hlpr.generateList(rightArr, cmp, ready.component);
				});
			} else {
				console.warn("CP_Cmp_Name_Value_List: Grid sizing unrecognized.");
			}
		}

	}
})