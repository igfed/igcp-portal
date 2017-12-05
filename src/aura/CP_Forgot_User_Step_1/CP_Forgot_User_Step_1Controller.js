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

			hlpr.showLoading(cmp);

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
				hlpr.hideLoading(cmp);
				if (evt.payload.State.IsCAVUser){
					//console.log('[CP_Forgot_User_Step_1Controller] IsCAVUSer is true')
					cmp.goToLastStep();
				} else {
					//console.log('[CP_Forgot_User_Step_1Controller] IsCAVUSer is true')
					cmp.onNextStep();
				}
			},
			function(error) {
				console.error("Forgot User: Step 1: Error");
				console.error(error);

				hlpr.hideLoading(cmp);

				var
					events = cmp.find("CP_Events"),
					services = cmp.find("CP_Services");

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
					}
				);
			}
		);
	},
	goToLastStep: function(cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId"),
			"step": 2
		});
	},
	gotoNextStep: function(cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	},
	onButtonClick: function(cmp, evt, hlpr){
		if(evt.getParam("payload").id === "back_button") {
			cmp.find("CP_Utils").gotoLogin();
		}
	},
	doneRendering: function(cmp, evt, hlpr) {
		window._aa.registerHandlers();
		if(cmp.get("v.renderComplete") === false) {
			cmp.set("v.renderComplete", true);
		}
	}
})