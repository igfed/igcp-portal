({
	onInit: function (cmp, evt, hlpr) {

		var
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils");

		try {
		//GET INVESTMENT PREVIEW
		services.getInvestmentsPreview(
			cmp,
			function (previewObj) {

				var
					accountPreviewsObj = previewObj.previewAggregatesByTypeAndReg,
					accountTypeArr = [];

				utils.convertToMDY(previewObj.asOfDate, function (obj) {
					cmp.set("v.asOfDate", obj.formattedString);
				});

				utils.formatToCurrency(previewObj.totalValue, function (formattedValue) {
					cmp.set("v.totalValue", formattedValue);
				}, cmp.get("v.lang"));

				//FOR NOW WE ARE COMMENTING OUT TOTAL LOSS/GAIN BECAUSE IT IS NOT READY FOR UAT
				// utils.formatToCurrency(previewObj.totalGainLoss, function (formattedValue) {
				// 	cmp.set("v.totalGainLoss", formattedValue);
				// }, cmp.get("v.lang"));

				//cmp.set("v.totalGainLossPercentage", previewObj.percGainLoss);
				//cmp.set("v.gainLossType", previewObj.signGainLoss);

				//cycle through account types
				//Group them according to dealername and registration type
				utils.forEachSort(accountPreviewsObj, function (key, value) {

					accountTypeArr.push(value);

					// try {
					// 	services.getInvestmentsPreviewRegistered(
					// 		key,
					// 		cmp,
					// 		function (success) {
					// 			try {

					// 				if (success !== null) {
					// 					var safeDealerName = success.dealerName.split(" ").join("_").split(".").join("");
					// 					sortedAccountObj[safeDealerName] = { "REGISTERED" : success.previewItems };
					// 				}
					// 			} catch (err) {
					// 				console.error(err);
					// 			}
					// 		},
					// 		function (error) {
					// 			console.error(error);
					// 		}
					// 	);
					// } catch (err) {
					// 	console.error(err);
					// }

					// try {
					// 	services.getInvestmentsPreviewNonRegistered(
					// 		key,
					// 		cmp,
					// 		function (success) {
					// 			try {
					// 				if (success !== null) {
					// 					var safeDealerName = success.dealerName.split(" ").join("_").split(".").join("");

					// 					sortedAccountObj[safeDealerName]["UNREGISTERED"] = success.previewItems;
					// 				}
					// 			} catch (err) {
					// 				console.error(err);
					// 			}
					// 		},
					// 		function (error) {
					// 			console.error(error);
					// 		}
					// 	);
					// } catch (err) {
					// 	console.error(err);
					// }
				});

				hlpr.addAccounts(accountTypeArr, cmp);

				cmp.find("CP_Events").fire("CP_Evt_Loading_Hide", {
					"id": "overview-investments-spinner"
				});

			},
			function (error) {
				console.error("GET INVESTMENT PREVIEW");
				console.error(error);
			}
		);
	}catch(err) {
		console.error('getInvestmentsPreview');
		console.error(err)
	}

		//GET ASSET MIX
		services.getAssetMix(
			cmp,
			function (previewObj) {

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
					"CP_Evt_Set_Graph", {
						"id": "investments-asset-mix",
						"type": "doughnut",
						"data": graphArr,
						"total": previewObj.totalAllAmounts
					}
				);
			},
			function (error) {
				console.error("Get Asset Mix");
				console.error(error);
			}
		);
	}
})