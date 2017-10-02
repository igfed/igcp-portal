({
	onInit : function(cmp, evt, hlpr) {
		var account = cmp.get("v.account");

		if(account.dealerName && account.accountName) {
			cmp.set("v.accountName", (account.dealerName + " - " + account.accountName));
		}
	}
})