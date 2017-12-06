({
	onInit: function(cmp, evt, hlpr) {
		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Text: A unique 'id' is required.");
		}

		if (cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Input_Text: Input needs to be associated with a 'form'.")
		}
	},
	onGetValue: function(cmp, evt, hlpr) {

		var
			events = cmp.find('CP_Events'),
			formId = evt.getParam('payload').formId,
			form = cmp.get('v.form');

		if (formId === form) {
			events.fire("CP_Evt_Send_Input_Value", {
				"id": cmp.get("v.id"),
				"type": cmp.get("v.type"),
				"value": cmp.get("v.inputValue")
			});
		}
	},
	onSetValue: function(cmp, evt, hlpr) {

		var payload = evt.getParam("payload");

		if (cmp.get("v.id") === payload.id && payload.formId === cmp.get("v.form")) {
			cmp.set("v.inputValue", payload.value);
		}

	},
	onValid: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === evt.getParam("payload").id) {

			//Used to set the label and border red
			cmp.set("v.hasErrors", false);

			var field = cmp.find("text-input");

			hlpr.showValidStyle(cmp);

			cmp.set("v.limitClass", "igcp-text__success igcp-utils__font-size--x-small");
			cmp.set("v.charClass", "igcp-text__success igcp-utils__font-size--x-small");

			field.set("v.errors", []);
		}
	},
	onError: function(cmp, evt, hlpr) {

		var
			utils = cmp.find("CP_Utils"),
			payload = evt.getParam("payload"),
			userNameInput = cmp.find("text-input"),
			errors = payload.errors,
			errorTypeArr = [],
			isEmpty = false,
			minLength = false,
			isAlphanumeric = false;

		if (cmp.get("v.id") === payload.id) {

			//Used to set the label and border red
			cmp.set("v.hasErrors", true);

			if(cmp.get("v.inputValue") === "") {
				hlpr.showErrorStyle(cmp);
			}

			if (errors.length > 0) {

				errors.forEach(function(err, i) {
					errorTypeArr.push(err.type);
				});

				//isEmpty
				utils.arrayContains(errorTypeArr, "isEmpty", function(hasValue) {
					isEmpty = hasValue;
				});

				//minLength
				utils.arrayContains(errorTypeArr, "minLength", function(hasValue) {
					minLength = hasValue;
				});

				//mhasSpecialChar
				utils.arrayContains(errorTypeArr, "isAlphanumeric", function(hasValue) {
					isAlphanumeric = hasValue;
				});


				if (isEmpty === true) {
					cmp.set("v.limitClass", "igcp-text__error igcp-utils__font-size--x-small");
					cmp.set("v.charClass", "igcp-text__error igcp-utils__font-size--x-small");
				} else {
					if (minLength === true) {
						cmp.set("v.limitClass", "igcp-text__error igcp-utils__font-size--x-small");
					} else {
						cmp.set("v.limitClass", "igcp-text__success igcp-utils__font-size--x-small");
					}

					if (isAlphanumeric === true) {
						cmp.set("v.charClass", "igcp-text__error igcp-utils__font-size--x-small");
					} else {
						cmp.set("v.charClass", "igcp-text__success igcp-utils__font-size--x-small");
					}
				}
				
				if(payload.type === "userName") {
					userNameInput.set("v.errors", [{ "message" : errors[0].msg}]);
					hlpr.showAllInstructionsErrorStyle(cmp);
				} else {
					userNameInput.set("v.errors", []);
				}
			}
		}
	},
	onHandleKey: function(cmp, evt, hlpr) {

		var events = cmp.find("CP_Events");
		if(evt.getParams("arguments").domEvent.key !== "Tab") {
			events.fire("CP_Evt_Key", {
				"id": cmp.get("v.id"),
				"type": cmp.get("v.type"),
				"value": cmp.get("v.inputValue")
			});
		}
	},
	onBlur: function(cmp, evt, hlpr) {
		try {
			var events = cmp.find("CP_Events");
			events.fire("CP_Evt_Input_Blur", {
				"id": cmp.get("v.id"),
				"type": cmp.get("v.type"),
				"value": cmp.get("v.inputValue")
			});

			if (cmp.get("v.hasErrors") === true) {
				//show title and border in red
				hlpr.showErrorStyle(cmp);
				hlpr.showAllInstructionsErrorStyle(cmp);
			} else {
				hlpr.showValidStyle(cmp);
			}
		} catch (err) {
			console.error(err);
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
			cmp.find("text-input").getElement().focus();
		} catch (err) {
			console.error(err);
		}
	}
})