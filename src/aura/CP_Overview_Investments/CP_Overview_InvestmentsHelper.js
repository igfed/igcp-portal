({
	addAccounts: function(accObj, cmp) {

		var utils = cmp.find("CP_Utils");

		console.data("ADD ACCOUNTS: ", accObj);

		console.log(Object.keys(accObj));

		// utils.forEach(accObj, function(key, value) {
		// 	console.info(key);
		// 	console.info(value);
		// });


		// accArr.forEach(function(item, i) {

		// 	var 
		// 		groupTitle = "", 
		// 		accountGrandTotal,
		// 		groupName = item[Object.keys(item)[0]].dealerName; 

		// 	if (groupName === "Investors Group Securities Inc.") {
		// 		groupTitle = $A.get("$Label.c.CP_Overview_IGSI");
		// 	} else if (groupName === "Investors Group Financial Services Inc.") {
		// 		groupTitle = $A.get("$Label.c.CP_Overview_IGFS");
		// 	} else if (groupName === "NON IG") {
		// 		groupTitle = $A.get("$Label.c.CP_Overview_NON_IG");
		// 	}

		// 	//Get Dealer Name
		// 	utils.createComponent(
		// 		"CP_Overview_Account_Group",
		// 		{
		// 			"groupTitle" : groupTitle,
		// 			"accountGrandTotal" : accountGrandTotal,
		// 			"accounts" : item
		// 		},
		// 		cmp,
		// 		function(success){}
		// 	);
		// });
	}
})