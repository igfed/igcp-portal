({
	logReturned: function (title, obj) {
		console.log('%c ############', 'background: green; color: white; display: block;');
		console.log('%c ' + title + '', 'background: green; color: white; display: block;');
		console.log(obj);
		console.log('%c ############', 'background: green; color: white; display: block;');
	},
	handleBarValue: function(val) {
		if(val !== undefined) {
			return val;			
		} else {
			return 0;
		}
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

		try {
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
			} else {
				cmp.set("v.totalGainLoss", $A.get("$Label.c.CP_Generic_Not_Available"));
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
		} catch (err) {
			console.error("CP_Account_Details: setGeneralOverview");
			console.error(err);
		}
	},
	setDetailsList: function (obj, cmp, hlpr) {
		try {
			var
				events = cmp.find("CP_Events"),
				listArr = cmp.get("v.detailsListArr"),
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

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Book_Cost"),
				"detail": cmp.get("v.bookCost")
			});

			//Client Number
			if (obj.clientNumber) {
				cmp.set("v.clientNumber", obj.clientNumber);
			} else {
				cmp.set("v.clientNumber", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Client_Number"),
				"detail": cmp.get("v.clientNumber")
			});

			//Balance Date
			if (obj.asOfDate) {
				cmp.set("v.balanceDate", obj.asOfDate);
			} else {
				cmp.set("v.balanceDate", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Balance_Date"),
				"detail": cmp.get("v.balanceDate")
			});

			//Net Contributions
			if (obj.netContributions) {
				utils.formatToCurrency(obj.netContributions, function (formattedValue) {
					cmp.set("v.netContributions", formattedValue);
				}, cmp.get("v.lang"), true);
			} else {
				cmp.set("v.netContributions", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Net_Contributions"),
				"detail": cmp.get("v.netContributions")
			});

			//Canadian Income -- only show if this is present in the returned obj
			if (obj.canadianIncome) {
				utils.formatToCurrency(obj.canadianIncome, function (formattedValue) {
					cmp.set("v.canadianIncome", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Canadian_Income"),
					"detail": cmp.get("v.canadianIncome")
				});
			}

			//Foreign Income -- only show if this is present in the returned obj
			if (obj.foreignIncome) {
				utils.formatToCurrency(obj.foreignIncome, function (formattedValue) {
					cmp.set("v.foreignIncome", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Foreign_Income"),
					"detail": cmp.get("v.foreignIncome")
				});
			}

			//ADDING ACCOUNT SPECIFIC DETAILS

			//RDSP Specific
			if (obj.accountTypeLabel === "RDSP" || 
				obj.accountTypeLabel === "Registered Disability Savings Plan") {
				hlpr.setRDSPList(obj, cmp);
			}

			//TFSA Specific
			if (obj.accountTypeLabel === "TFSA" || obj.accountTypeLabel === "Group TFSA") {
				hlpr.setTFSAList(obj, cmp);
			}

			//RRSP specific
			if (obj.accountTypeLabel === "RRSP" ||
				obj.accountTypeLabel === "LIRA" ||
				obj.accountTypeLabel === "Locked-RSP" ||
				obj.accountTypeLabel === "Spousal RSP" ||
				obj.accountTypeLabel === "RLSP") {
				hlpr.setRRSPList(obj, cmp);
			}

			//RESP specific
			if (obj.accountTypeLabel === "RESP" || 	
				obj.accountTypeLabel === "RESP-Individual Plan" ||
				obj.accountTypeLabel === "Family Plan" ||
				obj.accountTypeLabel === "RESP-Individual Plan and Family Plan"
			) {
				hlpr.setRESPList(obj, cmp);
			}

			//RRIF
			if (obj.accountTypeLabel === "RRIF" ||
				obj.accountTypeLabel === "LIF" ||
				obj.accountTypeLabel === "LRIF" ||
				obj.accountTypeLabel === "PRIF" ||
				obj.accountTypeLabel === "RLIF" ||
				obj.accountTypeLabel === "Spousal RIF") {
				hlpr.setRRIFList();
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
	},
	setRDSPList: function (obj, cmp) {
		try {
			var listArr = cmp.get("v.detailsListArr");

			if (obj.beneficiaryNames != "") {
				cmp.set("v.beneficiaryNames", obj.beneficiaryNames);
			} else {
				cmp.set("v.beneficiaryNames", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Beneficiary_Name"),
				"detail": cmp.get("v.beneficiaryNames")
			});
		} catch (err) {
			console.error("CP_Account_Details: setRDSPList");
			console.error(err);
		}
	},
	setTFSAList: function (obj, cmp) {

		try {
			var
				utils = cmp.find("CP_Utils"),
				listArr = cmp.get("v.detailsListArr");

			//Net Contributions
			if (obj.netContributionsYtd) {
				utils.formatToCurrency(obj.netContributionsYtd, function (formattedValue) {
					cmp.set("v.netContributionsYTD", formattedValue);
				}, cmp.get("v.lang"), true);
			} else {
				cmp.set("v.netContributionsYTD", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Net_Contributions_YTD"),
				"detail": cmp.get("v.netContributionsYTD")
			});

			//Net Redemptions
			if (obj.netTransfersOutYtd) {
				utils.formatToCurrency(obj.netTransfersOutYtd, function (formattedValue) {
					cmp.set("v.netRedemptionsYTD", formattedValue);
				}, cmp.get("v.lang"), true);
			} else {
				cmp.set("v.netRedemptionsYTD", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Net_Redemptions_YTD"),
				"detail": cmp.get("v.netRedemptionsYTD")
			});

			//Net Contributions Inception
			if (obj.netContributionsInception) {
				utils.formatToCurrency(obj.netContributionsInception, function (formattedValue) {
					cmp.set("v.netContributionsInception", formattedValue);
				}, cmp.get("v.lang"), true);
			} else {
				cmp.set("v.netContributionsInception", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Net_Contributions_Inception"),
				"detail": cmp.get("v.netContributionsInception")
			});

			//Net Contributions Inception
			if (obj.netWithdrawalsInception) {
				utils.formatToCurrency(obj.netWithdrawalsInception, function (formattedValue) {
					cmp.set("v.netWithdrawalsInception", formattedValue);
				}, cmp.get("v.lang"), true);
			} else {
				cmp.set("v.netWithdrawalsInception", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Net_Withdrawals_Inception"),
				"detail": cmp.get("v.netContributionsInception")
			});

			//Successor Holder
			if (obj.successorHolderName) {
				cmp.set("v.successorHolder", obj.successorHolderName);
			} else {
				cmp.set("v.successorHolder", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Successor_Holder"),
				"detail": cmp.get("v.successorHolder")
			});

			//Plan Sponsor
			if (obj.groupSponsorName) {
				cmp.set("v.planSponsor", obj.groupSponsorName);
			} else {
				cmp.set("v.planSponsor", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Plan_Sponsor"),
				"detail": cmp.get("v.planSponsor")
			});
		} catch (err) {
			console.error("CP_Account_Details: setTFSAList");
			console.error(err);
		}
	},
	setRRSPList: function (obj, cmp) {
		try {
			var
				utils = cmp.find("CP_Utils"),
				listArr = cmp.get("v.detailsListArr");

			//First 60 day contribution amount
			if (obj.first60DayContributionAmount) {
				utils.formatToCurrency(obj.first60DayContributionAmount, function (formattedValue) {
					cmp.set("v.first60DayContributionAmount", formattedValue);
				}, cmp.get("v.lang"), true);
			} else {
				cmp.set("v.first60DayContributionAmount", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_First_60_Day_Contribution"),
				"detail": cmp.get("v.first60DayContributionAmount")
			});

			//Last 10 Month Contribution Amount
			if (obj.last10MonthContributionAmount) {
				utils.formatToCurrency(obj.last10MonthContributionAmount, function (formattedValue) {
					cmp.set("v.last10MonthContributionAmount", formattedValue);
				}, cmp.get("v.lang"), true);
			} else {
				cmp.set("v.last10MonthContributionAmount", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Last_10_Month_Contribution"),
				"detail": cmp.get("v.last10MonthContributionAmount")
			});

			//Beneficiary Name
			if (obj.beneficiaryName) {
				cmp.set("v.beneficiaryName", obj.beneficiaryName);
			} else {
				cmp.set("v.beneficiaryName", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Beneficiary"),
				"detail": cmp.get("v.beneficiaryName")
			});

			//Contributor Spouse Name
			if (obj.contributorSpouseName) {
				cmp.set("v.contributorSpouseName", obj.contributorSpouseName);
			} else {
				cmp.set("v.contributorSpouseName", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Contributor_Spouse_Name"),
				"detail": cmp.get("v.contributorSpouseName")
			});

		} catch (err) {
			console.error("CP_Account_Details: setRRSPList");
			console.error(err);
		}
	},
	setRESPList: function(obj, cmp) {
		try {
			var
				utils = cmp.find("CP_Utils"),
				listArr = cmp.get("v.detailsListArr");

			//YTD Contribution Amount
			if (obj.ytdContributionAmt) {
				cmp.set("v.ytdContributionAmt", obj.ytdContributionAmt);
			} else {
				cmp.set("v.ytdContributionAmt", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_YTD_Contribution_Amount"),
				"detail": cmp.get("v.ytdContributionAmt")
			});

			//CRA Plan Id
			if (obj.craPlanId) {
				cmp.set("v.craPlanId", obj.craPlanId);
			} else {
				cmp.set("v.craPlanId", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_CRA_Plan_Id"),
				"detail": cmp.get("v.craPlanId")
			});

			//Beneficiary Name
			if (obj.beneficiaryName) {
				cmp.set("v.beneficiaryName", obj.beneficiaryName);
			} else {
				cmp.set("v.beneficiaryName", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Beneficiary"),
				"detail": cmp.get("v.beneficiaryName")
			});
			
		} catch(err) {
			console.error("CP_Account_Details: setRESPList");
			console.error(err);
		}
	},
	setRRIFList: function(obj, cmp) {
		try {

		} catch(err) {
			
		}
	}
})