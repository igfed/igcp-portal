({
	doInit: function(cmp, evt, hlpr) {

		var 
			values = cmp.get("v.values")['values'];
			termClass = cmp.get("v.termClass"),
			descriptionClass = cmp.get("v.descriptionClass");

		values.forEach(function(item, i) {
			for (var key in item) {

				$A.createComponent(
					"c:CP_Cmp_Name_Value_Item", {
						"label": hlpr.convertToSpaces(key),
						"description": item[key],
						"termClass" : termClass,
						"descriptionClass" : descriptionClass
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
			}
		});
	}
})