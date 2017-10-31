({
	logReturned: function (title, obj) {
		console.log('%c ############', 'background: green; color: white; display: block;');
		console.log('%c ' + title + '', 'background: green; color: white; display: block;');
		console.log(obj);
		console.log('%c ############', 'background: green; color: white; display: block;');
	},
	setTitle: function (accountName) {
		if (accountName === "TFSA") {
			return $A.get("$Label.c.CP_Generic_Label_TFSA");
		} else if (accountName === "LIRA") {
			return $A.get("$Label.c.CP_Generic_Label_LIRA");
		} else if (accountName === "Registered Disability Savings Plan") {
			return $A.get("$Label.c.CP_Generic_Label_RDSP");
		} else if (accountName === "Registered Retirement Savings Plan") {
			return $A.get("$Label.c.CP_Generic_Label_RRSP");
		} else {
			return $A.get("$Label.c.CP_Generic_Not_Available");
		}
	},
	setGeneralOverview: function (obj, cmp) {

		var utils = cmp.find("CP_Utils");

		//Title
		if (obj.accountTypeLabel) {
			cmp.set("v.accountTitle", obj.accountTypeLabel);
		} else {
			cmp.set("v.accountTitle", $A.get("$Label.c.CP_Generic_Not_Available"));
		}

		//Account Number
		if (obj.accountNumber) {
			cmp.set("v.accountNumber", obj.accountNumber);
		} else {
			cmp.set("v.accountNumber", $A.get("$Label.c.CP_Generic_Not_Available"));
		}

		//Market Value
		if (obj.marketValueCad) {
			utils.formatToCurrency(
				obj.marketValueCad,
				function (returnedValue) {
					cmp.set("v.marketValue", returnedValue);
				},
				cmp.get("v.lang")
			);
		} else {
			cmp.set("v.marketValue", $A.get("$Label.c.CP_Generic_Not_Available"));
		}

		//Total Gain Loss
		if (obj.totalGainLoss) {
			utils.formatToCurrency(obj.totalGainLoss, function (formattedValue) {
				cmp.set("v.totalGainLoss", formattedValue);
			}, cmp.get("v.lang"));
		}

		//Percentage Gain Loss
		if (obj.percGainLoss) {
			cmp.set("v.totalGainLossPercentage", obj.percGainLoss);
		} else {
			cmp.set("v.totalGainLossPercentage", $A.get("$Label.c.CP_Generic_Not_Available"));
		}

		//Gain Loss Type
		if (obj.signGainLoss) {
			cmp.set("v.gainLossType", obj.signGainLoss);
		} else {
			cmp.set("v.gainLossType", "");
		}
	},
	setDetailsList: function (obj, cmp) {
		try {
			var
				listArr = [],
				events = cmp.find("CP_Events"),
				utils = cmp.find("CP_Utils");

			//LIST
			//Book Cost
			if (obj.bookCostCad) {
				utils.formatToCurrency(obj.bookCostCad, function (formattedValue) {
					cmp.set("v.bookCost", formattedValue);
				}, cmp.get("v.lang"), true);
			} else {
				cmp.set("v.bookCost", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			//Client Number
			if (obj.clientNumber) {
				cmp.set("v.clientNumber", obj.clientNumber);
			} else {
				cmp.set("v.clientNumber", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			//Balance Date
			if (obj.balanceDate) {
				cmp.set("v.balanceDate", obj.balanceDate);
			} else {
				cmp.set("v.balanceDate", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			//Net Contributions
			if (obj.netContributions) {
				utils.formatToCurrency(obj.netContributions, function (formattedValue) {
					cmp.set("v.netContributions", formattedValue);
				}, cmp.get("v.lang"), true);
			} else {
				cmp.set("v.netContributions", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			//Book cost
			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Book_Cost"),
				"detail": cmp.get("v.bookCost")
			});

			//Push standard values
			//Client Number
			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Client_Number"),
				"detail": cmp.get("v.clientNumber")
			});

			//Balance Date
			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Balance_Date"),
				"detail": cmp.get("v.balanceDate")
			});

			//Net Contributions
			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Net_Contributions"),
				"detail": cmp.get("v.netContributions")
			});

			//Push account specific details
			if(obj.accountTypeLabel === "RDSP" || obj.accountTypeLabel === "Registered Disability Savings Plan") {
				if(obj.beneficiaryNames) {
					cmp.set("v.beneficiaryNames", obj.beneficiaryNames);
				} else {
					cmp.set("v.beneficiaryNames", $A.get("$Label.c.CP_Generic_Not_Available"));
				}

				listArr.push({
					"label" : $A.get("$Label.c.CP_Generic_Label_Beneficiary_Name"),
					"detail" : cmp.get("v.beneficiaryNames")
				});
			}

			//Populate account details list
			events.fire(
				"CP_Evt_Set_List", {
					"id": "account-list",
					"values": listArr
				}
			);
		} catch (err) {
			console.error("CP_Account_Details: setDetailsList");
			console.error(err);
		}
	}
})