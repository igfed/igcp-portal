({
	addAccounts: function(insuranceArr, cmp) {

		var utils = cmp.find("CP_Utils");

		utils.createComponent(
			"CP_Overview_Account", {
				"col1Name": $A.get("$Label.c.CP_Overview_Carrier"),
				"col2Name": $A.get("$Label.c.CP_Overview_Policy_Number"),
				"accountType": $A.get("$Label.c.CP_Overview_Option"),
				"accountTotal": cmp.get("v.totalCoverageAmount"),
				"accounts": insuranceArr,
				"itemType": "insurance"
			},
			cmp,
			function(evt) {}
		);
	}
})