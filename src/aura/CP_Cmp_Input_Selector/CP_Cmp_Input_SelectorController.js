({
	onInit: function (cmp, evt, hlpr) {
		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Selector: A unique 'id' is required.");
		}

		if (cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Input_Selector: Input needs to be associated with a 'form'.")
		}

		cmp.set("v.options", cmp.get("v.defaultOptions"));
	},
	onSetValue: function (cmp, evt, hlpr) {

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
				function () {
					cmp.set("v.selectedValue", payload.selected);
					cmp.set("v.currentSelectedValue", cmp.get("v.selectedValue"));

					options = cmp.get("v.options");

					//Remove selected from options
					options.forEach(function (opt, i) {
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
	onGetValue: function (cmp, evt, hlpr) {

		var
			events = cmp.find('CP_Events'),
			formId = evt.getParam('payload').formId,
			form = cmp.get('v.form');

		if (formId === form) {
			events.fire("CP_Evt_Send_Input_Value", {
				"id": cmp.get("v.id"),
				"type": cmp.get("v.type"),
				"value": cmp.get("v.currentSelectedValue") === undefined ? "" : cmp.get("v.currentSelectedValue")
			});
		}
	},
	onChange: function (cmp, evt, hlpr) {

		var
			events = cmp.find("CP_Events"),
			options = cmp.get("v.options"),
			newOptions = [];

		cmp.set("v.currentSelectedValue", cmp.get("v.selectedValue"));

		//Remove selected from options
		options.forEach(function (opt, i) {
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
	onChangeReceived: function (cmp, evt, hlpr) {

		var
			payload = evt.getParam("payload"),
			newOptions = [];

		if (payload.id !== cmp.get("v.id")) {

			//if a value has not been selected on 
			//this selector
			//populate with remaining options
			if (cmp.get("v.currentSelectedValue") === "") {
				payload.options.forEach(function (opt, i) {
					newOptions.push(opt);
				});
			} else {
				//if this selector does have a value
				//push that value first to newOptions
				//then push the left over options
				newOptions.push(cmp.get("v.currentSelectedValue"));
				payload.options.forEach(function (opt, i) {
					newOptions.push(opt);
				});
			}

			cmp.set("v.options", newOptions);
		}
	},
	onOptionsReceived: function (cmp, evt, hlpr) {

		if (evt.getParam("payload")) {
			var payload = evt.getParam("payload");

			//hlpr.logger("onOptionsReceived", cmp, payload);

			if (cmp.get("v.form") === payload.id) {
				cmp.set("v.defaultOptions", payload.options);
				cmp.set("v.options", cmp.get("v.defaultOptions"));
			}
		} else {
			console.warn("CP_Cmp_Input_Selector: onOptionsReceived: no payload");
		}
	},
	onBlur: function (cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");
		events.fire("CP_Evt_Input_Blur", {
			"id": cmp.get("v.id"),
			"type": cmp.get("v.type"),
			"value": cmp.get("v.currentSelectedValue")
		});

		if(cmp.get("v.hasErrors") === true) {
			//show title and border in red
			hlpr.setErrorStyle(cmp);
		} else {
			hlpr.setValidStyle(cmp);
		}
	},
	onValid: function (cmp, evt, hlpr) {

		if (cmp.get("v.id") === evt.getParam("payload").id) {

			//Used to set the label red
			cmp.set("v.hasErrors", false);

			var field = cmp.find("selector-input");
			field.set("v.errors", []);
		}

	},
	onError: function (cmp, evt, hlpr) {
		var
			payload = evt.getParam("payload"),
			errors = payload.errors,
			errorArr = [];

		if (cmp.get("v.id") === payload.id) {

			//Used to set the label red
			cmp.set("v.hasErrors", true);

			hlpr.setErrorStyle(cmp);

			if (errors.length > 0) {
				errors.forEach(function (item, i) {
					errorArr.push({ message: item.msg });
				});
			}

			var field = cmp.find("selector-input");
			field.set("v.errors", errorArr);
		}

	},
	onFocus: function (cmp, evt, hlpr) {
		//console.info(cmp.get("v.id") + " has focus.");
		cmp.find('CP_Events').fire(
			"CP_Evt_Input_Focus", {
			"id": cmp.get("v.id")
		});
	},
	onInputFocus: function(cmp, evt, hlpr) {
		//console.info(cmp.get("v.id") + " has focus.");
	},
	onLabelClick: function (cmp, evt, hlpr) {
		try {
			cmp.find("selector-input").getElement().focus();
		} catch (err) {
			console.error(err);
		}
	}
})