({
	onSubmit: function (cmp, evt, hlpr) {

		//Reset input errors	
		cmp.set("v.inputErrors", false);
		cmp.set("v.inputsReceived", 0);

		console.info("SUBMIT");
		console.log(cmp.get("v.password"));
		console.log(cmp.get("v.confirmPassword"));

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", {
			'formId': cmp.get("v.pageId")
		});
	},
	onInputValueReceived: function (cmp, evt, hlpr) {

		try {
			var inputs = cmp.get("v.inputsReceived");

			hlpr.validatePassword(cmp, evt.getParam("payload"));

			cmp.set("v.inputsReceived", (inputs += 1));

			//if all inputs received and inputErrors = false
			//we are ready to submit to the backend
			if (cmp.get("v.inputsReceived") === cmp.get("v.numberOfInputs") && cmp.get("v.inputErrors") === false) {

				cmp.set("v.payload", {
					"username": cmp.get("v.username"),
					"password": cmp.get("v.password"),
					"confirmPassword": cmp.get("v.confirmPassword")
				});

				console.info("PAYLOAD");
				console.log(cmp.get("v.payload"))

				hlpr.showLoading(cmp);
				cmp.onSubmitForm();
			}
		} catch (err) {
			console.error(err);
		}
	},
	onInputBlur: function (cmp, evt, hlpr) {
		try {
			hlpr.validatePassword(cmp, evt.getParam("payload"));
		} catch(err) {
			console.error(err);
		}
	},
	submitForm: function (cmp, evt, hlpr) {

		try {

			var
				events = cmp.find("CP_Events"),
				services = cmp.find("CP_Services");

			services.submitForm(
				"StepThree",
				cmp,
				function (evt) {
					try {
						window._aa.track('forgot-password-success', '{"component": {"name": "CP_Forgot_Pass_Step_3Controller"}}');
					} catch (err) {
						console.error(err);
					}
					hlpr.hideLoading(cmp);
					cmp.gotoNextStep();
				},
				function (error) {
					console.error("Step 3: Error");
					console.error(error);

					hlpr.hideLoading(cmp);

					services.handleServerSideError({
							"error": error,
							"id": cmp.get("v.pageId"),
							"toastId": "forgot-pass-step-3-toast-error"
						},
						function (obj) {

							if (obj.fields && obj.messages) {
								obj.fields.forEach(function(errorType, i) {
	
									var msgArr = [];
	
									if (errorType === "confirmPassword") {
										events.fire("CP_Evt_Toast_Error", {
											"id": "forgot-pass-step-3-toast-error",
											"message": $A.get("$Label.c.CP_Error_Confirm_Password_Match")
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

		} catch (err) {
			console.error("CP_Forgot_Pass_Step_3: submitForm");
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