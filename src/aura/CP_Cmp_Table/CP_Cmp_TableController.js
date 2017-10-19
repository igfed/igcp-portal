({
	doInit: function(cmp, evt, hlpr) {
	
		var data = cmp.get("v.records")
		console.info('Table ctrl | values: ', cmp.get("v.values"))
		console.info('Table ctrl | data: ', cmp.get("v.data"))

		var 
			values = cmp.get("v.values")['values'],
			componentName = "c:CP_Cmp_Table_Row";

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

	},
	onDataChange: function(cmp, evt, hlpr){
		// console.log("old value: " + evt.getParam("oldValue"));
		console.log('onChange: ', evt.getParam("value"));
		
		// cmp.set('v.data', evt.getParam('value'))

		// console.log('data on change', cmp.get("v.data"));
	}
})