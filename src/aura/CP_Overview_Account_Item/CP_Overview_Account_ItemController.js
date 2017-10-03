({
	onInit : function(cmp, evt, hlpr) {
		var account = cmp.get("v.account");

		if(account.dealerName && account.accountName) {
			cmp.set("v.accountName", (account.dealerName + " - " + account.accountName));
		}

		if(account.gainLoss) {
			cmp.set("v.val1", account.gainLoss);
		} else {
			cmp.set("v.val1", $A.get("$Label.c.CP_Generic_Not_Available"));
		}

		if(account.marketValue) {
			cmp.set("v.val2", account.marketValue);
		} else {
			cmp.set("v.val2", $A.get("$Label.c.CP_Generic_Not_Available"));
		}
	}
})