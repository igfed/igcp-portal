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
			events = cmp.find('CP_Events'),
			formId = evt.getParam('payload').formId,
			form = cmp.get('v.form'),
			evtParams = {},
			evtConfirmationParams = {};

		if (formId === form) {

			evtParams["id"] = cmp.get("v.id");
			evtParams["type"] = "email";
			evtParams["value"] = cmp.get("v.inputValue");
			evtParams["confirmValue"] = cmp.get("v.inputValueConfirm");

			events.fire("CP_Evt_Send_Input_Value", evtParams);

			evtConfirmationParams["id"] = cmp.get("v.id");
			evtConfirmationParams["type"] = "email-confirm";
			evtConfirmationParams["value"] = cmp.get("v.inputValue");
			evtConfirmationParams["confirmValue"] = cmp.get("v.inputValueConfirm");

			events.fire("CP_Evt_Send_Input_Value", evtConfirmationParams);
		}
	},
	onSetValue: function (cmp, evt) {

		var payload = evt.getParam("payload");
		if (cmp.get("v.id") === payload.id && payload.formId === cmp.get("v.form")) {
			
			if(payload.confirmValue) {
				cmp.set("v.inputValueConfirm", payload.confirmValue);
			} else {
				cmp.set("v.inputValue", payload.value);
			}
		}
	},
	onValid: function (cmp, evt, hlpr) {
		if (cmp.get("v.id") === evt.getParam("payload").id) {
			var
				field = cmp.find("text-input"),
				confirmField = cmp.find("text-confirm-input");

			hlpr.setValidStyle(cmp);
			hlpr.setConfirmationValidStyle(cmp);

			field.set("v.errors", []);
			confirmField.set("v.errors", []);
		}
	},
	onError: function (cmp, evt, hlpr) {

		var
			payload = evt.getParam("payload"),
			errors = payload.errors,
			errorArr = [],
			confirmErrorArr = [];

		if (cmp.get("v.id") === payload.id) {

			try {
				var
					field = cmp.find("text-input"),
					confirmField = cmp.find("text-confirm-input");

				if (errors.length > 0) {
					errors.forEach(function (item, i) {
						if (payload.type === "email") {
							
							errorArr.push({
								message: item.msg
							});
							field.set("v.errors", errorArr);
							hlpr.setErrorStyle(cmp);
						} else if (payload.type === "email-confirm") {
							
							confirmErrorArr.push({
								message: item.msg
							});
							confirmField.set("v.errors", confirmErrorArr);
							hlpr.setConfirmationErrorStyle(cmp);
						}
					});
				}
			} catch (err) {
				console.error(err);
			}
		}
	},
	onHandleKey: function (cmp, evt, hlpr) {
		//Needed to override default behaviour
		evt.preventDefault();
	},
	onBlur: function (cmp, evt, hlpr) {
		try {
			var events = cmp.find("CP_Events");
			events.fire("CP_Evt_Input_Blur", {
				"id": cmp.get("v.id"),
				"type": "email",
				"value": cmp.get("v.inputValue") === undefined ? "" : cmp.get("v.inputValue")
			});
	
			console.log("BLUR")
		} catch (err) {
			console.error(err);
		}
	},
	onConfirmationBlur: function (cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");
		events.fire("CP_Evt_Input_Blur", {
			"id": cmp.get("v.id"),
			"type": "email-confirm",
			"value": cmp.get("v.inputValue") === undefined ? "" : cmp.get("v.inputValue"),
			"confirmValue": cmp.get("v.inputValueConfirm")
		});
	},
	onFocus: function (cmp, evt, hlpr) {
		//console.info(cmp.get("v.id") + " has focus.");
		cmp.find('CP_Events').fire(
			"CP_Evt_Input_Focus", {
				"id": cmp.get("v.id"),
				"type" : "email"
			});

		cmp.setValidStyle(cmp);
	},
	onConfirmationFocus: function (cmp, evt, hlpr) {
		//console.info(cmp.get("v.id") + " confirmation field has focus.");
		cmp.find('CP_Events').fire(
			"CP_Evt_Input_Focus", {
				"id": cmp.get("v.id"),
				"type": "email-confirmation"
			});

		cmp.setConfirmationValidStyle(cmp);
	},
	onInputFocus: function (cmp, evt, hlpr) {
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