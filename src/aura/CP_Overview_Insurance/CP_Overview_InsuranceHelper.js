({
	addAccounts: function(insuranceArr, cmp) {

		var 
			utils = cmp.find("CP_Utils"),
			totalCoverageAmount = "";

		utils.formatToCurrency(cmp.get("v.totalCoverageAmount"), function(formattedValue){
				totalCoverageAmount = "$" + formattedValue;
			}, cmp.get("v.lang"));

		utils.createComponent(
			"CP_Overview_Account", {
				"col1Name": $A.get("$Label.c.CP_Overview_Carrier"),
				"col2Name": $A.get("$Label.c.CP_Overview_Policy_Number"),
				"accountType": $A.get("$Label.c.CP_Overview_Option"),
				"accountTotal": totalCoverageAmount,
				"accounts": insuranceArr,
				"itemType": "insurance",
				"lang" : cmp.get("v.lang")
			},
			cmp,
			function(evt) {}
		);
	}
})