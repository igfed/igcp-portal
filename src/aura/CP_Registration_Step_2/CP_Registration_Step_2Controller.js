({
	onInit: function(cmp, evt, hlpr) {

		var events = cmp.find("CP_Events");

		//auto populate input if value already exists
		//Username
		if (cmp.get("v.username") !== "") {
			events.fire("CP_Evt_Set_Input_Value", {
				"id": "username-input",
				"formId": cmp.get("v.pageId"),
				"value": cmp.get("v.username")
			});
		}

		//E-mail
		if (cmp.get("v.email") !== "") {
			events.fire("CP_Evt_Set_Input_Value", {
				"id": "email-input",
				"formId": cmp.get("v.pageId"),
				"value": cmp.get("v.email")
			});
		}

		//Phone
		if (cmp.get("v.mobilePhone") !== "") {
			events.fire("CP_Evt_Set_Input_Value", {
				"id": "phone-input",
				"formId": cmp.get("v.pageId"),
				"value": cmp.get("v.mobilePhone")
			});
		}

		//Question 1
		if (cmp.get("v.securityQuestion1") !== "") {
			events.fire("CP_Evt_Set_Input_Value", {
				"id": "security-1-selector",
				"formId": cmp.get("v.pageId"),
				"selected": cmp.get("v.securityQuestion1")
			});
		}

		//Answer 1
		if (cmp.get("v.answer1") !== "") {
			events.fire("CP_Evt_Set_Input_Value", {
				"id": "security-1-answer",
				"formId": cmp.get("v.pageId"),
				"value": cmp.get("v.answer1")
			});
		}

		//Question 2
		if (cmp.get("v.securityQuestion2") !== "") {
			events.fire("CP_Evt_Set_Input_Value", {
				"id": "security-2-selector",
				"formId": cmp.get("v.pageId"),
				"selected": cmp.get("v.securityQuestion2")
			});
		}

		//Answer 2
		if (cmp.get("v.answer2") !== "") {
			events.fire("CP_Evt_Set_Input_Value", {
				"id": "security-2-answer",
				"formId": cmp.get("v.pageId"),
				"value": cmp.get("v.answer2")
			});
		}

		//Question 3
		if (cmp.get("v.securityQuestion3") !== "") {
			events.fire("CP_Evt_Set_Input_Value", {
				"id": "security-3-selector",
				"formId": cmp.get("v.pageId"),
				"selected": cmp.get("v.securityQuestion3")
			});
		}

		//Answer
		if (cmp.get("v.answer3") !== "") {
			events.fire("CP_Evt_Set_Input_Value", {
				"id": "security-3-answer",
				"formId": cmp.get("v.pageId"),
				"value": cmp.get("v.answer3")
			});
		}
	},
	onSubmit: function(cmp, evt, hlpr) {
		//Reset input errors
		cmp.set("v.inputErrors", false);
		cmp.set("v.inputsReceived", 0);

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId': cmp.get("v.pageId") });
	},
	onInputSelectorReceived: function(cmp, evt, hlpr) {
		var
			inputId = evt.getParam("payload").id,
			inputValue = evt.getParam("payload").selected;

		if (inputId === "security-1-selector") {
			cmp.set("v.securityQuestion1", inputValue);
		} else if (inputId === "security-2-selector") {
			cmp.set("v.securityQuestion2", inputValue);
		} else if (inputId === "security-3-selector") {
			cmp.set("v.securityQuestion3", inputValue);
		}
	},
	onInputValueReceived: function(cmp, evt, hlpr) {

		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events'),
			utils = cmp.find('CP_Utils'),
			inputs = cmp.get("v.inputsReceived");

		validator.validate(evt.getParam("payload"), function(obj) {

			if (obj.isValid === false) {

				cmp.set("v.inputErrors", true);

				events.fire("CP_Evt_Input_Error", {
					"id": obj.id,
					"errors": obj.errors
				});
			} else {

				var
					inputId = evt.getParam("payload").id,
					inputValue = evt.getParam("payload").value;

				if (inputId === "username-input") {
					cmp.set("v.username", inputValue);
				} else if (inputId === "password-input") {
					cmp.set("v.password", inputValue);
					cmp.set("v.confirmPassword", evt.getParam("payload").confirmValue);
				} else if (inputId === "email-input") {
					cmp.set("v.email", inputValue);
				} else if (inputId === "phone-input") {
					cmp.set("v.mobilePhone", inputValue);
				} else if (inputId === "security-1-answer") {
					cmp.set("v.answer1", inputValue);
				} else if (inputId === "security-2-answer") {
					cmp.set("v.answer2", inputValue);
				} else if (inputId === "security-3-answer") {
					cmp.set("v.answer3", inputValue);
				}

				events.fire("CP_Evt_Input_Valid", {
					"id": obj.id
				});
			}
		});

		cmp.set("v.inputsReceived", (inputs += 1));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === 8 && cmp.get("v.inputErrors") === false) {

			cmp.set("v.payload", {
				"username": cmp.get("v.username"),
				"password": cmp.get("v.password"),
				"confirmPassword": cmp.get("v.confirmPassword"),
				"email": cmp.get("v.email"),
				"emailOptIn": cmp.get("v.emailOptIn"),
				"mobilePhone": cmp.get("v.mobilePhone"),
				"securityQuestion1": cmp.get("v.securityQuestion1"),
				"answer1": cmp.get("v.answer1"),
				"securityQuestion2": cmp.get("v.securityQuestion2"),
				"answer2": cmp.get("v.answer2"),
				"securityQuestion3": cmp.get("v.securityQuestion3"),
				"answer3": cmp.get("v.answer3")
			});

			cmp.onSubmitForm();
		}
	},
	onInputBlur: function(cmp, evt, hlpr) {

		hlpr.validateInput(cmp, evt.getParam("payload"));
	},
	submitForm: function(cmp, evt, hlpr) {

		var
			events = cmp.find("CP_Events"),
			services = cmp.find("CP_Services");

		services.submitForm(
			"StepTwo",
			cmp,
			function(evt) {
				console.log("SUBMIT FORM");
				console.log("NEXT STEP!!!!!");
				cmp.onNextStep();
			},
			function(error) {

				var
					events = cmp.find("CP_Events"),
					payload = error.payload,
					fields = payload.State.Fields,
					messages = payload.State.Messages,
					isValid = payload.State.IsValid,
					isLocked = payload.State.IsLocked,
					serviceUnavailable = payload.State.ServiceNotAvailable;

				try {

					if (isLocked) {
						events.fire("CP_Evt_Error_Locked_Out", {
							"id": cmp.get("v.pageId")
						});
					}

					if (serviceUnavailable) {
						events.fire("CP_Evt_Error_Not_Completed", {
							"id": "registration"
						});
					}

					fields.forEach(function(errorType, i) {
						var msgArr = [];

						if (errorType === "userName") {
							msgArr.push({ "msg": messages[i] });
							events.fire("CP_Evt_Input_Error", {
								"id": "username-input",
								"type": errorType,
								"errors": msgArr
							});
						}

						if (errorType === "email") {
							msgArr.push({ "msg": messages[i] });
							events.fire("CP_Evt_Input_Error", {
								"id": "email-input",
								"type": errorType,
								"errors": msgArr
							});
						}
					});

					//Generic error
					if (isValid === false) {
						events.fire("CP_Evt_Toast_Error", {
							"id": "registration-step-2-toast-error",
							"message": $A.get("$Label.c.CP_Error_General")
						});
					}

				} catch (err) {

					console.error("Registration Step 2: There was an unknown error.");
					console.error(err);

					events.fire("CP_Evt_Toast_Error", {
						"id": "registration-step-2-toast-error",
						"message": $A.get("$Label.c.CP_Error_Server_Side_Generic")
					});
				}
			}
		);
	},
	gotoNextStep: function(cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	},
	onOptClicked: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");
		if (payload.id === "news-offers-opt") {
			cmp.set("v.emailOptIn", payload.checked);
		}
	},
	onKey: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");
		if (payload.id === "username-input") {
			hlpr.validateUsername(cmp, payload);
		} else if (payload.id === "password-input") {
			hlpr.validatePassword(cmp, payload);
		}
	}
})