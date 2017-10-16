({
	doneRendering: function (cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";
	},
	onSubmit: function (cmp, evt, hlpr) {

		//Reset input errors	
		cmp.set("v.inputErrors", false);
		cmp.set("v.inputsReceived", 0);

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", {
			'formId': cmp.get("v.pageId")
		});
	},
	submitForm: function (cmp, evt, hlpr) {

		var
			events = cmp.find("CP_Events"),
			services = cmp.find("CP_Services");

		services.submitForm(
			"StepThree",
			cmp,
			function (evt) {
				cmp.onNextStep();
			},
			function (error) {
				console.error("Step 3: Error");
				console.error(error);

				var
					fields = error.payload.State.Fields,
					messages = error.payload.State.Messages;

				fields.forEach(function (errorType, i) {
					var msgArr = [];

					if (errorType === "password1") {
						msgArr.push({
							"msg": messages[i]
						});
						events.fire("CP_Evt_Input_Error", {
							"id": "password1",
							"errors": msgArr
						});
					}

					if (errorType === "password2") {
						msgArr.push({
							"msg": messages[i]
						});
						events.fire("CP_Evt_Input_Error", {
							"id": "password2",
							"errors": msgArr
						});
					}

				});
			}
		);
	},
	onNextStep: function (cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	}
})