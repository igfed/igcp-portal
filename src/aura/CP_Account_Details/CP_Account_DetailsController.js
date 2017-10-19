({
	onInit: function (cmp, evt, hlpr) {

		var
			accountNumber = "13460563",
			services = cmp.find("CP_Services"),
			events = cmp.find("CP_Events");

		services.getAccountDetail(
			accountNumber,
			cmp,
			function (success) {
				console.log("*******");
				console.log("Get Account Detail");
				console.log(success);
				console.log("*******");

				cmp.set("v.accountDetailObj", success);
			},
			function (error) {
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
				console.error(error);
			}
		);

		services.getHoldings(
			accountNumber,
			cmp,
			function (success) {
				console.log("*******");
				console.log("Get Holdings");
				console.log(success);
				console.log("*******");

				cmp.set("v.holdingsArr", success);

				var holdings = {
					headers: ['Name', 'Holding', 'Book Cost', 'Gain / Loss', 'Market Value'],
					title: 'Holdings',
					records: success
				}

				cmp.set("v.holdingsObj", holdings);

			},
			function (error) {
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
			},
			function (error) {
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
			},
			function (error) {
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
	doneRendering: function (cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-background__tiled igcp-utils__display--block";
	}
})