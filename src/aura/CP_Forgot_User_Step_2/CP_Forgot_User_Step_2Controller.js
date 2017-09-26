({
	doneRendering: function(cmp, evt, hlpr) {
		//call to get security question
		cmp.set("v.question", "What's your dogs name?")
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

		console.log("Inputs Received: " + cmp.get("v.inputsReceived"));
		console.log("inputErrors: " + cmp.get("v.inputErrors"));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === 1 && cmp.get("v.inputErrors") === false) {

			cmp.set("v.payload", {
				"clientNum": cmp.get("v.clientNum"),
				"email" : cmp.get("v.email"),
				"question": cmp.get("v.question"),
				"answer": cmp.get("v.answer")
			});

			cmp.gotoNextStep();

			//cmp.onSubmitForm();
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
				cmp.onNextStep();
			},
			function(error) {
				console.error("Forgot User: Step 2: Error");
				console.error(error);

				var
					events = cmp.find("CP_Events"),
					fields = error.payload.State.Fields,
					messages = error.payload.State.Messages,
					serviceUnavailable = error.payload.State.ServiceNotAvailable;

				if (serviceUnavailable) {
					events.fire("CP_Evt_Error_Not_Completed", {
						"id": "forgot-username"
					});
				}

				fields.forEach(function(errorType, i) {
					var msgArr = [];
					
					if (errorType === "answer") {
						msgArr.push({"msg" : messages[i]});
						events.fire("CP_Evt_Input_Error", {
							"id": "text-input",
							"errors": msgArr
						});
					}
				});
			}
		);
	},
	onNextStep: function(cmp, evt, hlpr) {

		console.log("NEXT STEP");
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	}
})