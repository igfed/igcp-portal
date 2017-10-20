({
	onInit: function(cmp, evt, hlpr) {

		var
			accountNumber = "13460563",
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils"),
			events = cmp.find("CP_Events");

		utils.getURLParams(function(params) {
			if (params.language) {
				cmp.set("v.lang", params.language);
			}
		});

		services.getAccountDetail(
			accountNumber,
			cmp,
			function(success) {
				console.log("*******");
				console.log("Get Account Detail");
				console.log(success);
				console.log("*******");

				cmp.set("v.accountDetailObj", success);

				try {
					utils.formatToCurrency(success.marketValueCad, function(returnedValue) {
						cmp.set("v.marketValue", returnedValue);
					}, cmp.get("v.lang"));
				} catch (err) {

				}

				cmp.set("v.gainLossPercentage", "N/A");
				cmp.set("v.change", "N/A");
			},
			function(error) {
				console.error(error);
			}
		);

		services.getInvestmentProfile(
			accountNumber,
			cmp,
			function(success) {
				console.log("*******");
				console.log("Get Investment Profile");
				console.log(success);
				console.log("*******");
				cmp.set("v.investmentProfileObj", success);
			},
			function(error) {
				console.error(error);
			}
		);

		services.getHoldings(
			accountNumber,
			cmp,
			function(success) {
				console.log("############");
				console.log("Get Holdings");
				console.log(success);
				console.log("############");

				// var holdings = {
				// 	headers: ['Name', 'Holding', 'Book Cost', 'Gain / Loss', 'Market Value'],
				// 	title: 'Holdings',
				// 	records: success
				// }

				// cmp.set("v.holdingsObj", holdings);

			},
			function(error) {
				events.fire(
					"CP_Evt_Set_Table", {
						"id": "holdings-table",
						"headers": ["Name", "Holding", "Book Cost", "Gain / Loss", "Market Value"],
						"title": "Holdings",
						"data": [
							["Account 1", "32.7", "15034.56", "5.3", "18000.67" ],
							["Account 2", "34.3", "1214.56", "5.6", "124420.67" ],
							["Account 3", "14.7", "15034.56", "4.3", "5400.67" ]
						]
					}
				);
			}
		);

		services.getTransactions(
			accountNumber,
			cmp,
			function(success) {
				console.log("*******");
				console.log("Get Transactions");
				console.log(success);
				console.log("*******");
			},
			function(error) {
				console.error(error);
			}
		);

		services.getInstructions(
			accountNumber,
			cmp,
			function(success) {
				console.log("*******");
				console.log("Get Instructions");
				console.log(success);
				console.log("*******");
			},
			function(error) {
				console.error(error);
			}
		);

		services.getAccountPerformance(
			accountNumber,
			cmp,
			function(success) {
				console.log("*******");
				console.log("Get Account Performance");
				console.log(success);
				console.log("*******");
			},
			function(error) {
				console.error(error);
			}
		);

		events.fire(
			"CP_Evt_Set_List", {
				"id": "account-list-1",
				"values": [{
						label: 'Balance Date',
						detail: 'Apr 13, 2017'
					},
					{
						label: 'Book Cost',
						detail: '$153,954.57'
					},
					{
						label: 'YTD Contribution',
						detail: '$3,500.00'
					},
					{
						label: 'RESP Benificiary Name',
						detail: 'Jamie Holmes'
					}
				]
			}
		);

		events.fire(
			"CP_Evt_Set_List", {
				"id": "account-list-2",
				"values": [{
						label: 'Net Contributions',
						detail: '$10,393.43'
					},
					{
						label: '2016 Contributions',
						detail: '$1,594.25'
					},
					{
						label: '2017 Contributions',
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
	doneRendering: function(cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-background__tiled igcp-utils__display--block";
	}
})