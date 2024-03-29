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
					if (previewObj) {
						if (previewObj.asOfDateStr) {
							utils.convertToMDY(previewObj.asOfDateStr, function (obj) {
								cmp.set("v.asOfDate", obj.formattedString);
							}, cmp.get("v.lang"));
						} else {
							cmp.set("v.asOfDate", $A.get("$Label.c.CP_Generic_Not_Available"));
						}

						if (previewObj.totalValue) {
							utils.formatToCurrency(previewObj.totalValue, function (formattedValue) {
								cmp.set("v.totalValue", formattedValue);
							}, cmp.get("v.lang"));
						} else {
							cmp.set("v.totalValue", $A.get("$Label.c.CP_Generic_Not_Available"));
						}

						//Holdings
						if (previewObj.holdings !== "{}") {

							var holdings = JSON.parse(previewObj.holdings.replace(/&quot;/g, '\"'));
							try {

								utils.forEach(holdings, function (key, value) {
									hlpr.addAccounts(key, value, cmp);
								})

							} catch (err) {
								console.error(err);
							}
						} else {
							//show marketing view
							cmp.set("v.showMarketing", true);
						}

						cmp.find("CP_Events").fire("CP_Evt_Loading_Hide", {
							"id": "overview-investments-spinner"
						});

						//FOR NOW WE ARE COMMENTING OUT TOTAL LOSS/GAIN BECAUSE IT IS NOT READY FOR UAT
						// utils.formatToCurrency(previewObj.totalGainLoss, function (formattedValue) {
						// 	cmp.set("v.totalGainLoss", formattedValue);
						// }, cmp.get("v.lang"));

						//cmp.set("v.totalGainLossPercentage", previewObj.percGainLoss);
						//cmp.set("v.gainLossType", previewObj.signGainLoss);
					} else {
						console.warn("CP_Overview_Investments: getInvestmentsPreview: previewObj was null.")
					}
				},
				function (error) {
					console.error("GET INVESTMENT PREVIEW");
					console.error(error);
				}
			);
		} catch (err) {
			console.error('getInvestmentsPreview');
			console.error(err)
		}

		//GET ASSET MIX
		services.getAssetMix(
			cmp,
			function (previewArr) {

				console.info("GET ASSET MIX");
				console.log(previewArr)

				if (previewArr) {

					var graphArr = [];

					previewArr.forEach(function (item, i) {

						if (item.theLabel === "Equity") {
							graphArr.push({ 
								"label": $A.get("$Label.c.CP_Generic_Label_Equity"), 
								"detail" : item.theValue 
							});
						} else if (item.theLabel === "Fixed_Income") {
							graphArr.push({ 
								"label": $A.get("$Label.c.CP_Generic_Label_Fixed_Income"), 
								"detail" : item.theValue 
							});
						} else if (item.theLabel === "Balanced") {
							graphArr.push({ 
								"label": $A.get("$Label.c.CP_Generic_Label_Balanced"), 
								"detail" : item.theValue 
							});
						} else if (item.theLabel === "Cash") {
							graphArr.push({ 
								"label": $A.get("$Label.c.CP_Generic_Label_Cash"), 
								"detail" : item.theValue 
							});
						} else if (item.theLabel === "Specialty") {
							graphArr.push({ 
								"label": $A.get("$Label.c.CP_Generic_Label_Specialty"), 
								"detail" : item.theValue 
							});
						}
					});

					var events = cmp.find("CP_Events");
					events.fire(
						"CP_Evt_Set_Graph", {
							"id": "investments-asset-mix",
							"type": "doughnut",
							"data": graphArr,
							"total": 100
						}
					);
				} else {
					console.warn("CP_Overview_Investments: getAssetMix: previewObj was null.");
				}
			},
			function (error) {
				console.error("Get Asset Mix");
				console.error(error);
			}
		);
	}
})