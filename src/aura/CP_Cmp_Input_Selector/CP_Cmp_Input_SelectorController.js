({
	onInit: function(cmp, evt, hlpr) {
		cmp.set("v.options", cmp.get("v.defaultOptions"));
	},
	onChange: function(cmp, evt, hlpr) {
		var
			events = cmp.find("CP_Events"),
			selected = cmp.get("v.selectedValue");

		cmp.set("v.currentSelectedValue", selected);

		events.fire("CP_Evt_Input_Selector_Change", {
			"id": cmp.get("v.id"),
			"selected": selected
		});
	},
	onChangeReceived: function(cmp, evt, hlpr) {
		var
			utils = cmp.find("CP_Utils"),
			selectedArr = cmp.get("v.selectedArr"),
			payload = evt.getParam("payload"),
			selected = payload.selected,
			defaultOptions = cmp.get("v.defaultOptions"),
			newOptions = [];


		//If this isn't the same selector that iniated the event
		//remove option from selector		
		if (payload.id !== cmp.get("v.id")) {
			
			//check if selected is already in selectedArr, and if not push it
			utils.arrayContains(selectedArr, selected, function(hasValue) {
				if (hasValue === false) {
					selectedArr.push(selected);
				}
			});
			cmp.set("v.selectedArr", selectedArr);

			//Loop through all options in defaultOptions array and 
			//create a new options array with selected omitted
			defaultOptions.forEach(function(item, i) {

				utils.arrayContains(selectedArr, item, function(hasValue) {
					if (hasValue === false) {
						newOptions.push(item);
					}
				});

			});

			cmp.set("v.options", newOptions);
		}

	}
})