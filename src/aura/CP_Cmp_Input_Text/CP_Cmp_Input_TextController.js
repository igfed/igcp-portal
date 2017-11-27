({
	onInit: function (cmp, evt, hlpr) {
		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Text: A unique 'id' is required.");
		}

		if (cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Input_Text: Input needs to be associated with a 'form'.")
		}
	},
	onGetValue: function (cmp, evt, hlpr) {

		var
			formId = evt.getParam('payload').formId,
			form = cmp.get('v.form');

		if (formId === form) {

			cmp.find('CP_Events').fire("CP_Evt_Send_Input_Value", {
				"id": cmp.get("v.id"),
				"type": cmp.get("v.type"),
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

			var field = cmp.find("text-input");
			var confirmField = cmp.find("text-confirm-input");

			//Used to set the label
			cmp.set("v.hasErrors", false);

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
			field;

		if (cmp.get("v.id") === payload.id) {

			//Used to set the label
			cmp.set("v.hasErrors", true);

			//show error icon
			cmp.set("v.errorIconClass", "igcp-utils__display--block slds-input__icon slds-input__icon--error");

			if (errors.length > 0) {
				errors.forEach(function (item, i) {
					errorArr.push({
						message: item.msg
					});
				});

				field = cmp.find("text-input");
				field.set("v.errors", errorArr);
			}
		}
	},
	onHandleKey: function (cmp, evt, hlpr) {
		//Needed to override default behaviour
		evt.preventDefault();
	},
	onBlur: function (cmp, evt, hlpr) {
		cmp.find("CP_Events").fire("CP_Evt_Input_Blur", {
			"id": cmp.get("v.id"),
			"type": cmp.get("v.type"),
			"value": cmp.get("v.inputValue") === undefined ? "" : cmp.get("v.inputValue")
		});

		if(cmp.get("v.hasErrors") === true) {
			//show title and border in red
			cmp.set("v.labelClass", "igcp-input__label--error slds-form-element__label input-label");
		} else {
			cmp.set("v.labelClass", "slds-form-element__label input-label");
		}
	},
	onConfirmationBlur: function (cmp, evt, hlpr) {
		cmp.find("CP_Events").fire("CP_Evt_Input_Blur", {
			"id": cmp.get("v.id"),
			"type": "email-confirm",
			"value": cmp.get("v.inputValue"),
			"confirmValue": cmp.get("v.inputValueConfirm")
		});

		if(cmp.get("v.hasErrors") === true) {
			//show title and border in red
			cmp.set("v.confirmationLabelClass", "igcp-input__label--error slds-form-element__label input-label");
		} else {
			cmp.set("v.confirmationLabelClass", "slds-form-element__label input-label");
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