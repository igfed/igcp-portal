({
	onInit: function(cmp, evt, hlpr) {
		//call to get security question
		//cmp.set("v.question", "What's your dogs name?");

		var services = cmp.find("CP_Services");

		//set client num
		cmp.set("v.payload", {
			"username": cmp.get("v.username")
		});

		hlpr.getRandomSecurityQuestion(cmp, hlpr);
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
			utils = cmp.find("CP_Utils"),
			inputs = cmp.get("v.inputsReceived"),
			formattedDob = "";

		hlpr.validateInput(cmp, evt.getParam("payload"));

		cmp.set("v.inputsReceived", (inputs += 1));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === 1 && cmp.get("v.inputErrors") === false) {

			utils.convertToYMD(cmp.get("v.dob"), function(value) {
				formattedDob = value;
			});


			cmp.set("v.payload", {
				"username": cmp.get("v.username"),
				"postalCode": cmp.get("v.postalCode"),
				"dob": formattedDob,
				"question": cmp.get("v.question"),
				"answer": cmp.get("v.answer"),
				"stateId": cmp.get("v.isamStateId"),
				"id": cmp.get("v.questionId")
			});

			console.log(cmp.get("v.payload"));

			cmp.onSubmitForm();
		}
	},
	onInputBlur: function(cmp, evt, hlpr) {
		hlpr.validateInput(cmp, evt.getParam("payload"));
	},
	submitForm: function(cmp, evt, hlpr) {

		var services = cmp.find("CP_Services");

		services.submitForm(
			"StepTwo",
			cmp,
			function(evt) {
				cmp.gotoNextStep();
			},
			function(error) {
				console.error("Forgot Pass: Step 2: Error");
				console.error(error);

				var
					events = cmp.find("CP_Events"),
					payload = error.payload,
					fields = payload.State.Fields,
					messages = payload.State.Messages,
					isValid = payload.State.IsValid,
					isLocked = payload.State.IsLocked,
					serviceUnavailable = payload.State.ServiceNotAvailable;

				try {

					fields.forEach(function(errorType, i) {
						var msgArr = [];

						if (errorType === "answer") {
							msgArr.push({ "msg": messages[i] });
							events.fire("CP_Evt_Input_Error", {
								"id": "text-input",
								"errors": msgArr
							});
						}
					});

					if (isLocked) {
						events.fire("CP_Evt_Error_Locked_Out", {
							"id": cmp.get("v.pageId")
						});
					}

					if (serviceUnavailable) {
						events.fire("CP_Evt_Error_Not_Completed", {
							"id": cmp.get("v.pageId")
						});
					}

					if(isLocked === false && isValid === false) {
						hlpr.getRandomSecurityQuestion(cmp, hlpr);

						events.fire("CP_Evt_Toast_Error", {
							"id": "forgot-pass-step-2-toast-error",
							"message": $A.get("$Label.c.CP_Error_Please_Try_Again")
						});
					}

					if (error.type === "server-side-error" || isValid === false) {
						events.fire("CP_Evt_Toast_Error", {
							"id": "forgot-pass-step-2-toast-error",
							"message": $A.get("$Label.c.CP_Error_Server_Side_Generic")
						});
					} else {
						//Display toast
						events.fire("CP_Evt_Toast_Error", {
							"id": "error-box",
							"message": messages[0]
						});
					}

				} catch (err) {
					console.error("Forgot Password Step 2: There was an unknown error.");
					console.error(err);

					events.fire("CP_Evt_Toast_Error", {
						"id": "forgot-pass-step-2-toast-error",
						"message": $A.get("$Label.c.CP_Error_Server_Side_Generic")
					});
				}
			}
		);
	},
	onNextStep: function(cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	}
})