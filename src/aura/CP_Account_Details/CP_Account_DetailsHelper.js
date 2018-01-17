({
	logReturned: function (title, obj) {
		console.log('%c ############', 'background: green; color: white; display: block;');
		console.log('%c ' + title + '', 'background: green; color: white; display: block;');
		console.log(obj);
		console.log('%c ############', 'background: green; color: white; display: block;');
	},
	handleBarValue: function (val) {
		if (val !== undefined) {
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
	setGeneralOverview: function (obj, cmp, hlpr) {

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
			if (obj.bookCostCad !== undefined) {
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
			if (obj.clientNumber !== undefined) {
				cmp.set("v.clientNumber", obj.clientNumber);
			} else {
				cmp.set("v.clientNumber", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Client_Number"),
				"detail": cmp.get("v.clientNumber")
			});

			//Balance Date
			if (obj.asOfDate !== undefined) {
				utils.convertToMDY(obj.asOfDate, function (obj) {
					cmp.set("v.balanceDate", obj.formattedString);
				}, cmp.get("v.lang"));
			} else {
				cmp.set("v.balanceDate", $A.get("$Label.c.CP_Generic_Not_Available"));
			}

			listArr.push({
				"label": $A.get("$Label.c.CP_Generic_Label_Balance_Date"),
				"detail": cmp.get("v.balanceDate")
			});

			//Net Contributions
			if (obj.netContributions !== undefined) {
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
			if (obj.canadianIncome !== undefined) {
				utils.formatToCurrency(obj.canadianIncome, function (formattedValue) {
					cmp.set("v.canadianIncome", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Canadian_Income"),
					"detail": cmp.get("v.canadianIncome")
				});
			}

			//Foreign Income -- only show if this is present in the returned obj
			if (obj.foreignIncome !== undefined) {
				utils.formatToCurrency(obj.foreignIncome, function (formattedValue) {
					cmp.set("v.foreignIncome", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Foreign_Income"),
					"detail": cmp.get("v.foreignIncome")
				});
			}

			//ADDING ACCOUNT SPECIFIC DETAILS
			hlpr.getAccountType(obj, function (returnedVal) {

				console.log("GET ACCOUNT TYPE: ", returnedVal);

				if (returnedVal === "RRSP") {
					hlpr.setRRSPList(obj, cmp);
				} else if (returnedVal === "RDSP") {
					hlpr.setRDSPList(obj, cmp);
				} else if (returnedVal === "TFSA") {
					hlpr.setTFSAList(obj, cmp);
				} else if (returnedVal === "RESP") {
					hlpr.setRESPList(obj, cmp);
				} else if (returnedVal === "RRIF") {
					hlpr.setRRIFList(obj, cmp);
				} else if (returnedVal === "GROUP_RRSP") {
					hlpr.setGroupRRSPList(obj, cmp);
				} else if (returnedVal === "GIF") {
					hlpr.setGifList(obj, cmp);
				}
			});

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

			console.info("CP_Account_Details: setRDSPList");

			var listArr = cmp.get("v.detailsListArr");

			if (obj.beneficiaryNames != "" || obj.beneficiaryNames != undefined) {
				cmp.set("v.beneficiaryNames", obj.beneficiaryNames);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Beneficiary_Name"),
					"detail": cmp.get("v.beneficiaryNames")
				});
			}
		} catch (err) {
			console.error("CP_Account_Details: setRDSPList");
			console.error(err);
		}
	},
	setTFSAList: function (obj, cmp) {

		try {

			console.info("CP_Account_Details: setTFSAList");

			var
				utils = cmp.find("CP_Utils"),
				listArr = cmp.get("v.detailsListArr");

			//Net Contributions
			if (obj.netContributionsYtd != undefined) {
				utils.formatToCurrency(obj.netContributionsYtd, function (formattedValue) {
					cmp.set("v.netContributionsYTD", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Net_Contributions_YTD"),
					"detail": cmp.get("v.netContributionsYTD")
				});
			}

			//Net Redemptions
			if (obj.netTransfersOutYtd != undefined) {
				utils.formatToCurrency(obj.netTransfersOutYtd, function (formattedValue) {
					cmp.set("v.netRedemptionsYTD", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Net_Redemptions_YTD"),
					"detail": cmp.get("v.netRedemptionsYTD")
				});
			}

			//Net Contributions Inception
			if (obj.netContributionsInception != undefined) {
				utils.formatToCurrency(obj.netContributionsInception, function (formattedValue) {
					cmp.set("v.netContributionsInception", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Net_Contributions_Inception"),
					"detail": cmp.get("v.netContributionsInception")
				});
			}

			//Net Contributions Inception
			if (obj.netWithdrawalsInception != undefined) {
				utils.formatToCurrency(obj.netWithdrawalsInception, function (formattedValue) {
					cmp.set("v.netWithdrawalsInception", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Net_Withdrawals_Inception"),
					"detail": cmp.get("v.netContributionsInception")
				});
			}

			//Successor Holder
			if (obj.successorHolderName != undefined) {
				cmp.set("v.successorHolder", obj.successorHolderName);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Successor_Holder"),
					"detail": cmp.get("v.successorHolder")
				});
			}

			//Plan Sponsor
			if (obj.groupSponsorName != undefined) {
				cmp.set("v.planSponsor", obj.groupSponsorName);
				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Plan_Sponsor"),
					"detail": cmp.get("v.planSponsor")
				});
			}
		} catch (err) {
			console.error("CP_Account_Details: setTFSAList");
			console.error(err);
		}
	},
	setRRSPList: function (obj, cmp) {
		try {

			console.info("CP_Account_Details: setRRSPList");

			var
				utils = cmp.find("CP_Utils"),
				listArr = cmp.get("v.detailsListArr");

			//First 60 day contribution amount
			if (obj.first60DayContributionAmount !== undefined) {
				utils.formatToCurrency(obj.first60DayContributionAmount, function (formattedValue) {
					cmp.set("v.first60DayContributionAmount", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_First_60_Day_Contribution"),
					"detail": cmp.get("v.first60DayContributionAmount")
				});
			}

			//Last 10 Month Contribution Amount
			if (obj.last10MonthContributionAmount != undefined) {
				utils.formatToCurrency(obj.last10MonthContributionAmount, function (formattedValue) {
					cmp.set("v.last10MonthContributionAmount", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Last_10_Month_Contribution"),
					"detail": cmp.get("v.last10MonthContributionAmount")
				});
			}

			//Beneficiary Name
			if (obj.beneficiaryName != undefined) {
				cmp.set("v.beneficiaryName", obj.beneficiaryName);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Beneficiary"),
					"detail": cmp.get("v.beneficiaryName")
				});
			}

			//Contributor Spouse Name
			if (obj.contributorSpouseName != undefined) {
				cmp.set("v.contributorSpouseName", obj.contributorSpouseName);
				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Contributor_Spouse_Name"),
					"detail": cmp.get("v.contributorSpouseName")
				});
			}

		} catch (err) {
			console.error("CP_Account_Details: setRRSPList");
			console.error(err);
		}
	},
	setRESPList: function (obj, cmp) {
		try {

			console.info("CP_Account_Details: setRESPList");

			var listArr = cmp.get("v.detailsListArr");

			//YTD Contribution Amount
			if (obj.ytdContributionAmount != undefined) {
				cmp.set("v.ytdContributionAmt", obj.ytdContributionAmount);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_YTD_Contribution_Amount"),
					"detail": cmp.get("v.ytdContributionAmt")
				});
			}

			//CRA Plan Id
			if (obj.craPlanId != undefined) {
				cmp.set("v.craPlanId", obj.craPlanId);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_CRA_Plan_Id"),
					"detail": cmp.get("v.craPlanId")
				});
			}

			//Beneficiary Name
			if (obj.beneficiaryName != undefined) {
				cmp.set("v.beneficiaryName", obj.beneficiaryName);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Beneficiary"),
					"detail": cmp.get("v.beneficiaryName")
				});
			}

		} catch (err) {
			console.error("CP_Account_Details: setRESPList");
			console.error(err);
		}
	},
	setRRIFList: function (obj, cmp) {
		try {

			console.info("CP_Account_Details: setRRIFList");

			var
				utils = cmp.find("CP_Utils"),
				listArr = cmp.get("v.detailsListArr");

			//RRIF YTD Withdrawal Amount
			if (obj.rrifYtdWithdrawalAmount != undefined) {

				utils.formatToCurrency(obj.rrifYtdWithdrawalAmount, function (formattedValue) {

					cmp.set("v.rrifYtdWithdrawalAmount", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_RRIF_YTD_Withdrawal"),
					"detail": cmp.get("v.rrifYtdWithdrawalAmount")
				});
			}

			//RRIF Minimum Withdrawal Amount
			if (obj.rrifMinimumWithdrawalAmount != undefined) {
				utils.formatToCurrency(obj.rrifMinimumWithdrawalAmount, function (formattedValue) {
					cmp.set("v.rrifMinimumWithdrawalAmount", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_RRIF_Minimum_Withdrawal"),
					"detail": cmp.get("v.rrifMinimumWithdrawalAmount")
				});
			}

			//Spousal Contributor Name
			if (obj.spousalContributorName != undefined) {
				utils.formatToCurrency(obj.spousalContributorName, function (formattedValue) {
					cmp.set("v.spousalContributorName", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Spousal_Contributor_Name"),
					"detail": cmp.get("v.spousalContributorName")
				});
			}

		} catch (err) {
			console.error("CP_Account_Details: setRRIFList");
			console.error(err);
		}
	},
	setGroupRRSPList: function (obj, cmp) {
		try {

			console.info("CP_Account_Details: setGroupRRSPList");

			var listArr = cmp.get("v.detailsListArr");

			//Group Sponsor Name
			if (obj.groupSponsorName != undefined) {
				cmp.set("v.groupSponsorName", obj.groupSponsorName);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Group_Sponsor_Name"),
					"detail": cmp.get("v.groupSponsorName")
				});
			}

			//Beneficiary Name
			if (obj.beneficiaryName != undefined) {
				cmp.set("v.beneficiaryName", obj.beneficiaryName);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Beneficiary"),
					"detail": cmp.get("v.beneficiaryName")
				});
			}

			//Contributor Spouse Name
			if (obj.contributorSpouseName != undefined) {
				cmp.set("v.contributorSpouseName", obj.contributorSpouseName);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Contributor_Spouse_Name"),
					"detail": cmp.get("v.contributorSpouseName")
				});
			}

		} catch (err) {
			console.error("CP_Account_Details: setGroupRRSP");
			console.error(err);
		}
	},
	setGifList: function (obj, cmp) {
		try {

			console.info("CP_Account_Details: setGifList");

			var
				utils = cmp.find("CP_Utils"),
				listArr = cmp.get("v.detailsListArr");

			//Policy number
			if (obj.policyNumber != undefined) {
				cmp.set("v.policyNumber", obj.policyNumber);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Policy_Name"),
					"detail": cmp.get("v.policyNumber")
				});
			}

			//Annuitant/Joint annuitant
			if (obj.jointAnnuitantName != undefined) {
				cmp.set("v.jointAnnuitantName", obj.jointAnnuitantName);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Joint_Annuitant_Name"),
					"detail": cmp.get("v.jointAnnuitantName")
				});
			}

			//Lifetime Income Amount
			if (obj.lifetimeIncomeAmount != undefined) {

				utils.formatToCurrency(obj.lifetimeIncomeAmount, function (formattedValue) {
					cmp.set("v.lifetimeIncomeAmount", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Lifetime_Income_Amount"),
					"detail": cmp.get("v.lifetimeIncomeAmount")
				});
			}

			//Minimum Payment Amount
			if (obj.libMinimumAmount != undefined) {

				utils.formatToCurrency(obj.libMinimumAmount, function (formattedValue) {
					cmp.set("v.libMinimumAmount", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Minimum_Payment_Amount"),
					"detail": cmp.get("v.libMinimumAmount")
				});
			}

			//Maturity Guarantee Date
			if (obj.maturityGuaranteeDate != undefined) {

				cmp.set("v.maturityGuaranteeDate", obj.maturityGuaranteeDate);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Maturity_Guarantee_Date"),
					"detail": cmp.get("v.maturityGuaranteeDate")
				});
			}

			//Maturity Guarantee Amount
			if (obj.maturityGuaranteeAmount != undefined) {
				utils.formatToCurrency(obj.maturityGuaranteeAmount, function (formattedValue) {
					cmp.set("v.maturityGuaranteeAmount", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Maturity_Guarantee_Amount"),
					"detail": cmp.get("v.maturityGuaranteeAmount")
				});
			}

			//Death Benefit Guarantee Amount
			if (obj.deathBenefitGuaranteeAmount != undefined) {
				utils.formatToCurrency(obj.deathBenefitGuaranteeAmount, function (formattedValue) {
					cmp.set("v.deathBenefitGuaranteeAmount", formattedValue);
				}, cmp.get("v.lang"), true);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Maturity_Guarantee_Amount"),
					"detail": cmp.get("v.deathBenefitGuaranteeAmount")
				});
			}

			//Guarantee Level
			if (obj.guaranteeLevel != undefined) {
				cmp.set("v.guaranteeLevel", obj.guaranteeLevel);

				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Guarantee_Level"),
					"detail": cmp.get("v.guaranteeLevel")
				});
			}

			//Beneficiary Name
			if (obj.beneficiaryName != undefined) {
				cmp.set("v.beneficiaryName", obj.beneficiaryName);
				listArr.push({
					"label": $A.get("$Label.c.CP_Generic_Label_Beneficiary"),
					"detail": cmp.get("v.beneficiaryName")
				});
			}

		} catch (err) {
			console.error("CP_Account_Details: setGifList");
			console.error(err);
		}
	},
	getAccountType: function (obj, callback) {

		console.info("CP_Account_Details: getAccountType");

		try {
			var
				rrspTypesArr = [2, 9, 19, 20, 24],
				tfsaTypesArr = [16, 25],
				respTypesArr = [4, 5],
				rrifTypesArr = [3, 8, 10, 12, 18, 23],
				rdspTypesArr = [17],
				groupRRSPTypesArr = [21, 22],
				gifTypesArr = [1, 2, 3, 8, 9, 10, 12, 16, 18, 19, 20, 23, 24];



			if (obj.dealerName === "3488") {
				//GIF
				gifTypesArr.forEach(function (val) {
					if (val === parseInt(obj.accountType)) {
						callback("GIF");
						return;
					}
				});
			} else {

				console.info("CP_Account_Details: getAccountType: RRSP");
				//Everything else
				//RRSP
				rrspTypesArr.forEach(function (val) {
					if (val === parseInt(obj.accountType)) {
						callback("RRSP");
						return;
					}
				});

				//GROUP RRSP
				groupRRSPTypesArr.forEach(function (val) {
					if (val === parseInt(obj.accountType)) {
						callback("GROUP_RRSP");
						return;
					}
				});

				//TFSA
				tfsaTypesArr.forEach(function (val) {
					if (val === parseInt(obj.accountType)) {
						callback("TFSA");
						return;
					}
				});

				//RESP
				respTypesArr.forEach(function (val) {
					if (val === parseInt(obj.accountType)) {
						callback("RESP");
						return;
					}
				});

				//RRIF
				rrifTypesArr.forEach(function (val) {
					if (val === parseInt(obj.accountType)) {
						callback("RRIF");
						return;
					}
				});

				//RDSP
				rdspTypesArr.forEach(function (val) {
					if (val === parseInt(obj.accountType)) {
						callback("RDSP");
						return;
					}
				});

			}
		} catch (err) {
			console.error(err);
		}
	}
})