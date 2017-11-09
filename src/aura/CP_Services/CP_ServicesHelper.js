({
	setCallback: function (params, action, service, errorMsg, errorType) {
		errorMsg = errorMsg || "Unset error message";
		errorType = errorType || "unset-error";

		console.log('setCallback', service);

		action.setCallback(service, function (response) {

			var state = response.getState();

			console.log("STATE: " + state);
			console.log("SERVICES PARAMS: ", params);
			console.log("Callback: ", response);
			console.log(response);

			if (state === "SUCCESS") {

				// Alert the user with the value returned 
				// from the server
				if (response !== null) {
					params.successCB(response.returnValue);
				} else {
					params.errorCB({
						"payload": errorMsg,
						"type": errorType
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
					if (errors) {
						params.errorCB({
							"payload": errors,
							"type": "server-side-error"
						});
					}
				} else {
					params.errorCB({
						"payload": "Unknown error",
						"type": "server-side-error"
					})
				}
			}
		});

		$A.enqueueAction(action);
	},
	setCallbackPromise: function (params, action, service, errorMsg, errorType) {
		return new Promise($A.getCallback(function (resolve, reject) {
			// do something
			errorMsg = errorMsg || "Unset error message";
			errorType = errorType || "unset-error";
	
			action.setCallback(service, function (response) {
	
				var state = response.getState();
	
				if (state === "SUCCESS") {
					// Alert the user with the value returned 
					// from the server
					if (response !== null) {
						resolve(params.successCB(response.returnValue));
					} else {
						reject({
							"payload": errorMsg,
							"type": errorType
						});
					}
	
					// You would typically fire a event here to trigger 
					// client-side notification that the server-side 
					// action is complete
				} else if (state === "INCOMPLETE") {
					// do something
					reject({
						"payload": "Incomplete",
						"type": "server-side-error"
					});
				} else if (state === "ERROR") {
					var errors = response.getError();
					if (errors) {
						if (errors) {
							reject({
								"payload": errors,
								"type": "server-side-error"
							});
						}
					} else {
						reject({
							"payload": "Unknown error",
							"type": "server-side-error"
						});
					}
				}
			});
	
			$A.enqueueAction(action);
		})).catch(function(err) {
			params.errorCB(err);
		});
	}
})