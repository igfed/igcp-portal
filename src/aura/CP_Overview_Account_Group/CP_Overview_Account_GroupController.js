({
	onInit: function (cmp, evt, hlpr) {

		try {

			var
				utils = cmp.find("CP_Utils"),
				accounts = cmp.get("v.accounts"),
				regNonRegTotal = 0,
				regNonRegTotalFormatted = "";

			utils.forEach(accounts, function (key, val) {

				var
					totalValue = 0,
					formattedValue = "",
					registrationType = "";

				val.forEach(function (item, i) {
					totalValue += item.marketValue;
					regNonRegTotal += item.marketValue;
				});

				utils.formatToCurrency(totalValue, function (val) {
					if (cmp.get("v.lang") === "en_US" || cmp.get("v.lang") === "en_CA") {
						formattedValue = "$" + val;
					} else if (cmp.get("v.lang") === "fr_CA") {
						formattedValue = val + " $";
					} else {
						formattedValue = "$" + val;
					}
				}, cmp.get("v.lang"));

				if (key === "REGISTERED") {
					registrationType = $A.get("$Label.c.CP_Generic_Label_Registered");
				} else if (key === "NON-REGISTERED") {
					registrationType = $A.get("$Label.c.CP_Generic_Label_Non_Registered");
				}

				utils.createComponent(
					"CP_Overview_Account", {
						"accountType": registrationType,
						"accountTotal": formattedValue,
						"accounts": val,
						"lang": cmp.get("v.lang")
					},
					cmp,
					function (evt) {}
				);
			});

			utils.formatToCurrency(regNonRegTotal, function (val) {
				if (cmp.get("v.lang") === "en_US" || cmp.get("v.lang") === "en_CA") {
					regNonRegTotalFormatted = "$" + val;
				} else if (cmp.get("v.lang") === "fr_CA") {
					regNonRegTotalFormatted = val + " $";
				} else {
					regNonRegTotalFormatted = "$" + val;
				}
			}, cmp.get("v.lang"));

			cmp.set("v.accountGrandTotal", regNonRegTotalFormatted);

			// console.log("******************")
		} catch (err) {
			console.error(err);
		}
	}
})