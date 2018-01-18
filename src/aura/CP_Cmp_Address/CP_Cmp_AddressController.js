({
	onInit : function(cmp, evt, hlpr) {
		console.info("CP_Cmp_Address");
		console.log(cmp.get("v.data"));
	},
	onDataChange: function(cmp, evt, hlpr) {
		console.log("current value: ", evt.getParam("value"));
		var newData = evt.getParam("value");


		hlpr.convertToTitleCase(newData.street, function(returnedVal){
			console.log(returnedVal);
			cmp.set("v.street", returnedVal);
		});

		hlpr.convertToTitleCase(newData.city, function(returnedVal){
			console.log(returnedVal);
			cmp.set("v.city", returnedVal);
		});

		hlpr.convertToTitleCase(newData.province, function(returnedVal){
			console.log(returnedVal);
			cmp.set("v.province", returnedVal);
		});

		hlpr.convertToTitleCase(newData.postalCode, function(returnedVal){
			console.log(returnedVal);
			cmp.set("v.postalCode", returnedVal);
		});
    }
}) 