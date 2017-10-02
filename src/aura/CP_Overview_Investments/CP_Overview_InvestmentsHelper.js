({
	addAccounts : function(accArr, cmp) {

		console.log("addAccount");

		var utils = cmp.find("CP_Utils");

		accArr.forEach(function(item, i){
			console.log(item);

			var accountName = "";

			//For now this is how we will be translating the dealer name
			//to the full name we have in custom labels
			if(item.dealerName === "IGSI") {
				accountName = $A.get("$Label.c.CP_Overview_IGSI");
			} else if(item.dealerName === "IGFS") {
				accountName = $A.get("$Label.c.CP_Overview_IGFS");
			}

			if(i === 0) {
				utils.createComponent(
					"CP_Overview_Account",
					{
						"accountTitle" : accountName,
						"accountType" : "Registered",
						"accountTotal" : "0.00",
						"accounts" : item.previewItems
					},
					cmp,
					function(evt){
						console.log("CP OVER ACCOUNT");
						console.log(evt);
					}
				);
			} else {

			}
		});


	}
})