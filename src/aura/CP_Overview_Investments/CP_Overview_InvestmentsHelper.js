({
	addAccounts: function(accArr, cmp) {
		accArr.forEach(function(item) {

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
			cmp.find("CP_Utils").createComponent(
				"CP_Overview_Account_Group",
				{
					"groupTitle" : groupTitle,
					"accountGrandTotal" : accountGrandTotal,
					"accounts" : item
				},
				cmp,
				function(success){}
			);
		});
	},
	
})