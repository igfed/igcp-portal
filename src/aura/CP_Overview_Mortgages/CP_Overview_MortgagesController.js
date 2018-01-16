({
	onInit: function (cmp, evt, hlpr) {

		var
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils");

		services.getMortgagePreview(
			cmp,
			function (previewObj) {

				if (previewObj) {
					var
						mortgageItemsArr = previewObj.previewItemsList,
						mortgageAccountsArr = [];

					if (previewObj.totalLoanAmount) {
						cmp.set("v.totalLoanAmount", previewObj.totalLoanAmount);
					}

					if (mortgageItemsArr.length > 0) {
						utils.forEach(mortgageItemsArr, function (key, value) {
							mortgageAccountsArr.push(value);
						});

						hlpr.addAccounts(mortgageAccountsArr, cmp);

					}
					
					cmp.find("CP_Events").fire("CP_Evt_Loading_Hide", {
						"id": "overview-mortgages-spinner"
					});
				} else {
					
						//client doesn't have a mortgage
						//show marketing view
						cmp.set("v.showMarketing", true);
						cmp.find("CP_Events").fire("CP_Evt_Loading_Hide", {
							"id": "overview-mortgages-spinner"
						});
					
					console.warn("CP_Overview_Mortgages: getMortgagePreview: previewObj was null.");
				}
			},
			function (error) {
				console.error("GET MORTGAGE PREVIEW");
				console.error(error);
			}
		);
	}
})