({
	onSubmit: function(cmp, evt, hlpr) {

		//Reset input errors	
		cmp.set("v.inputErrors", false);
		cmp.set("v.inputsReceived", 0);

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId': cmp.get("v.pageId") });
	},
	onInputValueReceived: function(cmp, evt, hlpr) {

		var inputs = cmp.get("v.inputsReceived");


		hlpr.validatePassword(cmp, evt.getParam("payload"));

		cmp.set("v.inputsReceived", (inputs += 1));

		console.warn(cmp.get("v.inputsReceived"));
		console.warn(cmp.get("v.inputErrors"));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === 1 && cmp.get("v.inputErrors") === false) {

			cmp.set("v.payload", {
				"username": cmp.get("v.username"),
				"password": cmp.get("v.password"),
				"confirmPassword": cmp.get("v.confirmPassword")
			});

			cmp.onSubmitForm();
		}
	},
	onInputBlur: function(cmp, evt, hlpr) {
		hlpr.validateInput(cmp, evt.getParam("payload"));
	},
	submitForm: function(cmp, evt, hlpr) {

		try {

			console.log("SUbmit Form")

			var 
				events = cmp.find("CP_Events"),
				services = cmp.find("CP_Services");

			services.submitForm(
				"StepThree",
				cmp,
				function (evt) {
					console.warn("SUCCESS!!!!!")
					console.warn(evt);
					cmp.gotoNextStep();
				},
				function (error) {
					console.error("Step 3: Error");
					console.error(error);

					services.handleServerSideError({
						"error": error,
						"id": cmp.get("v.pageId"),
						"toastId": "forgot-pass-step-3-toast-error"
					},
						function (obj) {

							if (obj.fields) {
								if (obj.fields[0] === "confirmPassword" && error.type === "error") {
									events.fire("CP_Evt_Toast_Error", {
										"id": "forgot-pass-step-3-toast-error",
										"message": $A.get("$Label.c.CP_Error_Confirm_Password_Match")
									});
								}
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
	onNextStep: function(cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	},
	onKey: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");
		if (payload.id === "password-input") {
			hlpr.validatePassword(cmp, payload);
		}
	},
	onButtonClick: function(cmp, evt, hlpr){
		if(evt.getParam("payload").id === "back_button") {
			var utils = cmp.find("CP_Utils");
			utils.gotoLogin(cmp.get("v.lang"));
		}
	},
	doneRendering: function(cmp, evt, hlpr) {
		window._aa.registerHandlers();
		if(cmp.get("v.renderComplete") === false) {
			cmp.set("v.renderComplete", true);
		}
	}
})