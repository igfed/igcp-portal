({
	addAccounts : function(accArr, cmp) {

		var utils = cmp.find("CP_Utils");

		accArr.forEach(function(item, i){

			var 
				accountName = "",
				totalValue = "";

			utils.formatToCurrency(item.totalValue, function(formattedValue){
				totalValue = formattedValue;
			}, cmp.get("v.lang"));

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
						"accountType" : $A.get("$Label.c.CP_Generic_Not_Available"),
						"accountTotal" : ("$" + totalValue),
						"accounts" : item.previewItems,
						"lang" : cmp.get("v.lang")
					},
					cmp,
					function(evt){}
				);
			} else {
				utils.createComponent(
					"CP_Overview_Account",
					{
						"accountTitle" : accountName,
						"accountType" : $A.get("$Label.c.CP_Generic_Not_Available"),
						"accountTotal" : ("$" + totalValue),
						"accounts" : item.previewItems,
						"lang" : cmp.get("v.lang")
					},
					cmp,
					function(evt){}
				);
			}
		});
	}
})