({
	onInit: function(cmp, evt, hlpr) {
		cmp.set("v.options", cmp.get("v.defaultOptions"));
	},
	onSetValue: function(cmp, evt, hlpr) {

		var payload = evt.getParam("payload");

		if (cmp.get("v.id") === payload.id) {

			console.log("Selector: onSetValue");
			console.log(evt.getParam("payload"));

			console.log("input id:  " + cmp.get("v.id"))

			var
				utils = cmp.find("CP_Utils"),
				events = cmp.find("CP_Events"),
				options = cmp.get("v.defaultOptions"),
				newOptions = [];

			//Remove selected from options
			options.forEach(function(opt, i) {
				//if the currenSelectedValue is not an option
				//and if array does not already contain value
				if (cmp.get("v.currentSelectedValue") !== opt) {
					newOptions.push(opt);
				}
			});

			cmp.set("v.selectedValue", payload.selected);
			cmp.set("v.currentSelectedValue", cmp.get("v.selectedValue"));

			cmp.set("v.options", newOptions);

			
		}
	},
	onChange: function(cmp, evt, hlpr) {

		var
			utils = cmp.find("CP_Utils"),
			events = cmp.find("CP_Events"),
			options = cmp.get("v.options"),
			newOptions = [];

		cmp.set("v.currentSelectedValue", cmp.get("v.selectedValue"));

		//Remove selected from options
		options.forEach(function(opt, i) {
			//if the currenSelectedValue is not an option
			//and if array does not already contain value
			if (cmp.get("v.currentSelectedValue") !== opt) {
				newOptions.push(opt);
			}
		});

		events.fire("CP_Evt_Input_Selector_Change", {
			"id": cmp.get("v.id"),
			"selected": cmp.get("v.currentSelectedValue"),
			"options": newOptions
		});
	},
	onChangeReceived: function(cmp, evt, hlpr) {

		var
			utils = cmp.find("CP_Utils"),
			payload = evt.getParam("payload"),
			newOptions = [];

		if (payload.id !== cmp.get("v.id")) {

			//if a value has not been selected on 
			//this selector
			//populate with remaining options
			if (cmp.get("v.currentSelectedValue") === "none") {
				payload.options.forEach(function(opt, i) {
					newOptions.push(opt);
				});
			} else {
				//if this selector does have a value
				//push that value first to newOptions
				//then push the left over options
				newOptions.push(cmp.get("v.currentSelectedValue"));
				payload.options.forEach(function(opt, i) {
					newOptions.push(opt);
				});
			}

			cmp.set("v.options", newOptions);
		}
	},
	onOptionsReceived: function(cmp, evt, hlpr) {

		if (evt.getParam("payload")) {
			var payload = evt.getParam("payload");

			if (cmp.get("v.form") === payload.id) {
				cmp.set("v.defaultOptions", payload.options);
				cmp.set("v.options", cmp.get("v.defaultOptions"));
			}
		} else {
			console.warn("CP_Cmp_Input_Selector: onOptionsReceived: no payload");
		}
	}
})