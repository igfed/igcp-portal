({
	onSubmit: function(cmp, evt, hlpr) {

		//Reset input errors	
		cmp.set("v.inputErrors", false);
		cmp.set("v.inputsReceived", 0);

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId': cmp.get("v.pageId") });
	},
	onInputValueReceived: function(cmp, evt, hlpr) {

		var
			utils = cmp.find('CP_Utils'),
			inputs = cmp.get("v.inputsReceived"),
			formattedDob = "";

		hlpr.validateInput(cmp, evt.getParam("payload"));

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
	onInputBlur: function(cmp, evt, hlpr) {
		hlpr.validateInput(cmp, evt.getParam("payload"));

	},
	submitForm: function(cmp, evt, hlpr) {

		var
			events = cmp.find("CP_Events"),
			services = cmp.find("CP_Services");

		services.submitForm(
			"StepOne",
			cmp,
			function(evt) {
				cmp.onNextStep();
			},
			function(error) {
				// console.error("Step 1: Error");
				// console.error(error);

				var
					fields = error.payload.State.Fields,
					messages = error.payload.State.Messages;

				fields.forEach(function(errorType, i) {
					var msgArr = [];
					
					if (errorType === "clientNum") {
						msgArr.push({"msg" : messages[i]});
						events.fire("CP_Evt_Input_Error", {
							"id": "client-number",
							"errors": msgArr
						});
					}

					if (errorType === "postalCode") {
						msgArr.push({"msg" : messages[i]});
						events.fire("CP_Evt_Input_Error", {
							"id": "postal-code",
							"errors": msgArr
						});
					}

					if (errorType === "dob") {
						msgArr.push({"msg" : messages[i]});
						events.fire("CP_Evt_Input_Error", {
							"id": "dob",
							"errors": msgArr
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