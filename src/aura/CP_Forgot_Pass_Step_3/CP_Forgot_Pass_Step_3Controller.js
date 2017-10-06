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

		var services = cmp.find("CP_Services");

		services.submitForm(
			"StepThree",
			cmp,
			function(evt) {
				cmp.gotoNextStep();
			},
			function(error) {
				console.error("Step 3: Error");
				console.error(error);

				var
					events = cmp.find("CP_Events"),
					payload = error.payload,
					fields = payload.State.Fields,
					messages = payload.State.Messages,
					isValid = payload.State.IsValid,
					isLocked = payload.State.IsLocked,
					serviceUnavailable = payload.State.ServiceNotAvailable;

				//try {
					if (fields[0] === "confirmPassword" && error.type === "error") {
						events.fire("CP_Evt_Toast_Error", {
							"id": "forgot-pass-step-3-toast-error",
							"message": $A.get("$Label.c.CP_Error_Confirm_Password_Match")
						});
					}

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

					if (error.type === "server-side-error" || isValid === false) {
						events.fire("CP_Evt_Toast_Error", {
							"id": "forgot-pass-step-3-toast-error",
							"message": $A.get("$Label.c.CP_Error_Server_Side_Generic")
						});
					}

				// } catch (err) {
				// 	console.error("Forgot Password Step 2: There was an unknown error.");
				// 	console.error(err);

				// 	events.fire("CP_Evt_Toast_Error", {
				// 		"id": "forgot-pass-step-3-toast-error",
				// 		"message": $A.get("$Label.c.CP_Error_Server_Side_Generic")
				// 	});
				// }
			}
		);
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
	}
})