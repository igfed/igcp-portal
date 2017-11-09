({
	addAccounts: function(accArr, cmp) {

		var utils = cmp.find("CP_Utils");

		accArr.forEach(function(item, i) {

			var 
				groupTitle = "", 
				accountGrandTotal,
				groupName = item[Object.keys(item)[0]].dealerName; 

			if (groupName === "Investors Group Securities Inc.") {
				groupTitle = $A.get("$Label.c.CP_Overview_IGSI");
			} else if (groupName === "Investors Group Financial Services Inc.") {
				groupTitle = $A.get("$Label.c.CP_Overview_IGFS");
			} else if (groupName === "NON IG") {
				groupTitle = $A.get("$Label.c.CP_Overview_NON_IG");
			}

			//Get Dealer Name
			utils.createComponent(
				"CP_Overview_Account_Group",
				{
					"groupTitle" : groupTitle,
					"accountGrandTotal" : accountGrandTotal,
					"accounts" : item
				},
				cmp,
				function(success){}
			);

			// utils.forEach(item, function(key, val) {

			// 	var
			// 		accountName = "",
			// 		totalValue = "",
			// 		registrationType = "";

			// 	utils.formatToCurrency(val.totalValue, function(formattedValue) {
			// 		if (cmp.get("v.lang") === "en_US" || cmp.get("v.lang") === "en_CA") {
			// 			formattedValue = "$" + formattedValue;
			// 		} else if (cmp.get("v.lang") === "fr_CA") {
			// 			formattedValue = formattedValue + " $";
			// 		} else {
			// 			formattedValue = "$" + formattedValue;
			// 		}
			// 		totalValue = formattedValue;
			// 	}, cmp.get("v.lang"));

			// 	if (val.dealerName === "Investors Group Securities Inc.") {
			// 		accountName = $A.get("$Label.c.CP_Overview_IGSI");
			// 	} else if (val.dealerName === "Investors Group Financial Services Inc.") {
			// 		accountName = $A.get("$Label.c.CP_Overview_IGFS");
			// 	} else if(val.dealerName === "NON IG") {
			// 		accountName = $A.get("$Label.c.CP_Overview_NON_IG");
			// 	}

			// 	if (key === "REGISTERED") {
			// 		registrationType = $A.get("$Label.c.CP_Generic_Label_Registered");
			// 	} else if (key === "NON-REGISTERED") {
			// 		registrationType = $A.get("$Label.c.CP_Generic_Label_Non_Registered");
			// 	}

			// 	if (i === 0) {
			// 		//First
			// 		utils.createComponent(
			// 			"CP_Overview_Account", {
			// 				"accountTitle": accountName,
			// 				"accountType": registrationType,
			// 				"accountTotal": totalValue,
			// 				"accounts": val.previewItems,
			// 				"lang": cmp.get("v.lang")
			// 			},
			// 			cmp,
			// 			function(evt) {}
			// 		);
			// 	} else if (i === (accArr.length - 1)) {
			// 		//Last
			// 		utils.createComponent(
			// 			"CP_Overview_Account", {
			// 				"accountTitle": accountName,
			// 				"accountType": registrationType,
			// 				"accountTotal": totalValue,
			// 				"accounts": val.previewItems,
			// 				"lang": cmp.get("v.lang"),
			// 				"accountGrandTotal": "$109,000.00"
			// 			},
			// 			cmp,
			// 			function(evt) {}
			// 		);
			// 	} else {
			// 		//Everything else
			// 		utils.createComponent(
			// 			"CP_Overview_Account", {
			// 				"accountTitle": accountName,
			// 				"accountType": registrationType,
			// 				"accountTotal": totalValue,
			// 				"accounts": val.previewItems,
			// 				"lang": cmp.get("v.lang")
			// 			},
			// 			cmp,
			// 			function(evt) {}
			// 		);
			// 	}
			// })
		});
	}
})