({
	validateInput: function (cmp, payload) {

		var
			validator = cmp.find('CP_Validation'),
			events = cmp.find('CP_Events');


		validator.validate(payload, function (obj) {

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
	addToCurrentPayload: function (cmp, key, value) {
		var currentPayload = cmp.get("v.payload");
		currentPayload[key] = value;
		cmp.set("v.payload", currentPayload);
	},
	getSecurityQuestion: function (cmp, hlpr) {

		try {

			hlpr.showLoading(cmp);

			var services = cmp.find("CP_Services");

			services.getSecurityQuestion(
				cmp,
				function (evt) {

					hlpr.hideLoading(cmp);

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
						hlpr.addToCurrentPayload(cmp, "stateId", questionObj.stateId);

						cmp.set("v.questionId", questionObj.id);
						hlpr.addToCurrentPayload(cmp, "id", questionObj.id);

					} else {
						events.fire("CP_Evt_Toast_Error", {
							"id": "forgot-pass-step-2-toast-error",
							"message": $A.get("$Label.c.CP_Error_Server_Side_Generic")
						});
					}
				},
				function (error) {
					console.error("Forgot Pass Step 2: get random question.");
					console.error(error);

					hlpr.hideLoading(cmp);
				}
			);
		} catch (err) {
			console.log("CP_Forgot_Pass_Step_2: getSecurityQuestion")
			console.error(err);
		}

	},
	showLoading: function (cmp) {
		cmp.find("CP_Events").fire("CP_Evt_Loading_Show", {
			"id": "forgot-pass-2-spinner"
		});
	},
	hideLoading: function (cmp) {
		cmp.find("CP_Events").fire("CP_Evt_Loading_Hide", {
			"id": "forgot-pass-2-spinner"
		});
	}
})