({
	onSubmit: function(cmp, evt, hlpr) {

		//Reset input errors	
		cmp.set("v.inputErrors", false);
		cmp.set("v.inputsReceived", 0);

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId': cmp.get("v.pageId") });
	},
	onInputValueReceived: function(cmp, evt, hlpr) {

		console.log("onInputValueReceived");
		console.log(evt.getParam("payload"));

		var inputs = cmp.get("v.inputsReceived");

		console.log(cmp.get("v.inputsReceived"));

		hlpr.validatePassword(cmp, evt.getParam("payload"));

		cmp.set("v.inputsReceived", (inputs += 1));

		console.log(cmp.get("v.inputsReceived"));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === 2 && cmp.get("v.inputErrors") === false) {

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

		var
			events = cmp.find("CP_Events"),
			services = cmp.find("CP_Services");

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
					fields = error.payload.State.Fields,
					messages = error.payload.State.Messages;

				fields.forEach(function(errorType, i) {
					var msgArr = [];
					
					if (errorType === "password1") {
						msgArr.push({"msg" : messages[i]});
						events.fire("CP_Evt_Input_Error", {
							"id": "password1",
							"errors": msgArr
						});
					}

					if (errorType === "password2") {
						msgArr.push({"msg" : messages[i]});
						events.fire("CP_Evt_Input_Error", {
							"id": "password2",
							"errors": msgArr
						});
					}

				});
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
		console.log(payload);
		if (payload.id === "password-input") {
			hlpr.validatePassword(cmp, payload);
		}
	}
})