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
						hlpr.setDetailsList(success, cmp, hlpr);
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
					hlpr.logReturned("Get Holdings", success);

					var
						holdingsArr = success,
						dataArr = [],
						dataObjArr = [];

					holdingsArr.forEach(function (item, i) {

						var bookCost = "", marketValue = "";

						utils.formatToCurrency(item.bookCostCad, function(formattedValue) {
							bookCost = formattedValue;
						}, cmp.get("v.lang"), true);

						utils.formatToCurrency(item.marketValueCad, function(formattedValue) {
							marketValue = formattedValue;
						}, cmp.get("v.lang"), true);

						dataArr.push([item.productName, (item.marketValuePerc + "%"), bookCost, marketValue]);
						dataObjArr.push(item);
					});

					events.fire(
						"CP_Evt_Set_Table", {
							"id": "holdings-table",
							"headers": [
								$A.get("$Label.c.CP_Generic_Label_Name"),
								$A.get("$Label.c.CP_Generic_Label_Percentage"),
								$A.get("$Label.c.CP_Generic_Label_Book_Cost"),
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

					if (success !== null) {
						var
							openingValues = [
								hlpr.handleBarValue(success.openingValueYtd),
								hlpr.handleBarValue(success.openingValue1Yr),
								hlpr.handleBarValue(success.openingValue3Yr),
								hlpr.handleBarValue(success.openingValue5Yr),
								hlpr.handleBarValue(success.openingValueInception)
							],
							closingValues = [
								hlpr.handleBarValue(success.closingValueYtd),
								hlpr.handleBarValue(success.closingValue1Yr),
								hlpr.handleBarValue(success.closingValue3Yr),
								hlpr.handleBarValue(success.closingValue5Yr),
								hlpr.handleBarValue(success.closingValueInception)
							],
							dataObj = {
								"labels": [
									$A.get("$Label.c.CP_Generic_Label_YTD"),
									$A.get("$Label.c.CP_Generic_Label_1yr"),
									$A.get("$Label.c.CP_Generic_Label_3yr"),
									$A.get("$Label.c.CP_Generic_Label_5yr"),
									$A.get("$Label.c.CP_Generic_Label_Since"),
								],
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
					}
				},
				function (error) {
					console.error("Account Performance");
					console.error(error);
				}
			);
		});
	}
})