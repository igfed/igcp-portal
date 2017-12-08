({
	addAccounts: function(mortgageArr, cmp) {

		var 
			utils = cmp.find("CP_Utils"),
			totalLoanAmount;

		utils.formatToCurrency(cmp.get("v.totalLoanAmount"), function(formattedValue){
			totalLoanAmount = "$" + formattedValue;
		}, cmp.get("v.lang"));

		utils.createComponent(
			"CP_Overview_Account", {
				"col1Name": $A.get("$Label.c.CP_Overview_Interest"),
				"col2Name": $A.get("$Label.c.CP_Overview_Balance"),
				"accountType": $A.get("$Label.c.CP_Overview_Rate_Type"),
				"accountTotal": totalLoanAmount,
				"accounts": mortgageArr,
				"itemType": "mortgage",
				"lang" : cmp.get("v.lang")
			},
			cmp,
			function(evt) {}
		);
	}
})