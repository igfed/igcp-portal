({
	onCreateComponent: function(cmp, evt, hlpr) {
		var params = evt.getParam('arguments');
		if (params) {

			var container = params.container;

			console.log(container);

			$A.createComponent(
				"c:" + params.cmpId, params.params,
				function(component, status, errorMessage) {

					//Add the new button to the body array
					if (status === "SUCCESS") {
						container.set("v.body", [component])
					} else if (status === "INCOMPLETE") {
						console.warn("No response from server or client is offline.")
						// Show offline error
					} else if (status === "ERROR") {
						console.error("Error: " + errorMessage);
						// Show error message
					}

					params.callback({ "component": component, "status": status, "errorMessage": errorMessage });
				}
			)
		} else {
			console.warn('CP_Utils: onCreateComponent: No params passed.');
		}
	},
	onDestroyComponent: function(cmp, evt, hlpr) {
		var params = evt.getParam('arguments');
		if (params) {
			console.warn("CP_Utils: onDestroyComponent: coming soon, sorry");
			//For some reason when I try to destroy a specific component
			//All the components get destroyed instead

		} else {
			console.warn('CP_Utils: onDestroyComponent: No params passed.');
		}
	}
})