({
	onCreateComponent: function(cmp, evt, hlpr) {
		var params = evt.getParam('arguments');
		if (params) {

			$A.createComponent(
				"c:" + params.cmpId, params.params,
				function(component, status, errorMessage) {

					//Add the new button to the body array
					if (status === "SUCCESS") {
						var body = params.cmp.get("v.body");
						body.push(component);
						params.cmp.set("v.body", body);
					} else if (status === "INCOMPLETE") {
						console.warn("No response from server or client is offline.")
						// Show offline error
					} else if (status === "ERROR") {
						console.error("Error: " + errorMessage);
						// Show error message
					}

					params.callback({ "component": component, "status": status, "errorMessage": errorMessage });
				}
			);
		}
	}
})