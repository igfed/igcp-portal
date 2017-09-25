({
	onInit: function(cmp, evt, hlpr) {
		cmp.set("v.options", cmp.get("v.defaultOptions"));
	},
	doneRendering: function(cmp, evt, hlpr) {
		cmp.set("v.renderComplete", true);
	},
	onSetValue: function(cmp, evt, hlpr) {

		var
			payload = evt.getParam("payload"),
			utils = cmp.find("CP_Utils"),
			events = cmp.find("CP_Events"),
			options,
			newOptions = [];

		if (cmp.get("v.id") === payload.id) {

			utils.waitFor(
				cmp,
				"v.renderComplete",
				function() {
					cmp.set("v.selectedValue", payload.selected);
					cmp.set("v.currentSelectedValue", cmp.get("v.selectedValue"));

					options = cmp.get("v.options");

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
				}
			)

		}
	},
	onChange: function(cmp, evt, hlpr) {

		console.log("CP_Cmp_Input_Selector: onChange");

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

			console.log("CP_Cmp_Input_Selector: onChangeReceived");

			//if a value has not been selected on 
			//this selector
			//populate with remaining options
			if (cmp.get("v.currentSelectedValue") === "") {
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
	},
	onBlur: function(cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");
		events.fire("CP_Evt_Input_Blur", {
			"id": cmp.get("v.id"),
			"type": cmp.get("v.type"),
			"value": cmp.get("v.currentSelectedValue")
		});
	},
	onValid: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === evt.getParam("payload").id) {
			var field = cmp.find("selector-input");
			field.set("v.errors", []);
		}

	},
	onError: function(cmp, evt, hlpr) {
		var
			payload = evt.getParam("payload"),
			errors = payload.errors,
			errorArr = [];

		if (cmp.get("v.id") === payload.id) {

			if (errors.length > 0) {
				errors.forEach(function(item, i) {
					errorArr.push({ message: item.msg });
				});
			}

			var field = cmp.find("selector-input");
			field.set("v.errors", errorArr);
		}

	}
})