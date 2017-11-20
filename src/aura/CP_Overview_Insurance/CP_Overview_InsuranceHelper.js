({
	addAccounts: function (insuranceArr, cmp) {
		cmp.find("CP_Utils").createComponent(
			"CP_Overview_Account", {
				"col1Name": $A.get("$Label.c.CP_Overview_Carrier"),
				"col2Name": $A.get("$Label.c.CP_Overview_Policy_Number"),
				"accountType": $A.get("$Label.c.CP_Overview_Option"),
				"accounts": insuranceArr,
				"itemType": "insurance",
				"lang": cmp.get("v.lang")
			},
			cmp,
			function (evt) {}
		);
	}
})