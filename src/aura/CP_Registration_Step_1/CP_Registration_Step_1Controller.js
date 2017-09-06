({
	onSubmit: function(cmp, evt, hlpr) {

		//Reset input errors	
		cmp.set("v.inputErrors", false);
		cmp.set("v.inputsReceived", 0);

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId': 'registration-step-1-form' });
	},
	onInputValueReceived: function(cmp, evt, hlpr) {

		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events'),
			utils = cmp.find('CP_Utils'),
			inputs = cmp.get("v.inputsReceived"),
			formattedDob = "";

		validator.validate(evt.getParam("payload"), function(obj) {

			if (obj.isValid === false) {

				cmp.set("v.inputErrors", true);

				events.fire("CP_Evt_Input_Error", {
					"id": obj.id,
					"errors": obj.errors
				});

			} else {

				var
					inputId = evt.getParam("payload").id,
					inputValue = evt.getParam("payload").value;

				//Capture values
				if (inputId === "client-number") {
					cmp.set("v.clientNum", inputValue);
				} else if (inputId === "postal-code") {
					cmp.set("v.postalCode", inputValue);
				} else if (inputId === "dob") {
					cmp.set("v.dob", inputValue);
				}

				//Fire valid evt	
				events.fire("CP_Evt_Input_Valid", {
					"id": obj.id
				});
			}
		});

		cmp.set("v.inputsReceived", (inputs += 1));

		//if all inputs received and inputErrors = false
		//we are ready to submit to the backend
		if (cmp.get("v.inputsReceived") === 3 && cmp.get("v.inputErrors") === false) {


			utils.convertToYMD(cmp.get("v.dob"), function(value) {
				formattedDob = value;
			});

			cmp.set("v.payload", {
				"clientNum": cmp.get("v.clientNum"),
				"postalCode": cmp.get("v.postalCode"),
				"dob": formattedDob
			});

			cmp.onSubmitForm();
		}
	},
	submitForm: function(cmp, evt, hlpr) {

		var action = cmp.get("c.StepOne");
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
				console.log("STEP 1: ");
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
	}
})