({
	setCallback: function (params, action, service, errorMsg, errorType) {
		return new Promise($A.getCallback(function (resolve, reject) {
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