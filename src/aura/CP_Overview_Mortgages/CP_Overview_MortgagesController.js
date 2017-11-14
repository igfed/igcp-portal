({
	onInit: function(cmp, evt, hlpr) {

		//Test BPIDs

		//Investments
		// 0003173610
		// 0003192111
		// 0002505866
		// 0003497138

		//Mortgage
		// 0001000265
		// 0003175434
		// 0001315943

		//Insurance
		// 0002851019
		// 0003218014
		// 0003175434
		// 0001315943
		// 0002229839

		var
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils");

		services.getMortgagePreview(
			cmp,
			function(previewObj) {

				var
					mortgageItemsArr = previewObj.previewItemsList,
					mortgageAccountsArr = [];

				if(previewObj.totalLoanAmount) {
					cmp.set("v.totalLoanAmount", previewObj.totalLoanAmount);
				}

				if (mortgageItemsArr.length > 0) {
					utils.forEach(mortgageItemsArr, function(key, value) {
						mortgageAccountsArr.push(value);
					});

					hlpr.addAccounts(mortgageAccountsArr , cmp);

				} else {
					//client doesn't have a mortgage
					//show marketing view
					cmp.set("v.showMarketing", true);
				}


				cmp.find("CP_Events").fire("CP_Evt_Loading_Hide", { "id" : "overview-mortgages-spinner" });
			},
			function(error) {
				console.error("GET MORTGAGE PREVIEW");
				console.error(error);
			}
		);
	}
})