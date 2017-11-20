({
	addAccounts: function (title, accounts, cmp) {

		// console.info(title);
		// console.log(accounts);
		var dealerName = "";

		if (title === "Investors Group Securities Inc.") {
			dealerName = $A.get("$Label.c.CP_Overview_IGSI");
		} else if (title === "Investors Group Financial Services Inc.") {
			dealerName = $A.get("$Label.c.CP_Overview_IGFS");
		} else if (title === "NON IG") {
			dealerName = $A.get("$Label.c.CP_Overview_NON_IG");
		}

		cmp.find("CP_Utils").createComponent(
			"CP_Overview_Account_Group", {
				"groupTitle": dealerName,
				"accounts": accounts
			},
			cmp,
			function (success) {}
		);
	}
})