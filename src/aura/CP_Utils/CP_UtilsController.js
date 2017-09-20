({
	onCreateComponent: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {

			var container = params.container;

			$A.createComponent(
				"c:" + params.cmpId, params.params,
				function(component, status, errorMessage) {

					//Add the new button to the body array
					if (status === "SUCCESS") {

						console.log("SUCCESS")
						console.log(component)

						var body = container.get("v.body");
						body.push(component);
						container.set("v.body", body);
					} else if (status === "INCOMPLETE") {
						console.warn("No response from server or client is offline.");
						// Show offline error
					} else if (status === "ERROR") {
						console.error("Error: " + errorMessage);
						// Show error message
					}

					params.callback({ "component": component, "status": status, "errorMessage": errorMessage });
				}
			);
		} else {
			console.warn("CP_Utils: onCreateComponent: No params passed.");
		}
	},
	onDestroyComponent: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			console.warn("CP_Utils: onDestroyComponent: coming soon, sorry");
			//For some reason when I try to destroy a specific component
			//All the components get destroyed instead

		} else {
			console.warn("CP_Utils: onDestroyComponent: No params passed.");
		}
	},
	convertToYMD: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				date = params.date,
				splitArr = date.split("/");
			params.callback(splitArr[2] + "-" + splitArr[0] + "-" + splitArr[1]);
		}
	},
	onDeleteAt: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				array = params.array,
				index = params.index,
				newArr = [];

			array.forEach(function(item, i) {
				if (i != index) {
					newArr.push(item);
				}
			});

			params.callback(newArr);
		}
	},
	onArrayContains: function(cmp, evt, hlpr) {
		var params = evt.getParam("arguments");
		if (params) {
			var
				array = params.array,
				value = params.value,
				hasValue = false;

			if (array.indexOf(value) != -1) {
				hasValue = true;
			}

			params.callback(hasValue);
		}
	}
})