({
	onSubmitForm: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
				action;

			try {
				action = component.get("c." + params.serviceName);

				action.setParams({
					payload: JSON.stringify(component.get("v.payload"))
				});

				// Create a callback that is executed after 
				// the server-side action returns
				action.setCallback(this, function (response) {

					var state = response.getState(),
						res, valid;
					if (state === "SUCCESS") {
						// Alert the user with the value returned 
						// from the server

						res = JSON.parse(response.getReturnValue());

						console.log('[CP_ServicesController] onSubmitForm response:', res);

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
	onGetSecurityQuestions: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
				action;

			try {
				action = component.get("c.getSecurityQuestions");

				action.setParams({
					payload: JSON.stringify(component.get("v.payload"))
				});

				// Create a callback that is executed after 
				// the server-side action returns
				action.setCallback(this, function (response) {

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
	onGetSecurityQuestion: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
				action;

			try {
				action = component.get("c.getSecurityQuestion");
				action.setParams({
					payload: JSON.stringify(component.get("v.payload"))
				});

				// Create a callback that is executed after 
				// the server-side action returns
				action.setCallback(this, function (response) {

					var state = response.getState(),
						res, valid;
					if (state === "SUCCESS") {
						// Alert the user with the value returned 
						// from the server

						res = JSON.parse(response.getReturnValue());
						console.log(res);

						if (res.question.question.length > 0) {
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
				console.error("CP_Services: getRandSecurityQuestion: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}

		}
	},
	onGetClientFirstName: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				action,
				component = params.component;

			try {

				action = component.get("c.getUserFirstName");

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No first name was returned",
					"no-name"
				);
			} catch (err) {
				console.error("CP_Services: onGetClientFirstName: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onGetClientFullName: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				action,
				component = params.component;

			try {

				action = component.get("c.getUserName");

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No full name was returned",
					"no-name"
				);

			} catch (err) {
				console.error("CP_Services: onGetClientFullName: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onGetInvestmentsPreview: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			try {

				action = component.get("c.getInvestmentPreviewDTO");

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No BPID was found in Salesforce",
					"no-record"
				);
			} catch (err) {
				console.error("CP_Services: onGetInvestmentsPreview: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}

		}
	},
	onGetInvestmentAccounts: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			try {

				action = component.get("c.getInvestmentPreviewJSON");

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No BPID was found in Salesforce",
					"no-record"
				);
			} catch (err) {
				console.error("CP_Services: onGetInvestmentAccounts: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}

		}
	},
	onGetInvestmentsPreviewRegistered: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			if (params.dealerName === undefined || params.dealerName === null) {
				console.error("CP_Services: getInvestmentsPreviewRegistered: dealerName is required.");
			}

			try {

				action = component.get("c.getRegisteredAccounts");

				action.setParams({
					"dealerName": params.dealerName
				});

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No BPID was found in Salesforce",
					"no-record"
				);
			} catch (err) {
				console.error("CP_Services: getInvestmentsPreviewRegistered: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}

		}
	},
	onGetInvestmentsPreviewNonRegistered: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			try {

				if (params.dealerName === undefined || params.dealerName === null) {
					console.error("CP_Services: getInvestmentsPreviewNonRegistered: dealerName is required.");
				}

				action = component.get("c.getNonRegisteredAccounts");

				action.setParams({
					"dealerName": params.dealerName
				});

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No BPID was found in Salesforce",
					"no-record"
				);
			} catch (err) {
				console.error("CP_Services: getInvestmentsPreviewNonRegistered: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}

		}
	},
	onGetMortgagePreview: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			try {

				action = component.get("c.getMortgagePreviewDTO");

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No BPID was found in Salesforce",
					"no-record"
				);

			} catch (err) {
				console.error("CP_Services: onGetMortgagePreview: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}

		}
	},
	onGetInsurancePreview: function (cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			try {

				action = component.get("c.getInsurancePreviewDTO");

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No BPID was found in Salesforce",
					"no-record"
				);

			} catch (err) {
				console.error("CP_Services: onGetInsurancePreview: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}

		}
	},
	onGetAssetMix: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			try {

				action = component.get("c.getAssetMixSortedList");

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No BPID was found in Salesforce",
					"no-record"
				);

			} catch (err) {
				console.error("CP_Services: onGetAssetMix: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onGetAccountDetail: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			try {

				action = component.get("c.getAccountDetailDTO");

				action.setParams({
					accountNumberEnc: params.accountNumber
				});


				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No account name was found in Salesforce",
					"no-record"
				);

			} catch (err) {
				console.error("CP_Services: onGetAccountDetail: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onGetInvestmentProfile: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			try {

				action = component.get("c.getInvestmentProfileDTO");

				action.setParams({
					accountNumberEnc: params.accountNumber
				});

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No account name was found in Salesforce",
					"no-record"
				);

			} catch (err) {
				console.error("CP_Services: onGetInvestmentProfile: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onGetHoldings: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
				action;

			try {

				action = component.get("c.getHoldingsDTOList");

				action.setParams({
					accountNumberEnc: params.accountNumber
				});

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No account name was found in Salesforce",
					"no-record"
				);

			} catch (err) {
				console.error("CP_Services: onGetHoldings: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onGetTransactions: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
				action;

			try {

				action = component.get("c.getTransactionsDTOList");

				action.setParams({
					accountNumberEnc: params.accountNumber
				});

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No account name was found in Salesforce",
					"no-record"
				);

			} catch (err) {
				console.error("CP_Services: onGetTransactions: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onGetInstructions: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
				action;

			try {

				action = component.get("c.getInstructionsDTOList");

				action.setParams({
					accountNumberEnc: params.accountNumber
				});

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No account name was found in Salesforce",
					"no-record"
				);

			} catch (err) {
				console.error("CP_Services: onGetInstructions: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onGetAccountPerformance: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
				action;

			try {

				action = component.get("c.getAccountPerformance");

				action.setParams({
					accountNumberEnc: params.accountNumber
				});

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No account name was found in Salesforce",
					"no-record"
				);

			} catch (err) {
				console.error("CP_Services: onGetAccountPerformance: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onGetUserInfo: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			try {

				action = component.get("c.getUserInfoDTO");

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"Unable to retrieve user information",
					"unable-to-retrieve"
				);

			} catch (err) {
				console.error("CP_Services: onGetUserInfo: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onHandleServerSideError: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {

			var
				events = cmp.find("CP_Events"),
				payload = params.payload,
				errorObj = payload.error.payload,
				isValid = errorObj.State.IsValid,
				isLocked = errorObj.State.IsLocked,
				serviceUnavailable = errorObj.State.ServiceNotAvailable,
				callbackObj = {};

			if (isValid === false) {

				console.warn("CP_Services: onHandleServerSideError: isValid = false");
				console.warn(payload);

				//Backend returned value is not valid
				if (isLocked === true) {

					//if is locked is true then go to locked out view
					events.fire("CP_Evt_Error_Locked_Out", {
						"id": payload.id
					});

				} else if (serviceUnavailable === true) {

					//if service is unavailable go to locked out view
					events.fire("CP_Evt_Error_Not_Completed", {
						"id": payload.id
					});
					events.fire("CP_Evt_Toast_Error", {
						"id": payload.toastId,
						"message": errorObj.State.Messages[0]
					});

				} else if (errorObj.State.Fields.length !== 0 && errorObj.State.Messages.length !== 0) {

					//If there are error fields and messages	
					callbackObj["fields"] = errorObj.State.Fields;
					callbackObj["messages"] = errorObj.State.Messages;
					callbackObj["isLocked"] = isLocked;
					callbackObj["isValid"] = isValid;
					params.callback(callbackObj);

				} else if (errorObj.State.Fields.length === 0 && errorObj.State.Messages.length !== 0) {
					console.error("CP_Services: handleServerSideError: Toast Error: error with message");
					console.error(errorObj);
					//if there are only messages
					events.fire("CP_Evt_Toast_Error", {
						"id": payload.toastId,
						"message": errorObj.State.Messages[0]
					});

				} else if (errorObj.type === "server-side-error") {
					console.error("CP_Services: handleServerSideError: Toast Error: Not Completed");
					console.error(errorObj);
					events.fire("CP_Evt_Error_Not_Completed", {
						"id": payload.id
					});
				} else {

					//Fallback error
					events.fire("CP_Evt_Toast_Error", {
						"id": payload.toastId,
						"message": $A.get("$Label.c.CP_Error_Server_Side_Generic")
					});

					console.error("CP_Services: handleServerSideError: Toast Error: Fallback Error");
					console.error(errorObj);
				}
			}
		}
	},
	onGetMortgageDetail: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			try {
				action = component.get("c.getMortgageDetailDTO");
				action.setParams({
					loanNumber: params.loanNumber
				});
				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"No loan record was found in Salesforce",
					"no-record"
				);
			} catch (err) {
				console.error("CP_Services: onGetMortgageDetail: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}

		}
	},
	onUpdateAssets: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;


			try {
				action = component.get("c.UpdateAssets");

				action.setParams({
					payload: params.payload
				});

				hlpr.setCallback(
					params,
					action,
					this,
					"Assets failed to update.",
					"unknown-error"
				);
			} catch (err) {
				console.error("CP_Services: onUpdateAssets: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onGetOnlineStatementListFilter: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			try {
				action = component.get("c.getOnlineStatementListFilter");

				action.setParams({
					filter: params.filter
				});

				hlpr.setCallback(
					params,
					action,
					this,
					"Assets failed to update.",
					"unknown-error"
				);
			} catch (err) {
				console.error("CP_Services: onGetOnlineStatementListFilter: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onGetAllFinancialAssets: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			try {
				action = component.get("c.getAllFinancialAssets");
				action.setParams({
					payload: ""
				});

				hlpr.setCallbackPromise(
					params,
					action,
					this,
					"Assets failed to update.",
					"unknown-error"
				);
			} catch (err) {
				console.error("CP_Services: onGetAllFinancialAssets: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onUpdatePassword: function (cmp, evt, hlpr) {

		console.log('service_js_controller');

		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			console.log('service_js_controller - component.get("v.payload") ' + JSON.stringify(component.get("v.payload")));

			console.log('service_js_controller - params.payload' + params.payload);

			try {
				action = component.get("c.updatePassword");

				action.setParams({
					payload: params.payload
				});

				hlpr.setCallback(
					params,
					action,
					this,
					"Password failed to update.",
					"unknown-error"
				);
			} catch (err) {
				console.error("CP_Services: onUpdatePassword: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	},
	onEmailChange: function (cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {
			var
				component = params.component,
				action;

			console.log('[CP_Services] OnEmailChange params.payload', params.payload);

			try {
				action = component.get("c.emailChange");

				action.setParams({
					payload: params.payload
				});

				hlpr.setCallback(
					params,
					action,
					this,
					"Email failed to update.",
					"unknown-error"
				);
			} catch (err) {
				console.error("CP_Services: onEmailChange: controller not found, make sure it is attached to parent component.");
				console.log(err);
			}
		}
	}
})