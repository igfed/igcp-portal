({
	onSubmit: function(cmp, evt, hlpr) {
		//Reset input errors	
		cmp.set("v.inputErrors", false);
		cmp.set("v.inputsReceived", 0);

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId': cmp.get("v.pageId") });
	},
	onInputSelectorReceived: function(cmp, evt, hlpr) {
		var
			inputId = evt.getParam("payload").id,
			inputValue = evt.getParam("payload").selected;

		if (inputId === "security-1-selector") {
			cmp.set("v.securityQuestion1", inputValue);
		} else if (inputId === "security-2-selector") {
			cmp.set("v.securityQuestion2", inputValue);
		} else if (inputId === "security-3-selector") {
			cmp.set("v.securityQuestion3", inputValue);
		}
	},
	onInputValueReceived: function(cmp, evt, hlpr) {

		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events'),
			utils = cmp.find('CP_Utils'),
			inputs = cmp.get("v.inputsReceived");

		validator.validate(evt.getParam("payload"), function(obj) {

			if (obj.isValid === false) {

				cmp.set("v.inputErrors", true);

				console.log(obj.errors)

				events.fire("CP_Evt_Input_Error", {
					"id": obj.id,
					"errors": obj.errors
				});
			} else {

				var
					inputId = evt.getParam("payload").id,
					inputValue = evt.getParam("payload").value;

				if (inputId === "username-input") {
					cmp.set("v.username", inputValue);
				} else if (inputId === "password-input") {
					cmp.set("v.password", inputValue);
					cmp.set("v.confirmPassword", evt.getParam("payload").confirmValue);
				} else if (inputId === "email-input") {
					cmp.set("v.email", inputValue);
				} else if (inputId === "phone-input") {
					cmp.set("v.mobilePhone", inputValue);
				} else if (inputId === "security-1-answer") {
					cmp.set("v.answer1", inputValue);
				} else if (inputId === "security-2-answer") {
					cmp.set("v.answer2", inputValue);
				} else if (inputId === "security-3-answer") {
					cmp.set("v.answer3", inputValue);
				}

				events.fire("CP_Evt_Input_Valid", {
					"id": obj.id
				});
			}
		});

		cmp.set("v.inputsReceived", (inputs += 1));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === 8 && cmp.get("v.inputErrors") === false) {

			cmp.set("v.payload", {
				"username": cmp.get("v.username"),
				"password": cmp.get("v.password"),
				"confirmPassword": cmp.get("v.confirmPassword"),
				"email": cmp.get("v.email"),
				"emailOptIn": cmp.get("v.emailOptIn"),
				"mobilePhone": cmp.get("v.mobilePhone"),
				"securityQuestion1": cmp.get("v.securityQuestion1"),
				"answer1": cmp.get("v.answer1"),
				"securityQuestion2": cmp.get("v.securityQuestion2"),
				"answer2": cmp.get("v.answer2"),
				"securityQuestion3	": cmp.get("v.securityQuestion3"),
				"answer3": cmp.get("v.answer3")
			});

			cmp.onSubmitForm();
		}
	},
	onInputBlur: function(cmp, evt, hlpr) {

		console.log("Step 2: onInputBlur");
		console.log(evt.getParam("payload"));

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

				var
					fields = error.payload.State.Fields,
					messages = error.payload.State.Messages;

				fields.forEach(function(errorType, i) {
					var msgArr = [];

					console.error('StepTwo:');
					console.error(errorType);

					// if (errorType === "clientNum") {
					// 	msgArr.push({"msg" : messages[i]});
					// 	events.fire("CP_Evt_Input_Error", {
					// 		"id": "client-number",
					// 		"errors": msgArr
					// 	});
					// }

					// if (errorType === "postalCode") {
					// 	msgArr.push({"msg" : messages[i]});
					// 	events.fire("CP_Evt_Input_Error", {
					// 		"id": "postal-code",
					// 		"errors": msgArr
					// 	});
					// }

					// if (errorType === "dob") {
					// 	msgArr.push({"msg" : messages[i]});
					// 	events.fire("CP_Evt_Input_Error", {
					// 		"id": "dob",
					// 		"errors": msgArr
					// 	});
					// }
				});
			}
		);
	},
	gotoNextStep: function(cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	},
	onOptClicked: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");

		if (payload.id === "news-offers-opt") {
			cmp.set("v.emailOptIn", payload.checked);
		}
	},
	onKey: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");

		if (payload.id === "username-input") {
			hlpr.validateUsername(cmp, payload);
		} else if (payload.id === "password-input") {
			hlpr.validatePassword(cmp, payload);
		}
	}
})