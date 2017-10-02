({
	onInit: function(cmp, evt, hlpr) {
		//call to get security question
		//cmp.set("v.question", "What's your dogs name?");

		var services = cmp.find("CP_Services");

		//set client num
		cmp.set("v.payload", {
			"username": cmp.get("v.username")
		});

		services.getRandSecurityQuestion(
			cmp,
			function(success) {
				cmp.set("v.question", success["payload"][0]);
				hlpr.addToCurrentPayload(cmp, "question", success["payload"][0]);
				cmp.set("v.question", success["payload"][0].question);
			},
			function(error) {
				console.error("GET RANDOM QUESTION");
				console.error(error);
			}
		);
	},
	onSubmit: function(cmp, evt, hlpr) {

		//Reset input errors	
		cmp.set("v.inputErrors", false);
		cmp.set("v.inputsReceived", 0);

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId': cmp.get("v.pageId") });
	},
	onInputValueReceived: function(cmp, evt, hlpr) {

		var 
			utils = cmp.find("CP_Utils"),
			inputs = cmp.get("v.inputsReceived"),
			formattedDob = "";

		hlpr.validateInput(cmp, evt.getParam("payload"));

		cmp.set("v.inputsReceived", (inputs += 1));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === 1 && cmp.get("v.inputErrors") === false) {

			utils.convertToYMD(cmp.get("v.dob"), function(value) {
				formattedDob = value;
			});


			cmp.set("v.payload", {
				"username": cmp.get("v.username"),
				"postalCode": cmp.get("v.postalCode"),
				"dob": formattedDob,
				"question" : cmp.get("v.question"),
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
				cmp.gotoNextStep();
			},
			function(error) {
				console.error("Forgot Pass: Step 2: Error");
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
						msgArr.push({ "msg": messages[i] });
						events.fire("CP_Evt_Input_Error", {
							"id": "text-input",
							"errors": msgArr
						});
					}
				});

				if (error.type === "server-side-error") {
					events.fire("CP_Evt_Toast_Error", {
						"id": "error-box",
						"message": $A.get("$Label.namespace.CP_Error_Server_Side_Generic")
					});
				} else {
					//Display toast
					events.fire("CP_Evt_Toast_Error", {
						"id": "error-box",
						"message": messages[0]
					});
				}
			}
		);
	},
	onNextStep: function(cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	}
})