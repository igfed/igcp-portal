({
	onInit: function(cmp, evt, hlpr) {
		var
			itemsArr = [],
			events = cmp.find("CP_Events");

		cmp.updateISAMPayload();

		itemsArr = [{
				"label": "Username",
				"detail": cmp.get("v.username")
			},
			{
				"label": "Email",
				"detail": cmp.get("v.email")
			},
			{
				"label": "Notification",
				"detail": cmp.get("v.emailOptIn")
			},
			{
				"label": "Question 1",
				"detail": cmp.get("v.securityQuestion1")
			},
			{
				"label": "Answer 1",
				"detail": cmp.get("v.answer1")
			},
			{
				"label": "Question 2",
				"detail": cmp.get("v.securityQuestion2")
			},
			{
				"label": "Answer 2",
				"detail": cmp.get("v.answer2")
			},
			{
				"label": "Question 3",
				"detail": cmp.get("v.securityQuestion3")
			},
			{
				"label": "Answer 3",
				"detail": cmp.get("v.answer3")
			}
		];

		events.fire("CP_Evt_Set_List", {
			"id": cmp.get("v.pageId"),
			"values": itemsArr
		});
	},
	onRegistrationComplete: function(cmp, evt, hlpr) {
		cmp.showTOS();
	},
	onShowTOS: function(cmp, evt, hlpr) {

		var events = cmp.find("CP_Events");

		events.fire("CP_Evt_Modal_Show", {
			"id": "registration-tos"
		});
	},
	onAgreeTOS: function(cmp, evt, hlpr) {
		var
			payload = evt.getParam("payload"),
			events = cmp.find("CP_Events");

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

		var payload = evt.getParam("payload");

		if (payload.id === "read_and_agree_checkbox") {
			cmp.set("v.acceptTOS", payload.checked);
		}
	},
	onSubmitToISAM: function(cmp, evt, hlpr) {

		var action = cmp.get("c.StepThree");
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
				console.log("STEP 3");

				res = JSON.parse(response.getReturnValue());

				console.log(res);
				isValid = res["State"]["IsValid"];

				if (isValid === true) {
					cmp.onNextStep();
				} else {
					console.warn("Submission error: ");
					console.warn(response.getReturnValue());
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
	onModalShow: function(cmp, evt, hlpr) {
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