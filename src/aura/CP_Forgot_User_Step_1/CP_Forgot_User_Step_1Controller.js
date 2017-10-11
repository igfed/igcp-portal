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

		hlpr.validateInput(cmp, evt.getParam("payload"));

		cmp.set("v.inputsReceived", (inputs += 1));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === 2 && cmp.get("v.inputErrors") === false) {

			cmp.set("v.payload", {
				"clientNum": cmp.get("v.clientNum"),
				"email": cmp.get("v.email")
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
			"StepOne",
			cmp,
			function(evt) {
				cmp.onNextStep();
			},
			function(error) {
				console.error("Forgot User: Step 1: Error");
				console.error(error);

				var
					events = cmp.find("CP_Events"),
					payload = error.payload,
					isValid = payload.State.IsValid,
					isLocked = payload.State.IsLocked,
					fields = payload.State.Fields,
					messages = payload.State.Messages,
					serviceUnavailable = payload.State.ServiceNotAvailable;

				//try {

				//Leaving this in in case the individual fields have errors for some reason
				// fields.forEach(function(errorType, i) {
				// 	var msgArr = [];

				// 	if (errorType === "clientNum") {
				// 		msgArr.push({ "msg": messages[i] });
				// 		events.fire("CP_Evt_Input_Error", {
				// 			"id": "client-number",
				// 			"errors": msgArr
				// 		});
				// 	}

				// 	if (errorType === "email") {
				// 		msgArr.push({ "msg": messages[i] });
				// 		events.fire("CP_Evt_Input_Error", {
				// 			"id": "email-input",
				// 			"errors": msgArr
				// 		});
				// 	}
				// });

				// if (isLocked) {
				// 	events.fire("CP_Evt_Error_Locked_Out", {
				// 		"id": cmp.get("v.pageId")
				// 	});
				// }

				// if (serviceUnavailable) {
				// 	events.fire("CP_Evt_Error_Not_Completed", {
				// 		"id": cmp.get("v.pageId")
				// 	});
				// }

				// if (error.type === "server-side-error" || isValid === false) {
				// 	events.fire("CP_Evt_Toast_Error", {
				// 		"id": "forgot-user-step-1-toast-error",
				// 		"message": $A.get("$Label.c.CP_Error_Server_Side_Generic")
				// 	});
				// } else {
				// if (isValid === false) {
				// 	//Display toast
				// 	events.fire("CP_Evt_Toast_Error", {
				// 		"id": "forgot-user-step-1-toast-error",
				// 		"message": messages[0]
				// 	});
				// }

				//}

				// } catch (err) {
				// 	console.error("Forgot User Step 1: There was an unknown error.");
				// 	console.error(err);

				// 	events.fire("CP_Evt_Toast_Error", {
				// 		"id": "registration-step-1-toast-error",
				// 		"message": $A.get("$Label.c.CP_Error_Server_Side_Generic")
				// 	});
				// }

				services.handleServerSideError({
						"error": error,
						"id": cmp.get("v.pageId"),
						"toastId": "forgot-user-step-1-toast-error"
					},
					function(obj) {

						if (obj.fields && obj.messages) {
							obj.fields.forEach(function(errorType, i) {
								var msgArr = [];

								if (errorType === "clientNum") {
									msgArr.push({ "msg": obj.messages[i] });
									events.fire("CP_Evt_Input_Error", {
										"id": "client-number",
										"errors": msgArr
									});
								}

								if (errorType === "email") {
									msgArr.push({ "msg": obj.messages[i] });
									events.fire("CP_Evt_Input_Error", {
										"id": "email-input",
										"errors": msgArr
									});
								}
							});
						}
					});
			}
		);
	},
	gotoNextStep: function(cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	}
})