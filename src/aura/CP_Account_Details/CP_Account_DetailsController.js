({
	onInit: function (cmp, evt, hlpr) {

		//180030728
		//13460563

		var
			accountNumber = "180030728",
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils"),
			events = cmp.find("CP_Events");

		utils.getURLParams(function (params) {
			if (params.language) {
				cmp.set("v.lang", params.language);
			}
		});

		services.getAccountDetail(
			accountNumber,
			cmp,
			function (success) {
				console.log("*******");
				console.log("Get Account Detail");
				console.log(success);
				console.log("*******");

				cmp.set("v.accountDetailObj", success);

				try {
					utils.formatToCurrency(success.marketValueCad, function (returnedValue) {
						cmp.set("v.marketValue", returnedValue);
					}, cmp.get("v.lang"));
				} catch (err) {

				}

				cmp.set("v.gainLossPercentage", "N/A");
				cmp.set("v.change", "N/A");
			},
			function (error) {
				console.error("Account Detail");
				console.error(error);
			}
		);

		services.getInvestmentProfile(
			accountNumber,
			cmp,
			function (success) {
				console.log("*******");
				console.log("Get Investment Profile");
				console.log(success);
				console.log("*******");
				cmp.set("v.investmentProfileObj", success);
			},
			function (error) {
				console.error("Investment Profile");
				console.error(error);
			}
		);

		services.getHoldings(
			accountNumber,
			cmp,
			function (success) {
				console.log("############");
				console.log("Get Holdings");
				console.log(success);
				console.log("############");

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
			accountNumber,
			cmp,
			function (success) {
				console.log("*******");
				console.log("Get Transactions");
				console.log(success);
				console.log("*******");

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
			accountNumber,
			cmp,
			function (success) {
				console.log("*******");
				console.log("Get Instructions");
				console.log(success);
				console.log("*******");

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
			accountNumber,
			cmp,
			function (success) {
				console.log("*******");
				console.log("Get Account Performance");
				console.log(success);
				console.log("*******");
			},
			function (error) {
				console.error("Account Performance");
				console.error(error);
			}
		);

		events.fire(
			"CP_Evt_Set_List", {
				"id": "account-list",
				"values": [{
					label: $A.get("$Label.c.CP_Generic_Label_Balance_Date"),
					detail: 'Apr 13, 2017'
				},
				{
					label: $A.get("$Label.c.CP_Generic_Label_Book_Cost"),
					detail: '$153,954.57'
				},
				{
					label: $A.get("$Label.c.CP_Generic_Label_YTD_Contribution"),
					detail: '$3,500.00'
				},
				{
					label: $A.get("$Label.c.CP_Generic_Label_RESP_Benificiary_Name"),
					detail: 'Jamie Holmes'
				},
				{
					label: $A.get("$Label.c.CP_Generic_Label_Net_Contributions"),
					detail: '$10,393.43'
				},
				{
					label: $A.get("$Label.c.CP_Generic_Label_2016_Contributions"),
					detail: '$1,594.25'
				},
				{
					label: $A.get("$Label.c.CP_Generic_Label_2017_Contributions"),
					detail: '$6,430.00'
				}
				]
			}
		);

		events.fire(
			"CP_Evt_Set_Graph", {
				"id": "account-details-performance-chart"
			});
	},
	doneRendering: function (cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-background__tiled igcp-utils__display--block";
	}
})