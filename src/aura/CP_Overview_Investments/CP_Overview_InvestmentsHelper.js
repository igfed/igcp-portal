({
	addAccounts: function (title, accounts, cmp) {

		var dealerName = "";

		if (title === "Investors Group Securities Inc.") {
			dealerName = $A.get("$Label.c.CP_Overview_IGSI");
		} else if (title === "Investors Group Financial Services Inc.") {
			dealerName = $A.get("$Label.c.CP_Overview_IGFS");
		} else if (title === "NON IG") {
			dealerName = $A.get("$Label.c.CP_Overview_NON_IG");
		} else if (title === "I.G. Insurance Services Inc.") {
			dealerName = $A.get("$Label.c.CP_Overview_Insurance_Services");
		}

		cmp.find("CP_Utils").createComponent(
			"CP_Overview_Account_Group", {
				"lang" : cmp.get("v.lang"),
				"groupTitle": dealerName,
				"accounts": accounts
			},
			cmp,
			function (success) {}
		);
	}
})