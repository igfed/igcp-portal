({
	onInit: function (cmp, evt, hlpr) {

		//180030728
		//13460563

		var
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils"),
			events = cmp.find("CP_Events");

		utils.getURLParams(function (params) {
			if (params.language) {
				cmp.set("v.lang", params.language);
			}

			if (params.accEnc) {
				cmp.set("v.accountNumberEnc", params.accEnc);
			} else {
				console.warn("CP_Account: No account number passed.");
			}
		});

		utils.waitForDefined(cmp, "v.accountNumberEnc", function () {

			hlpr.logReturned("Account Number Enc", cmp.get("v.accountNumberEnc"));

			services.getAccountDetail(
				cmp.get("v.accountNumberEnc"),
				cmp,
				function (success) {
					hlpr.logReturned("Get Account Detail", success);

					if (success) {

						hlpr.setGeneralOverview(success, cmp);

						hlpr.setDetailsList(success, cmp);
					}
				},
				function (error) {
					console.error("Account Detail");
					console.error(error);
				}
			);

			services.getInvestmentProfile(
				cmp.get("v.accountNumberEnc"),
				cmp,
				function (success) {
					//hlpr.logReturned("Get Investment Profile", success);
					cmp.set("v.investmentProfileObj", success);
				},
				function (error) {
					console.error("Investment Profile");
					console.error(error);
				}
			);

			services.getHoldings(
				cmp.get("v.accountNumberEnc"),
				cmp,
				function (success) {
					//hlpr.logReturned("Get Holdings", success);

					var
						holdingsArr = success,
						dataArr = [],
						dataObjArr = [];

					holdingsArr.forEach(function (item, i) {
						dataArr.push([item.productName, item.holdingNumber, "N/A", "N/A", item.marketValueCad]);
						dataObjArr.push(item);

					});

					events.fire(
						"CP_Evt_Set_Table", {
							"id": "holdings-table",
							"headers": [
								$A.get("$Label.c.CP_Generic_Label_Name"),
								$A.get("$Label.c.CP_Generic_Label_Holding"),
								$A.get("$Label.c.CP_Generic_Label_Book_Cost"),
								$A.get("$Label.c.CP_Generic_Label_Change"),
								$A.get("$Label.c.CP_Generic_Label_Market_Value")
							],
							"data": dataArr,
							"dataObj": dataObjArr
						}
					);
				},
				function (error) {
					console.error("Get Holdings");
					console.error(error);
				}
			);

			services.getTransactions(
				cmp.get("v.accountNumberEnc"),
				cmp,
				function (success) {
					//hlpr.logReturned("Get Transactions", success);

					var
						transactionsArr = success,
						dataArr = [],
						dataObjArr = [];

					transactionsArr.forEach(function (item, i) {
						dataArr.push([]);
						dataObjArr.push(item);
					});

					events.fire(
						"CP_Evt_Set_Table", {
							"id": "transactions-table",
							"headers": [
								$A.get("$Label.c.CP_Generic_Label_Date"),
								$A.get("$Label.c.CP_Generic_Label_Name"),
								$A.get("$Label.c.CP_Generic_Label_Activity"),
								$A.get("$Label.c.CP_Generic_Label_Unit_Price"),
								$A.get("$Label.c.CP_Generic_Label_Quantity"),
								$A.get("$Label.c.CP_Generic_Label_Amount")
							],
							"data": dataArr,
							"dataObj": dataObjArr
						}
					);
				},
				function (error) {
					console.error("Transactions");
					console.error(error);
				}
			);

			services.getInstructions(
				cmp.get("v.accountNumberEnc"),
				cmp,
				function (success) {
					//hlpr.logReturned("Get Instructions", success);

					var
						instructionsArr = success,
						dataArr = [],
						dataObjArr = [];

					instructionsArr.forEach(function (item, i) {
						dataArr.push([]);
						dataObjArr.push(item);
					});

					events.fire(
						"CP_Evt_Set_Table", {
							"id": "instructions-table",
							"headers": [
								$A.get("$Label.c.CP_Generic_Label_Date"),
								$A.get("$Label.c.CP_Generic_Label_Name"),
								$A.get("$Label.c.CP_Generic_Label_Activity"),
								$A.get("$Label.c.CP_Generic_Label_Frequency"),
								$A.get("$Label.c.CP_Generic_Label_Amount")
							],
							"data": dataArr,
							"dataObj": dataObjArr
						}
					);
				},
				function (error) {
					console.error("Instructions");
					console.error(error);
				}
			);

			services.getAccountPerformance(
				cmp.get("v.accountNumberEnc"),
				cmp,
				function (success) {
					hlpr.logReturned("Get Account Performance", success);

					var
						openingValues = [
							success.openingValueYtd,
							success.openingValue1Yr,
							success.openingValue3Yr,
							success.openingValue5Yr,
							success.openingValueInception
						],
						closingValues = [
							success.closingValueYtd,
							success.closingValue1Yr,
							success.closingValue3Yr,
							success.closingValue5Yr,
							success.closingValueInception
						],
						dataObj = {
							"labels": ["YTD", "1yr", "3yr", "5yr", "Since"],
							"datasets": [{
								"label": $A.get("$Label.c.CP_Generic_Label_Opening_Value"),
								"backgroundColor": "#1d5076",
								"data": openingValues
							}, {
								"label": $A.get("$Label.c.CP_Generic_Label_Closing_Value"),
								"backgroundColor": "#4dede7",
								"data": closingValues
							}]
						};

					events.fire(
						"CP_Evt_Set_Graph", {
							"id": "account-details-performance-chart",
							"data": dataObj
						});
				},
				function (error) {
					console.error("Account Performance");
					console.error(error);
				}
			);
		});
	},
	doneRendering: function (cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-background__tiled igcp-utils__display--block";
	}
})