({
	addAccounts: function (mortgageArr, cmp) {
		cmp.find("CP_Utils").createComponent(
			"CP_Overview_Account", {
				"col1Name": $A.get("$Label.c.CP_Overview_Interest"),
				"col2Name": $A.get("$Label.c.CP_Overview_Balance"),
				"accountType": $A.get("$Label.c.CP_Overview_Rate_Type"),
				"accounts": mortgageArr,
				"itemType": "mortgage",
				"lang": cmp.get("v.lang")
			},
			cmp,
			function (evt) {}
		);
	}
})