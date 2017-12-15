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

		//E-mail confirm
		if (cmp.get("v.emailConfirm") !== "") {
			events.fire("CP_Evt_Set_Input_Value", {
				"id": "email-input",
				"formId": cmp.get("v.pageId"),
				"confirmValue": cmp.get("v.emailConfirm")
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

		//Answer 1
		if (cmp.get("v.answer1") !== "") {
			events.fire("CP_Evt_Set_Input_Value", {
				"id": "security-1-answer",
				"formId": cmp.get("v.pageId"),
				"value": cmp.get("v.answer1")
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
	onInputValueReceived: function(cmp, evt, hlpr) {

		var
			utils = cmp.find('CP_Utils'),
			inputs = cmp.get("v.inputsReceived"),
			payload = evt.getParam("payload"),
			formattedDob = "";

		hlpr.validateInput(cmp, payload, function(obj){
			var errIdArr = cmp.get("v.errIdArr");
			errIdArr.push(obj.id);
			cmp.set("v.errIdArr", errIdArr);
		});
	
		cmp.set("v.inputsReceived", (inputs += 1));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") >= cmp.get("v.numberOfInputs") && cmp.get("v.inputErrors") === false) {

			utils.convertToYMD(cmp.get("v.dob"), function(value) {
				formattedDob = value;
			});

			cmp.set("v.payload", {
				"Identity": {
					"clientNum": cmp.get("v.clientNum"),
					"postalCode": cmp.get("v.postalCode"),
					"dob": formattedDob
				},
				"Profile": {
					"username": cmp.get("v.username").toLowerCase(),
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
				}
			});

			hlpr.showLoading(cmp);

			cmp.onSubmitForm();
		} else if (cmp.get("v.inputsReceived") === cmp.get("v.numberOfInputs") && cmp.get("v.inputErrors") === true) {
			utils.scrollTo("#" + cmp.get("v.errIdArr")[0]);
			cmp.set("v.errIdArr", []);
		}
	},
	onInputBlur: function(cmp, evt, hlpr) {
		try {
			hlpr.validateInput(cmp, evt.getParam("payload"));
		} catch(err) {
			console.error(err);
		}
	},
	submitForm: function(cmp, evt, hlpr) {

		var services = cmp.find("CP_Services");

		services.submitForm(
			"StepTwo",
			cmp,
			function(success) {
				hlpr.hideLoading(cmp);
				cmp.onNextStep();
				console.info("CP_Registration_Step_2: submitForm: SUCCESS");
				console.log(success);
			},
			function(error) {

				hlpr.hideLoading(cmp);
				hlpr.scrollToTop(cmp);

				var
					events = cmp.find("CP_Events"),
					services = cmp.find("CP_Services");

				services.handleServerSideError({
						"error": error,
						"id": cmp.get("v.pageId"),
						"toastId": "registration-step-2-toast-error"
					},
					function(obj) {

						if (obj.fields && obj.messages) {
							obj.fields.forEach(function(errorType, i) {

								var msgArr = [];

								if (errorType === "userName") {
									msgArr.push({ "msg": obj.messages[i] });
									events.fire("CP_Evt_Input_Error", {
										"id": "username-input",
										"type": errorType,
										"errors": msgArr
									});
								}

								if (errorType === "email") {
									msgArr.push({ "msg": obj.messages[i] });
									events.fire("CP_Evt_Input_Error", {
										"id": "email-input",
										"type": errorType,
										"errors": msgArr
									});
								}

								if(errorType === "password") {
									msgArr.push({ "msg": obj.messages[i] });
									events.fire("CP_Evt_Input_Error", {
										"id": "password-input",
										"type": "no-spaces",
										"errors": msgArr
									});
								}
							});
						}
					}
				);
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
		if (payload.id === "username-input" || payload.id === "password-input") {
			hlpr.validateInput(cmp, payload);
		}
	}
})