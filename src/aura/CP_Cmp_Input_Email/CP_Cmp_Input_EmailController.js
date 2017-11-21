({
	onInit: function (cmp, evt, hlpr) {
		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Text: A unique 'id' is required.");
		}

		if (cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Input_Text: Input needs to be associated with a 'form'.")
		}
	},
	doneRendering: function (cmp, evt, hlpr) {
		if (cmp.get("v.renderComplete") === false) {
			if (cmp.get("v.hasFocus") === true) {
				cmp.find("text-input").getElement().focus();
			}
			cmp.set("v.renderComplete", true);
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
				"type": cmp.get("v.type") === "email-confirm" ? "email-confirm" : cmp.get("v.type"),
				"value": cmp.get("v.inputValue") === undefined ? "" : cmp.get("v.inputValue"),
				"confirmValue": cmp.get("v.inputValueConfirm")
			});
		}
	},
	onSetValue: function (cmp, evt, hlpr) {

		var payload = evt.getParam("payload");

		if (cmp.get("v.id") === payload.id && payload.formId === cmp.get("v.form")) {
			cmp.set("v.inputValue", payload.value);
		}

	},
	onValid: function (cmp, evt, hlpr) {

		if (cmp.get("v.id") === evt.getParam("payload").id) {

			var
				field = cmp.find("text-input"),
				confirmField = cmp.find("text-confirm-input");

			field.set("v.errors", []);
			confirmField.set("v.errors", []);

			//hide error icon
			cmp.set("v.errorIconClass", "igcp-utils__display--none slds-input__icon slds-input__icon--error");

		}
	},
	onError: function (cmp, evt, hlpr) {

		var
			payload = evt.getParam("payload"),
			errors = payload.errors,
			errorArr = [],
			confirmErrorArr = [],
			field;

		if (cmp.get("v.id") === payload.id) {

			var
				field = cmp.find("text-input"),
				confirmField = cmp.find("text-confirm-input");

			//show error icon
			cmp.set("v.errorIconClass", "igcp-utils__display--block slds-input__icon slds-input__icon--error");

			if (errors.length > 0) {
				errors.forEach(function (item, i) {
					if (item.type === "emailsMatch") {
						confirmErrorArr.push({ message: item.msg });
					} else {
						errorArr.push({ message: item.msg });
					}
				});

				field.set("v.errors", errorArr);
				confirmField.set("v.errors", confirmErrorArr);
			}
		}
	},
	onHandleKey: function (cmp, evt, hlpr) {
		//Needed to override default behaviour
		evt.preventDefault();
	},
	onBlur: function (cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");
		events.fire("CP_Evt_Input_Blur", {
			"id": cmp.get("v.id"),
			"type": cmp.get("v.type"),
			"value": cmp.get("v.inputValue") === undefined ? "" : cmp.get("v.inputValue")
		});
	},
	onConfirmationBlur: function(cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");
		events.fire("CP_Evt_Input_Blur", {
			"id": cmp.get("v.id"),
			"type": cmp.get("v.type"),
			"value": cmp.get("v.inputValue") === undefined ? "" : cmp.get("v.inputValue"),
			"confirmValue": cmp.get("v.inputValueConfirm")
		});
	},
	onFocus: function (cmp, evt, hlpr) {
		//console.info(cmp.get("v.id") + " has focus.");
		cmp.find('CP_Events').fire(
			"CP_Evt_Input_Focus", {
				"id": cmp.get("v.id")
			});
	},
	onConfirmationFocus: function (cmp, evt, hlpr) {
		// console.info(cmp.get("v.id") + " confirmation field has focus.");
		cmp.find('CP_Events').fire(
			"CP_Evt_Input_Focus", {
				"id": cmp.get("v.id"),
				"type": "confirmation"
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
	},
	onConfirmationLabelClick: function (cmp, evt, hlpr) {
		try {
			cmp.find("text-confirm-input").getElement().focus();
		} catch (err) {
			console.error(err);
		}
	}
})