({
	onSubmitForm: function(cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
				action;

			try {
				action = component.get("c." + params.serviceName);
				action.setParams({ payload: JSON.stringify(component.get("v.payload")) });

				// Create a callback that is executed after 
				// the server-side action returns
				action.setCallback(this, function(response) {

					var state = response.getState(),
						res, valid;
					if (state === "SUCCESS") {
						// Alert the user with the value returned 
						// from the server

						res = JSON.parse(response.getReturnValue());

						console.log(res);
						valid = res["State"]["IsValid"];

						if (valid === true) {
							params.validCB({
								"payload": res,
								"type": "success"
							});
						} else {
							params.errorCB({
								"payload": res,
								"type": "error"
							});
						}

						// You would typically fire a event here to trigger 
						// client-side notification that the server-side 
						// action is complete

					} else if (state === "INCOMPLETE") {
						// do something
						params.errorCB({
							"payload": "Incomplete",
							"type": "server-side-error"
						});
					} else if (state === "ERROR") {
						var errors = response.getError();

						if (errors) {
							if (errors[0] && errors[0].message) {
								console.error("Error message: " +
									errors[0].message);
								params.errorCB({
									"payload": errors[0].message,
									"type": "server-side-error"
								});
							}
						} else {
							console.error("Unknown error");
							params.errorCB({
								"payload": "Unknown error",
								"type": "server-side-error"
							})
						}
					}
				});

				// optionally set storable, abortable, background flag here

				// A client-side action could cause multiple events, 
				// which could trigger other events and 
				// other server-side action calls.
				// $A.enqueueAction adds the server-side action to the queue.
				$A.enqueueAction(action);
			} catch (err) {
				console.error("CP_Services: onSubmitForm: controller not found, make sure it is attached to parent component.");
			}
		}
	},
	onGetSecurityQuestions: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
				action;

			try {
				action = component.get("c.getSecurityQuestions");
				action.setParams({ payload: JSON.stringify(component.get("v.payload")) });

				// Create a callback that is executed after 
				// the server-side action returns
				action.setCallback(this, function(response) {

					var state = response.getState(),
						res, valid;
					if (state === "SUCCESS") {
						// Alert the user with the value returned 
						// from the server

						res = JSON.parse(response.getReturnValue());
						var questions = res["Questions"];

						if (questions.length > 0) {
							params.validCB({
								"payload": res["Questions"],
								"type": "success"
							});
						} else {
							params.errorCB({
								"payload": res,
								"type": "error"
							});
						}

						// You would typically fire a event here to trigger 
						// client-side notification that the server-side 
						// action is complete

					} else if (state === "INCOMPLETE") {
						// do something
						params.errorCB({
							"payload": "Incomplete",
							"type": "server-side-error"
						});
					} else if (state === "ERROR") {
						var errors = response.getError();

						if (errors) {
							if (errors[0] && errors[0].message) {
								console.error("Error message: " +
									errors[0].message);
								params.errorCB({
									"payload": errors[0].message,
									"type": "server-side-error"
								});
							}
						} else {
							console.error("Unknown error");
							params.errorCB({
								"payload": "Unknown error",
								"type": "server-side-error"
							})
						}
					}
				});

				// optionally set storable, abortable, background flag here

				// A client-side action could cause multiple events, 
				// which could trigger other events and 
				// other server-side action calls.
				// $A.enqueueAction adds the server-side action to the queue.
				$A.enqueueAction(action);
			} catch (err) {
				console.error("CP_Services: getSecurityQuestions: controller not found, make sure it is attached to parent component.");
			}

		}
	},
	onGetRandSecurityQuestion: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
				action;

			try {
				console.log("getRandSecurityQuestion")
				action = component.get("c.getSecurityQuestion");
				action.setParams({ payload: JSON.stringify(component.get("v.payload")) });

				// Create a callback that is executed after 
				// the server-side action returns
				action.setCallback(this, function(response) {

					var state = response.getState(),
						res, valid;
					if (state === "SUCCESS") {
						// Alert the user with the value returned 
						// from the server

						res = JSON.parse(response.getReturnValue());
						console.log(res);

						///params.validCB();
						var questions = res["Questions"];

						if (questions.length > 0) {
							params.validCB({
								"payload": res["Questions"],
								"type": "success"
							});
						} else {
							params.errorCB({
								"payload": res,
								"type": "error"
							});
						}

						// You would typically fire a event here to trigger 
						// client-side notification that the server-side 
						// action is complete

					} else if (state === "INCOMPLETE") {
						// do something
						params.errorCB({
							"payload": "Incomplete",
							"type": "server-side-error"
						});
					} else if (state === "ERROR") {
						var errors = response.getError();

						if (errors) {
							if (errors[0] && errors[0].message) {
								console.error("Error message: " +
									errors[0].message);
								params.errorCB({
									"payload": errors[0].message,
									"type": "server-side-error"
								});
							}
						} else {
							console.error("Unknown error");
							params.errorCB({
								"payload": "Unknown error",
								"type": "server-side-error"
							})
						}
					}
				});

				// optionally set storable, abortable, background flag here

				// A client-side action could cause multiple events, 
				// which could trigger other events and 
				// other server-side action calls.
				// $A.enqueueAction adds the server-side action to the queue.
				$A.enqueueAction(action);
			} catch (err) {
				console.error("CP_Services: getRandSecurityQuestion: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}

		}
	},
	onGetInvestmentsPreview: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			console.log("getInvestmentsPreview");
			var
				component = params.component,
				action;

			try {

				action = component.get("c.getInvestmentPreviewDTO");
				action.setCallback(this, function(response) {
					console.log("onGetInvestmentsPreview response");

					var state = response.getState(),
						res;

					if (state === "SUCCESS") {
						// Alert the user with the value returned 
						// from the server

						res = JSON.parse(response.getReturnValue());
						console.log(res);

						if (res !== null) {
							params.successCB(res);
						} else {
							params.errorCB({
								"payload": "No BPID was found in Salesforce",
								"type": "no-record"
							});
						}

						// You would typically fire a event here to trigger 
						// client-side notification that the server-side 
						// action is complete

					} else if (state === "INCOMPLETE") {
						// do something
						params.errorCB({
							"payload": "Incomplete",
							"type": "server-side-error"
						});
					} else if (state === "ERROR") {
						var errors = response.getError();

						if (errors) {
							if (errors[0] && errors[0].message) {
								console.error("Error message: " +
									errors[0].message);
								params.errorCB({
									"payload": errors[0].message,
									"type": "server-side-error"
								});
							}
						} else {
							console.error("Unknown error");
							params.errorCB({
								"payload": "Unknown error",
								"type": "server-side-error"
							})
						}
					}
				});

				$A.enqueueAction(action);
			} catch (err) {
				console.error("CP_Services: onGetInvestmentsPreview: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}

		}
	}
})