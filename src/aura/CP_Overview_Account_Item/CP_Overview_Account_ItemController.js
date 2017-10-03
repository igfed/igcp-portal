({
	onInit: function(cmp, evt, hlpr) {
		var account = cmp.get("v.account");

		//Investments
		if (cmp.get("v.itemType") === "investments") {
			if (account.dealerName && account.accountName) {
				cmp.set("v.accountName", (account.dealerName + " - " + account.accountName));
			} else {
				cmp.set("v.accountName", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			if (account.gainLoss) {
				cmp.set("v.val1", account.gainLoss);
			} else {
				cmp.set("v.val1", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			if (account.marketValue) {
				cmp.set("v.val2", account.marketValue);
			} else {
				cmp.set("v.val2", $A.get("$Label.c.CP_Generic_Not_Available"));
			}
		}

		//Mortgages
		if (cmp.get("v.itemType") === "mortgage") {
			if (account.product && account.loanNumber) {
				cmp.set("v.accountName", (account.product + " - " + account.loanNumber));
			} else {
				cmp.set("v.accountName", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			if (account.interestRate) {
				cmp.set("v.val1", account.interestRate);
			} else {
				cmp.set("v.val1", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			if (account.loanBalance) {
				cmp.set("v.val2", account.loanBalance);
			} else {
				cmp.set("v.val2", $A.get("$Label.c.CP_Generic_Not_Available"));
			}
		}

		//Insurance
		if (cmp.get("v.itemType") === "insurance") {
			console.log(account);

			if (account.insuranceType) {
				cmp.set("v.accountName", account.insuranceType);
			} else {
				cmp.set("v.accountName", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			if(account.companyCarrier) {
				cmp.set("v.val1", account.companyCarrier);
			} else {
				cmp.set("v.val1", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			if(account.policyNumber) {
				cmp.set("v.val2", account.policyNumber);
			} else {
				cmp.set("v.val2", $A.get("$Label.c.CP_Generic_Not_Available"));
			}
		}

	}
})