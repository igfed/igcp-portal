({
	onInit: function (cmp, evt, hlpr) {
		//set client num
		cmp.set("v.payload", {
			"clientNum": cmp.get("v.clientNum"),
			"email": cmp.get("v.email")
		});

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
		var inputs = cmp.get("v.inputsReceived");

		hlpr.validateInput(cmp, evt.getParam("payload"));

		cmp.set("v.inputsReceived", (inputs += 1));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") >= cmp.get("v.numberOfInputs") && cmp.get("v.inputErrors") === false) {

			hlpr.addToCurrentPayload(cmp, "answer", cmp.get("v.answer"));

			hlpr.showLoading(cmp);

			cmp.onSubmitForm();
		}
	},
	onInputBlur: function (cmp, evt, hlpr) {

		hlpr.validateInput(cmp, evt.getParam("payload"));
	},
	submitForm: function (cmp, evt, hlpr) {

		try {
			console.info("CP_Forgot_User_Step_2: submitForm: Submitting to backend");
			var
				events = cmp.find("CP_Events"),
				services = cmp.find("CP_Services");

			services.submitForm(
				"StepTwo",
				cmp,
				function (evt) {
					console.info("CP_Forgot_User_Step_2: submitForm: Success");
					hlpr.hideLoading(cmp);
					cmp.gotoNextStep();
					try {
						window._aa.track('forgot-username-success', '{"component": {"name": "CP_Forgot_User_Step_2Controller"}}');
					} catch (err) {
						console.error(err);
					}
				},
				function (error) {
					console.error("CP_Forgot_User_Step_2: submitForm: Error");
					console.error(error);

					if (error.payload.question.stateId) {
						cmp.set("v.isamStateId", error.payload.question.stateId);
						hlpr.addToCurrentPayload(cmp, "stateId", cmp.get("v.isamStateId"));
					}

					if (error.payload.State.isLocked === true) {
						console.error("CP_Forgot_User_Step_2: Locked Out");
						cmp.find("CP_Events").fire("CP_Evt_Error_Locked_Out", {
							"id" : cmp.get("v.pageId")
						});
					}

					hlpr.hideLoading(cmp);

					services.handleServerSideError({
							"error": error,
							"id": cmp.get("v.pageId"),
							"toastId": "forgot-user-step-2-toast-error"
						},
						function (obj) {

							console.log(obj);

							if (obj.fields[0] === "answer" && obj.isLocked === false && obj.isValid === false) {
								events.fire("CP_Evt_Toast_Error", {
									"id": "forgot-user-step-2-toast-error",
									"message": $A.get("$Label.c.CP_Forgot_User_Not_Completed_Instructions")
								});
							} else if (obj.isLocked === false && obj.isValid === false) {
								events.fire("CP_Evt_Toast_Error", {
									"id": "forgot-user-step-2-toast-error",
									"message": $A.get("$Label.c.CP_Forgot_User_Not_Completed_Instructions")
								});
							}
						}
					);
				}
			);
		} catch (err) {
			console.error("CP_Forgot_User_Step_2: submitForm");
			console.error(err);
		}

	},
	onNextStep: function (cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	},
	onKey: function (cmp, evt, hlpr) {
		var payload = evt.getParam("payload");
		if (payload.id === "password-input") {
			hlpr.validatePassword(cmp, payload);
		}
	},
	onButtonClick: function (cmp, evt, hlpr) {
		if (evt.getParam("payload").id === "cancel_button") {
			cmp.find("CP_Utils").gotoLogin();
		}
	}
})