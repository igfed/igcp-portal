({
	doInit: function(cmp, evt, hlpr) {

		var 
			values = cmp.get("v.values")['values'],
			componentName = "c:Cp_Cmp_Table_Row";	

		values.forEach(function(item, i) {

			$A.createComponent(
				componentName, {
					"values": item
				},
				function(row, status, errorMessage) {
					if (status === "SUCCESS") {
						var body = cmp.get("v.body");
						body.push(row);
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
})