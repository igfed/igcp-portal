({
	onInit: function(cmp, evt, hlpr) {
		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Password: A unique 'id' is required.");
		}

		if (cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Input_Password: Input needs to be associated with a 'form'.")
		}
	},
	onGetValue: function(cmp, evt, hlpr) {

		var
			events = cmp.find('CP_Events'),
			formId = evt.getParam('payload').formId,
			form = cmp.get('v.form'),
			evtParams = {};

		if (formId === form) {

			evtParams["id"] = cmp.get("v.id");
			evtParams["type"] = cmp.get("v.type");
			evtParams["value"] = cmp.get("v.passcode");

			if (cmp.get("v.confirmPassword") === true) {
				evtParams["confirmValue"] = cmp.get("v.passcodeConfirm");
			}

			events.fire("CP_Evt_Send_Input_Value", evtParams);
		}
	},
	onValid: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === evt.getParam("payload").id) {
			var field = cmp.find("password-input");

			cmp.set("v.limitClass", "igcp-text__success igcp-utils__font-size--x-small");
			cmp.set("v.upperClass", "igcp-text__success igcp-utils__font-size--x-small");
			cmp.set("v.charClass", "igcp-text__success igcp-utils__font-size--x-small");

			field.set("v.errors", []);
		}
	},
	onError: function(cmp, evt, hlpr) {

		var
			utils = cmp.find("CP_Utils"),
			payload = evt.getParam("payload"),
			confirmPasswordInput = cmp.find("confirm-password-input"),
			errors = payload.errors,
			errorTypeArr = [],
			isEmpty = false,
			minLength = false,
			hasUppercase = false,
			hasNumber = false,
			hasSpecialChar = false,
			passwordsMatch = false;

		if (cmp.get("v.id") === payload.id) {

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

				//hasUppercase
				utils.arrayContains(errorTypeArr, "hasUppercase", function(hasValue) {
					if (hasValue === false) {
						hasUppercase = true;
					}
				});

				//hasNumber
				utils.arrayContains(errorTypeArr, "hasNumber", function(hasValue) {
					if (hasValue === false) {
						hasNumber = true;
					}
				});

				//hasSpecialChar
				utils.arrayContains(errorTypeArr, "hasSpecialChar", function(hasValue) {
					if (hasValue === false) {
						hasSpecialChar = true;
					}
				});

				//passwordsMatch
				utils.arrayContains(errorTypeArr, "passwordsMatch", function(hasValue) {
					if (hasValue === false) {
						passwordsMatch = true;
					}
				});


				if (isEmpty === true) {
					cmp.set("v.limitClass", "igcp-text__error igcp-utils__font-size--x-small");
					cmp.set("v.upperClass", "igcp-text__error igcp-utils__font-size--x-small");
					cmp.set("v.charClass", "igcp-text__error igcp-utils__font-size--x-small");
				} else {
					if (minLength === true) {
						cmp.set("v.limitClass", "igcp-text__error igcp-utils__font-size--x-small");
					}

					if (minLength === false) {
						cmp.set("v.limitClass", "igcp-text__success igcp-utils__font-size--x-small");
					}

					if (hasUppercase === false) {
						cmp.set("v.upperClass", "igcp-text__error igcp-utils__font-size--x-small");
					} else {
						cmp.set("v.upperClass", "igcp-text__success igcp-utils__font-size--x-small");
					}

					if (hasSpecialChar === false && hasNumber === false) {
						cmp.set("v.charClass", "igcp-text__error igcp-utils__font-size--x-small");
					} else {
						cmp.set("v.charClass", "igcp-text__success igcp-utils__font-size--x-small");
					}

					if (passwordsMatch === false) {
						confirmPasswordInput.set("v.errors", [{ "message" : errors[0].msg}]);
					} else {
						confirmPasswordInput.set("v.errors", []);
					}
				}
			}
		}
	},
	onHandleKey: function(cmp, evt, hlpr) {

		var events = cmp.find("CP_Events");
		events.fire("CP_Evt_Key", {
			"id": cmp.get("v.id"),
			"type": cmp.get("v.type"),
			"value": cmp.get("v.passcode")
		});
	},
	onBlur: function(cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");
		events.fire("CP_Evt_Input_Blur", {
			"id": cmp.get("v.id"),
			"type": cmp.get("v.type"),
			"value": cmp.get("v.passcode")
		});
	},
	onConfirmationBlur: function(cmp, evt, hlpr) {

		var events = cmp.find("CP_Events");
		events.fire("CP_Evt_Input_Blur", {
			"id": cmp.get("v.id"),
			"type": "password-confirm",
			"value": cmp.get("v.passcode"),
			"confirmValue": cmp.get("v.passcodeConfirm")
		});
	}
})