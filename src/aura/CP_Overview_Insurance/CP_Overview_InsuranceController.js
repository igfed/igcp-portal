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
			utils = cmp.find("CP_Utils"),
			bpid = "0002851019";

		services.getInsurancePreview(
			bpid,
			cmp,
			function(previewObj) {

				console.log("Succcess");
				console.log(previewObj);

				var
					insuranceItemsArr = previewObj.previewItemsList,
					insuranceAccountsArr = [];

				if(previewObj.totalCoverageAmount) {
					cmp.set("v.totalCoverageAmount", previewObj.totalCoverageAmount);
				}

				if (insuranceItemsArr.length > 0) {
					utils.forEach(insuranceItemsArr, function(key, value) {
						insuranceAccountsArr.push(value);
					});

					hlpr.addAccounts(insuranceAccountsArr , cmp);

				} else {
					//client doesn't have a mortgage
					//show marketing view
					cmp.set("v.showMarketing", true);
				}
			},
			function(error) {
				console.error("GET INSURANCE PREVIEW");
				console.error(error);
			}
		);
	}
})