({
	onInit: function(cmp, evt, hlpr) {
		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Name_Value_List: A unique 'id' is required.");
		}
	},
	onSetList: function(cmp, evt, hlpr) {
		console.warn("CP_Cmp_Name_Value_List: onSetList");

		var payload = evt.getParam("payload");

		if (cmp.get("v.id") === payload.id) {
			var
				values = payload.values,
				variant = cmp.get("v.variant"),
				componentName = "";

			if (variant === "a") {
				componentName = "c:CP_Cmp_Name_Value_Item_A";
			} else if (variant === "b") {
				componentName = "c:CP_Cmp_Name_Value_Item_B";
			} else {
				console.warn('CP_Cmp_Name_Value_List: variant ' + variant + ' unrecognized');
			}

			values.forEach(function(item, i) {

				var itemType = "";

				if(item.type) {
					itemType = item.type;
				}

				$A.createComponent(
					componentName, {
						"label": item.label,
						"description": item.detail,
						"type": itemType
					},
					function(nameValueItem, status, errorMessage) {
						if (status === "SUCCESS") {
							var body = cmp.get("v.body");
							body.push(nameValueItem);
							cmp.set("v.body", body);
						} else if (status === "INCOMPLETE") {
							console.log("No response from server or client is offline.")
							// Show offline error
						} else if (status === "ERROR") {
							console.log("Error: " + errorMessage);
							// Show error message
						}
					}
				);
			});
		}

	}
})