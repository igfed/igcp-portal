({
	addAccounts: function(mortgageArr, cmp) {

		var utils = cmp.find("CP_Utils");

		mortgageArr.forEach(function(item, i) {
			
			utils.createComponent(
				"CP_Overview_Account", {
					"col1Name": $A.get("$Label.c.CP_Overview_Interest"),
                    "col2Name": $A.get("$Label.c.CP_Overview_Balance"),
					"accountType": $A.get("$Label.c.CP_Overview_Rate_Type"),
					"accountTotal": cmp.get("v.totalLoanAmount"),
					"accounts": mortgageArr,
					"itemType" : "mortgage"
				},
				cmp,
				function(evt) {}
			);
		});
	}
})