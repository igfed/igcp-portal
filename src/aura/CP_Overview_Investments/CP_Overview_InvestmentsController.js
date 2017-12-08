({
	onInit: function(cmp, evt, hlpr) {

		var
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils");

		//GET INVESTMENT PREVIEW
		services.getInvestmentsPreview(
			cmp,
			function(previewObj) {

				console.log(previewObj);

				var
					accountPreviewsObj = previewObj.previewAggregatesByTypeAndReg,
					accountTypeArr = [];

				utils.convertToMDY(previewObj.asOfDate, function(obj){
					cmp.set("v.asOfDate", obj.formattedString);
				});

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

				hlpr.addAccounts(accountTypeArr, cmp);

			},
			function(error) {
				console.error("GET INVESTMENT PREVIEW");
				console.error(error);
			}
		);

		//GET ASSET MIX
		services.getAssetMix(
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
					"CP_Evt_Set_Graph",
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