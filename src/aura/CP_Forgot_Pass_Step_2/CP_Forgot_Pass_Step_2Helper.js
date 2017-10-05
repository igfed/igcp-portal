({
	validateInput: function(cmp, payload) {

		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events');


		validator.validate(payload, function(obj) {

			if (obj.isValid === false) {

				cmp.set("v.inputErrors", true);

				console.error("Input Errors: " + obj.id);
				console.error(obj.errors);

				events.fire("CP_Evt_Input_Error", {
					"id": obj.id,
					"errors": obj.errors
				});

			} else {

				var
					inputId = payload.id,
					inputValue = payload.value;

				//Capture values
				if (inputId === "answer-input") {
					cmp.set("v.answer", inputValue);
				}

				//Fire valid evt	
				events.fire("CP_Evt_Input_Valid", {
					"id": obj.id
				});
			}
		});
	},
	addToCurrentPayload: function(cmp, key, value) {
		var currentPayload = cmp.get("v.payload");
		currentPayload[key] = value;
		cmp.set("v.payload", currentPayload);
	},
	getRandomSecurityQuestion: function(cmp, hlpr) {

		console.log("getRandSecurityQuestion");

		try {

			var services = cmp.find("CP_Services");

			services.getRandSecurityQuestion(
				cmp,
				function(evt) {
					var
						payload = evt.payload,
						events = cmp.find("CP_Events"),
						isValid = payload.State.IsValid,
						questionObj = {};

					if (isValid === true) {

						questionObj = payload.question;

						cmp.set("v.question", questionObj.question);
						hlpr.addToCurrentPayload(cmp, "question", questionObj.question);

						cmp.set("v.isamStateId", questionObj.stateId);
						cmp.set("v.questionId", questionObj.id);

					} else {
						events.fire("CP_Evt_Toast_Error", {
							"id": "forgot-pass-step-2-toast-error",
							"message": $A.get("$Label.c.CP_Error_Server_Side_Generic")
						});
					}

				},
				function(error) {
					console.error("Forgot Pass Step 2: get random question.");
					console.error(error);

					events.fire("CP_Evt_Toast_Error", {
						"id": "forgot-pass-step-2-toast-error",
						"message": $A.get("$Label.c.CP_Error_Server_Side_Generic")
					});
				}
			);
		} catch (err) {
			console.log("GET RAD QUESITON")
			console.error(err);
		}

	}
})