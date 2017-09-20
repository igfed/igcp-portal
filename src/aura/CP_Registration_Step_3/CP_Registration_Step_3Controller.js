({
	onInit: function(cmp, evt, hlpr) {
		var
			itemsArr = [],
			events = cmp.find("CP_Events");

		cmp.updateISAMPayload();

		itemsArr = [{
				"label": "Username",
				"detail": cmp.get("v.username"),
				"type": "single"
			},
			{
				"label": "Email",
				"detail": cmp.get("v.email"),
				"type": "single"
			},
			{
				"label": "Notification",
				"detail": cmp.get("v.emailOptIn"),
				"type": ""
			},
			{
				"label": "Question 1",
				"detail": cmp.get("v.securityQuestion1"),
				"type": "question"
			},
			{
				"label": "Answer 1",
				"detail": cmp.get("v.answer1"),
				"type": "answer"
			},
			{
				"label": "Question 2",
				"detail": cmp.get("v.securityQuestion2"),
				"type": "question"
			},
			{
				"label": "Answer 2",
				"detail": cmp.get("v.answer2"),
				"type": "answer"
			},
			{
				"label": "Question 3",
				"detail": cmp.get("v.securityQuestion3"),
				"type": "question"
			},
			{
				"label": "Answer 3",
				"detail": cmp.get("v.answer3"),
				"type": "answer"
			}
		];

		events.fire("CP_Evt_Set_List", {
			"id": cmp.get("v.pageId"),
			"values": itemsArr
		});
	},
	onRegistrationComplete: function(cmp, evt, hlpr) {
		console.log("onRegistrationComplete");
		cmp.showTOS();
	},
	onShowTOS: function(cmp, evt, hlpr) {

		console.log("onShowTOS");

		var events = cmp.find("CP_Events");

		events.fire("CP_Evt_Modal_Open", {
			"id": "registration-tos"
		});
	},
	onAgreeTOS: function(cmp, evt, hlpr) {
		var
			payload = evt.getParam("payload"),
			events = cmp.find("CP_Events");

		console.log('onAgreeTOS')	
		console.log("Registration Step 3");
		console.log(payload);
		console.log('ready to submit to ISAM');

		if (payload.id === "tos_agree_button") {

			if (cmp.get("v.acceptTOS") === true) {

				events.fire("CP_Evt_Modal_Close", {
					"id": "registration-tos"
				});

				//Update acceptTOS
				cmp.updateISAMPayload();

				cmp.submitToISAM();
			} else {
				console.warn("User has not accepted agreement!");
			}
		}
	},
	onAgreeChecked: function(cmp, evt, hlpr) {

		console.log("onAgreeChecked");

		var payload = evt.getParam("payload");

		console.log(payload);

		if (payload.id === "read_and_agree_checkbox") {
			cmp.set("v.acceptTOS", payload.checked);
		}
	},
	onSubmitToISAM: function(cmp, evt, hlpr) {

		var
			events = cmp.find("CP_Events"),
			services = cmp.find("CP_Services");

		services.submitForm(
			"StepThree",
			cmp,
			function(evt) {

				console.log("NEXT STEP!!!!");

				cmp.onNextStep();
			},
			function(error) {

				console.error(error);

				// var
				// 	fields = error.payload.State.Fields,
				// 	messages = error.payload.State.Messages;

				// fields.forEach(function(errorType, i) {
				// 	var msgArr = [];

				// 	console.log('Step three: error');
				// 	console.log(errorType);
				// });
			}
		);
	},
	gotoNextStep: function(cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id": cmp.get("v.pageId")
		});
	},
	onModalOpen: function(cmp, evt, hlpr) {

		var newClass = "igcp-wrapper igcp-utils__height--zero slds-grid slds-wrap slds-grid--align-center slds-grid_pull-padded slds-p-top--small slds-medium-p-top--xx-large";
		cmp.set("v.class", newClass);
	},
	onModalClose: function(cmp, evt, hlpr) {

		cmp.set("v.class", "igcp-wrapper slds-grid slds-wrap slds-grid--align-center slds-grid_pull-padded slds-p-top--small slds-medium-p-top--xx-large");
	},
	updateISAMPayload: function(cmp, evt, hlpr) {
		var
			utils = cmp.find("CP_Utils"),
			formattedDob = "";


		utils.convertToYMD(cmp.get("v.dob"), function(value) {
			formattedDob = value;
		});

		cmp.set("v.payload", {
			"State": null,
			"Identity": {
				"clientNum": cmp.get("v.clientNum"),
				"postalCode": cmp.get("v.postalCode"),
				"dob": formattedDob
			},
			"Profile": {
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
			},
			"acceptTOS": cmp.get("v.acceptTOS")
		});

		console.log(cmp.get("v.payload"));
	},
	logPayloadVars: function(cmp, evt, hlpr) {
		var logArray = [
			cmp.get("v.clientNum"),
			cmp.get("v.postalCode"),
			cmp.get("v.dob"),
			cmp.get("v.username"),
			cmp.get("v.password"),
			cmp.get("v.confirmPassword"),
			cmp.get("v.email"),
			cmp.get("v.emailOptIn"),
			cmp.get("v.mobilePhone"),
			cmp.get("v.securityQuestion1"),
			cmp.get("v.answer1"),
			cmp.get("v.securityQuestion2"),
			cmp.get("v.answer2"),
			cmp.get("v.securityQuestion3"),
			cmp.get("v.answer3")
		];

		console.log("Registration Step 3: logPayloadVars");
		logArray.forEach(function(item, i) {
			console.log(item);
		});
	}
})