({
	onInit: function(cmp, evt, hlpr) {

		var
			services = cmp.find("CP_Services"),
			events = cmp.find("CP_Events");

		services.getInvestmentProfile(
			"13460563",
			cmp,
			function(success) {
				cmp.set("v.investmentProfileObj", success);
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