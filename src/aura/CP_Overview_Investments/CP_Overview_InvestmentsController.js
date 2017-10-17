({
	onInit: function(cmp, evt, hlpr) {

		//Test BPIDs

		// 0003173610
		// 0003192111
		// 0002505866
		// 0003497138

		var
			events = cmp.find("CP_Events"),
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils"),
			bpid = "0003497138";


		//GET INVESTMENT PREVIEW
		services.getInvestmentsPreview(
			bpid,
			cmp,
			function(previewObj) {

				var
					accountPreviewsObj = previewObj.previewAggregatesByTypeAndReg,
					accountTypeArr = [];

				utils.formatToCurrency(previewObj.totalValue, function(formattedValue) {
					cmp.set("v.totalValue", formattedValue);
				}, cmp.get("v.lang"));

				utils.formatToCurrency(previewObj.totalGainLoss, function(formattedValue) {
					cmp.set("v.totalGainLoss", formattedValue);
				}, cmp.get("v.lang"));

				cmp.set("v.totalGainLossPercentage", previewObj.percGainLoss);
				cmp.set("v.gainLossType", previewObj.signGainLoss);

				//cycle through account types
				utils.forEach(accountPreviewsObj, function(key, value) {
					accountTypeArr.push(value);
				});

				console.log(accountTypeArr);

				hlpr.addAccounts(accountTypeArr, cmp);

			},
			function(error) {
				console.error("GET INVESTMENT PREVIEW");
				console.error(error);
			}
		);

		//GET ASSET MIX
		services.getAssetMix(
			bpid,
			cmp,
			function(previewObj) {

				var graphArr = [{
						"label": $A.get("$Label.c.CP_Generic_Label_Cash"),
						"detail": previewObj.totalCashAmount

					},
					{
						"label": $A.get("$Label.c.CP_Generic_Label_Fixed_Income"),
						"detail": previewObj.totalFixedIncomeAmount

					},
					{
						"label": $A.get("$Label.c.CP_Generic_Label_Balanced"),
						"detail": previewObj.totalBalancedAmount

					},
					{
						"label": $A.get("$Label.c.CP_Generic_Label_Equity"),
						"detail": previewObj.totalEquityAmount

					},
					{
						"label": $A.get("$Label.c.CP_Generic_Label_Specialty"),
						"detail": previewObj.totalSpecialtyAmount

					}
				];

				var events = cmp.find("CP_Events");
				events.fire(
					"CP_Evt_Set_Doughnut",
					{
						"id" : "investments-asset-mix",
						"type" : "doughnut",
						"data" : graphArr,
						"total" : previewObj.totalAllAmounts
					}
				);
			},
			function(error) {
				console.error("Get Asset Mix");
				console.error(error);
			}
		);
	}
})