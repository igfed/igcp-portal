({
	onInit: function (cmp, evt, hlpr) {
		//set client num
		cmp.set("v.payload", {
			"username": cmp.get("v.username")
		});

		console.info("Step 2 init");
		console.log(cmp.get("v.username"))

		hlpr.getSecurityQuestion(cmp, hlpr);
	},
	onSubmit: function (cmp, evt, hlpr) {

		//Reset input errors	
		cmp.set("v.inputErrors", false);
		cmp.set("v.inputsReceived", 0);

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", {
			'formId': cmp.get("v.pageId")
		});
	},
	onInputValueReceived: function (cmp, evt, hlpr) {

		var
			utils = cmp.find("CP_Utils"),
			inputs = cmp.get("v.inputsReceived"),
			formattedDob = "";

		hlpr.validateInput(cmp, evt.getParam("payload"));

		cmp.set("v.inputsReceived", (inputs += 1));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === cmp.get("v.numberOfInputs") && cmp.get("v.inputErrors") === false) {

			utils.convertToYMD(cmp.get("v.dob"), function (value) {
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

			hlpr.showLoading(cmp);

			cmp.onSubmitForm();
		}
	},
	onInputBlur: function (cmp, evt, hlpr) {
		hlpr.validateInput(cmp, evt.getParam("payload"));
	},
	submitForm: function (cmp, evt, hlpr) {

		try {

			var services = cmp.find("CP_Services");

			services.submitForm(
				"StepTwo",
				cmp,
				function (evt) {
					hlpr.hideLoading(cmp);
					cmp.gotoNextStep();
				},
				function (error) {
					console.error("Forgot Pass: Step 2: Error");
					console.error(error);

					if(error.payload.question.stateId) {
						cmp.set("v.isamStateId", error.payload.question.stateId);
						hlpr.addToCurrentPayload(cmp, "stateId", cmp.get("v.isamStateId"));
					}
	
					if(error.payload.State.isLocked === true) {
						cmp.find("CP_Events").fire("CP_Evt_Error_Locked_Out", {});
					}

					hlpr.hideLoading(cmp);
					
					services.handleServerSideError({
							"error": error,
							"id": cmp.get("v.pageId"),
							"toastId": "forgot-pass-step-2-toast-error"
						},
						function(obj) {

							if (obj.fields[0] === "answer" && obj.isLocked === false && obj.isValid === false) {

								cmp.find("CP_Events").fire("CP_Evt_Toast_Error", {
									"id": "forgot-pass-step-2-toast-error",
									"message": $A.get("$Label.c.CP_Error_Please_Try_Again")
								});
							}
						}
					);
				}
			);
		} catch (err) {
			console.error(err);
		}
	},
	onNextStep: function (cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	},
	onButtonClick: function(cmp, evt, hlpr){
		if(evt.getParam("payload").id === "cancel_button") {
			cmp.find("CP_Utils").gotoLogin();
		}
	}
})