({
	onInit: function(cmp, evt, hlpr) {
	
			//1210728500
			var
				mortgageNumber = "1210728500",
				services = cmp.find("CP_Services"),
				utils = cmp.find("CP_Utils"),
				events = cmp.find("CP_Events");
	
			utils.getURLParams(function(params) {
				if (params.language) {
					cmp.set("v.lang", params.language);
				}
			});

			services.getMortgageDetail(
				mortgageNumber,
				cmp, 
				function(success){
					console.log("SUCCESSS");
					console.log(success);

					hlpr.setAttr("v.payment", success.paymentAmount, cmp);
					hlpr.setAttr("v.frequency", success.paymentFrequency, cmp);
					hlpr.setAttr("v.lastPaymentDate", success.paymentFrequency, cmp);

				},
				function(error) {
					console.error("CP_Mortgage_Details");
					console.log(error);
				}
			);
			

			events.fire(
				"CP_Evt_Set_List", {
					"id": "mortgage-list",
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
						},
						{
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
		},
		doneRendering: function(cmp, evt, hlpr) {
			var body = document.querySelector("body");
			body.className = "igcp-background__tiled igcp-utils__display--block";
		}
	})