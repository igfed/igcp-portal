({
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
			utils = cmp.find('CP_Utils'),
			inputs = cmp.get("v.inputsReceived"),
			formattedDob = "";

		hlpr.validateInput(cmp, evt.getParam("payload"));

		cmp.set("v.inputsReceived", (inputs += 1));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === 3 && cmp.get("v.inputErrors") === false) {

			utils.convertToYMD(cmp.get("v.dob"), function (value) {
				formattedDob = value;
			});

			cmp.set("v.payload", {
				"username": cmp.get("v.username").toLowerCase(),
				"postalCode": cmp.get("v.postalCode"),
				"dob": formattedDob
			});

			hlpr.showLoading(cmp);

			cmp.onSubmitForm();
		}
	},
	onInputBlur: function (cmp, evt, hlpr) {
		hlpr.validateInput(cmp, evt.getParam("payload"));
	},
	submitForm: function (cmp, evt, hlpr) {

		var services = cmp.find("CP_Services");

		console.log('[CP_Forgot_Pass_Step_1Controller] component submitForm()')

		services.submitForm(
			"StepOne",
			cmp,
			function (evt) {
				hlpr.hideLoading(cmp);
			
				if (evt.payload.State.IsCAVUser){
					console.log('[CP_Forgot_Pass_Step_1Controller] IsCAVUSer is true')
					cmp.goToLastStep()
				}else{
					console.log('[CP_Forgot_Pass_Step_1Controller] IsCAVUSer is false')
					cmp.gotoNextStep();
				}
			},
			function (error) {
				console.error("Step 1: Error", error);
				hlpr.hideLoading(cmp);

				services.handleServerSideError({
						"error": error,
						"id": cmp.get("v.pageId"),
						"toastId": "forgot-pass-step-1-toast-error"
					},
					function (obj) {



						if (obj.fields && obj.messages) {
							obj.fields.forEach(function (errorType, i) {
								var msgArr = [];

								if (errorType === "username-input") {
									msgArr.push({
										"msg": obj.messages[i]
									});
									events.fire("CP_Evt_Input_Error", {
										"id": "username-input",
										"errors": msgArr
									});
								}

								if (errorType === "postal-code") {
									msgArr.push({
										"msg": obj.messages[i]
									});
									events.fire("CP_Evt_Input_Error", {
										"id": "postal-code",
										"errors": msgArr
									});
								}

								if (errorType === "dob") {
									msgArr.push({
										"msg": bj.messages[i]
									});
									events.fire("CP_Evt_Input_Error", {
										"id": "dob",
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
	goToLastStep: function (cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId"),
			"step": 2
		});
	},
	onNextStep: function (cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	},
	onButtonClick: function (cmp, evt, hlpr) {
		if (evt.getParam("payload").id === "back_button") {
			var utils = cmp.find("CP_Utils");
			utils.gotoLogin(cmp.get("v.lang"));
		}
	}
})