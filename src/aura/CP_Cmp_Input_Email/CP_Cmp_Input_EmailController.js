({
	onInit: function(cmp, evt, hlpr) {
		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Text: A unique 'id' is required.");
		}

		if (cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Input_Text: Input needs to be associated with a 'form'.")
		}
	},
	doneRendering: function(cmp, evt, hlpr) {
		if (cmp.get("v.renderComplete") === false) {
			if (cmp.get("v.hasFocus") === true) {
				cmp.find("text-input").getElement().focus();
			}
			cmp.set("v.renderComplete", true);
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
				"type": cmp.get("v.type") === "email-confirm" ? "email-confirm" : cmp.get("v.type"),
				"value": cmp.get("v.inputValue") === undefined ? "" : cmp.get("v.inputValue"),
				"confirmValue": cmp.get("v.inputValueConfirm")
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

			var 
				field = cmp.find("text-input"),
				confirmField = cmp.find("text-confirm-input");

			field.set("v.errors", []);
			confirmField.set("v.errors", []);

			//hide error icon
			cmp.set("v.errorIconClass", "igcp-utils__display--none slds-input__icon slds-input__icon--error");

		}
	},
	onError: function(cmp, evt, hlpr) {
		
		var
			payload = evt.getParam("payload"),
			errors = payload.errors,
			errorArr = [],
			field;

		if (cmp.get("v.id") === payload.id) {

			var 
				field = cmp.find("text-input"),
				confirmField = cmp.find("text-confirm-input");

			//show error icon
			cmp.set("v.errorIconClass", "igcp-utils__display--block slds-input__icon slds-input__icon--error");

			if (errors.length > 0) {
				errors.forEach(function(item, i) {
					errorArr.push({ message: item.msg });
				});

				if(errors[0].type == 'emailsMatch') {
					field.set("v.errors", []);
					confirmField.set("v.errors", errorArr);
				} else{
					field = cmp.find("text-input");
					field.set("v.errors", errorArr);
					confirmField.set("v.errors", []);
				}
			}		
		}
	},
	onHandleKey: function(cmp, evt, hlpr) {
		//Needed to override default behaviour
		evt.preventDefault();
	},
	onBlur: function(cmp, evt, hlpr) {
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
			"type": "email-confirm",
			"value": cmp.get("v.inputValue"),
			"confirmValue": cmp.get("v.inputValueConfirm")
		});
	}
})