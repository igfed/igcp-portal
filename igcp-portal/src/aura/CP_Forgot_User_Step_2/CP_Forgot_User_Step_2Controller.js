({
	onInit: function(cmp, evt, hlpr) {
		var services = cmp.find("CP_Services");

		//set client num
		cmp.set("v.payload", {
			"clientNum": cmp.get("v.clientNum")
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

		var inputs = cmp.get("v.inputsReceived");

		hlpr.validateInput(cmp, evt.getParam("payload"));

		cmp.set("v.inputsReceived", (inputs += 1));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === 1 && cmp.get("v.inputErrors") === false) {

			hlpr.addToCurrentPayload(cmp, "answer", cmp.get("v.answer"));

			console.log("Step 2: submit: payload: ");
			console.log(cmp.get("v.payload"));

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
				cmp.gotoNextStep();
			},
			function(error) {
				console.error("Forgot User: Step 2: Error");
				console.error(error);

				services.handleServerSideError({
						"error": error,
						"id": cmp.get("v.pageId"),
						"toastId": "forgot-user-step-2-toast-error"
					},
					function(obj) {

						if (obj.fields[0] === "answer" && obj.isLocked === false && obj.isValid === false) {
							hlpr.getRandomSecurityQuestion(cmp, hlpr);

							events.fire("CP_Evt_Toast_Error", {
								"id": "forgot-user-step-2-toast-error",
								"message": $A.get("$Label.c.CP_Error_Please_Try_Again")
							});
						}
					}
				);
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