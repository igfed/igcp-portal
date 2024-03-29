({
	onInit: function (cmp, evt, hlpr) {
		var
			account = cmp.get("v.account"),
			utils = cmp.find("CP_Utils");

		//Investments
		if (cmp.get("v.itemType") === "investments") {

			if (account.accountName) {
				cmp.set("v.accountName", account.accountName);
			} else {
				cmp.set("v.accountName", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			if (account.percGainLoss) {
				cmp.set("v.val1", (account.percGainLoss + "%"));
			} else {
				cmp.set("v.val1", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			if (account.signGainLoss) {
				cmp.set("v.gainLossType", account.signGainLoss);
			}

			if (account.marketValue) {
				var marketValue = "";
				utils.formatToCurrency(account.marketValue, function (formattedValue) {
					if (cmp.get("v.lang") === "en_US" || cmp.get("v.lang") === "en_CA") {
						formattedValue = "$" + formattedValue;
					} else if (cmp.get("v.lang") === "fr_CA") {
						formattedValue = formattedValue + " $";
					} else {
						formattedValue = "$" + formattedValue;
					}
					marketValue = formattedValue;
				}, cmp.get("v.lang"));
				cmp.set("v.val2", marketValue);
			} else {
				cmp.set("v.val2", $A.get("$Label.c.CP_Generic_Not_Available"));
			}
		}

		//Mortgages
		if (cmp.get("v.itemType") === "mortgage") {
			if (account.rateType) {
				cmp.set("v.accountName", (account.rateType));
			} else {
				cmp.set("v.accountName", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			if (account.interestRate) {
				utils.formatPercentage(account.interestRate, function(formattedValue){
					console.log(formattedValue);
					cmp.set("v.val1", formattedValue);
				}, cmp.get("v.lang"));
			} else {
				cmp.set("v.val1", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			if (account.loanBalance) {

				var loanBalance = "";

				utils.formatToCurrency(account.loanBalance, function (formattedValue) {
					if (cmp.get("v.lang") === "en_US" || cmp.get("v.lang") === "en_CA") {
						formattedValue = "$" + formattedValue;
					} else if (cmp.get("v.lang") === "fr_CA") {
						formattedValue = formattedValue + " $";
					} else {
						formattedValue = "$" + formattedValue;
					}
					loanBalance = formattedValue;
				}, cmp.get("v.lang"));

				cmp.set("v.val2", loanBalance);
			} else {
				cmp.set("v.val2", $A.get("$Label.c.CP_Generic_Not_Available"));
			}
		}

		//Insurance
		if (cmp.get("v.itemType") === "insurance") {

			//turn off pointer cursor
			cmp.set("v.class", "igcp-account__item--static igcp-underline__thin--grey slds-grid slds-wrap slds-p-horizontal--xx-small slds-medium-p-horizontal--small slds-p-bottom-x-small")

			if (account.insuranceType) {
				cmp.set("v.accountName", account.insuranceType);
			} else {
				cmp.set("v.accountName", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			if (account.companyCarrier) {
				cmp.set("v.val1", account.companyCarrier);
			} else {
				cmp.set("v.val1", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			if (account.policyNumber) {
				cmp.set("v.val2", account.policyNumber);
			} else {
				cmp.set("v.val2", $A.get("$Label.c.CP_Generic_Not_Available"));
			}
		}

	},
	onItemClick: function (cmp, evt, hlpr) {

		var
			utils = cmp.find("CP_Utils"),
			accountNumEnc = cmp.get("v.account").accountNumberEnc,
			loanEnc = "", policyEnc ="";			

		if (accountNumEnc) {
			utils.navigateToURL("/customers/s/account-details?accEnc=" + accountNumEnc);
		} else if (cmp.get("v.itemType") === "mortgage") {
			loanEnc = cmp.get("v.account").loanNumber;
			utils.navigateToURL("/customers/s/mortgage-details?loanEnc=" + loanEnc);
		} else if (cmp.get("v.itemType") === "insurance") {
			//Do nothing for now, there isn't an insurance page
			// policyEnc = cmp.get("v.account").policyNumber;
			// utils.navigateToURL("/customers/s/insurance-details?policyEnc=" + policyEnc);
		}
	},
	onKey: function(cmp, evt, hlpr) {
		if(evt.key === "Enter") {
			cmp.onItemClick();
		}
	}
})