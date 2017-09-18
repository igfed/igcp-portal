({
	onSubmitForm: function(cmp, evt, hlpr) {

		var params = evt.getParam("arguments");
		if (params) {

			var
				component = params.component,
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
		}
	}
})