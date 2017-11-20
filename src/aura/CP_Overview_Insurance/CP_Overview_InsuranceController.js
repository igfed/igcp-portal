({
	onInit: function (cmp, evt, hlpr) {

		cmp.find("CP_Services").getInsurancePreview(
			cmp,
			function (previewObj) {
				var
					insuranceItemsArr = previewObj.previewItemsList,
					insuranceAccountsArr = [];

				if (previewObj.totalCoverageAmount) {
					cmp.set("v.totalCoverageAmount", previewObj.totalCoverageAmount);
				}

				if (insuranceItemsArr.length > 0) {
					cmp.find("CP_Utils").forEach(insuranceItemsArr, function (key, value) {
						insuranceAccountsArr.push(value);
					});

					hlpr.addAccounts(insuranceAccountsArr, cmp);

				} else {
					//client doesn't have a mortgage
					//show marketing view
					cmp.set("v.showMarketing", true);
				}

				cmp.find("CP_Events").fire("CP_Evt_Loading_Hide", {
					"id": "overview-insurance-spinner"
				});
			},
			function (error) {
				console.error("GET INSURANCE PREVIEW");
				console.error(error);
			}
		);
	}
})