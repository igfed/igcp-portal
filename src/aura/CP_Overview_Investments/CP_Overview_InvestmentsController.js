({
	onInit : function(cmp, evt, hlpr) {

		//Test BPIDs

		// 0003173610
		// 0003192111
		// 0002505866
		// 0003497138

		var 
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils"),
			bpid = "0003497138";

		services.getInvestmentsPreview(
			bpid,
			cmp, 
			function(previewObj) {
				var 
					accountPreviewsObj = previewObj.previewAggregatesByType,
					accountTypeArr = [];
				
				cmp.set("v.totalValue", previewObj.totalValue);
				cmp.set("v.totalGainLoss", previewObj.totalGainLoss);
				cmp.set("v.totalGainLossPercentage", previewObj.percGainLoss);
				cmp.set("v.gainLossType", previewObj.signGainLoss);

				//cycle through account types
				utils.forEach(accountPreviewsObj, function(key, value){
					accountTypeArr.push(value);
				});

				hlpr.addAccounts(accountTypeArr, cmp);

			}, 
			function(error) {
				console.error("GET INVESTMENT PREVIEW");
				console.error(error);
			}
		);
	}
})