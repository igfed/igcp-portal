({
	onSubmit: function(cmp, evt, hlpr) {
		//Reset input errors	
		cmp.set("v.inputErrors", false);
		cmp.set("v.inputsReceived", 0);

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId': 'registration-step-2-form' });
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

				console.error("Input Errors: ");
				console.error(obj.errors);

				cmp.set("v.inputErrors", true);

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
	submitForm: function(cmp, evt, hlpr) {

		var action = cmp.get("c.StepTwo");
		action.setParams({ payload: JSON.stringify(cmp.get("v.payload")) });

		// Create a callback that is executed after 
		// the server-side action returns
		action.setCallback(this, function(response) {
			var state = response.getState(),
				res, isValid;
			if (state === "SUCCESS") {
				// Alert the user with the value returned 
				// from the server
				//alert("Submit Response: " + response.getReturnValue());
				console.log("STEP 2");
				console.log(response.getReturnValue());

				res = JSON.parse(response.getReturnValue());
				isValid = res["State"]["IsValid"];

				if (isValid === true) {
					cmp.onNextStep();
				} else {
					console.warn("Submission error: ");
					console.warn(res["Messages"]);
				}

				// You would typically fire a event here to trigger 
				// client-side notification that the server-side 
				// action is complete

			} else if (state === "INCOMPLETE") {
				// do something
			} else if (state === "ERROR") {
				var errors = response.getError();
				if (errors) {
					if (errors[0] && errors[0].message) {
						console.error("Error message: " +
							errors[0].message);


					}
				} else {
					console.error("Unknown error");
				}
			}
		});

		// optionally set storable, abortable, background flag here

		// A client-side action could cause multiple events, 
		// which could trigger other events and 
		// other server-side action calls.
		// $A.enqueueAction adds the server-side action to the queue.
		$A.enqueueAction(action);
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
	}
})