({
	onInit: function (cmp, evt, hlpr) {

		var
			utils = cmp.find("CP_Utils"),
			accounts = cmp.get("v.accounts");

		// console.log("******************")
		// console.log("Account GROUP");
		// console.log(groupTitle);

		utils.forEach(accounts, function (key, val) {

			var
				totalValue = "",
				registrationType = "";

			utils.formatToCurrency(val.totalValue, function (formattedValue) {
				if (cmp.get("v.lang") === "en_US" || cmp.get("v.lang") === "en_CA") {
					formattedValue = "$" + formattedValue;
				} else if (cmp.get("v.lang") === "fr_CA") {
					formattedValue = formattedValue + " $";
				} else {
					formattedValue = "$" + formattedValue;
				}
				totalValue = formattedValue;
			}, cmp.get("v.lang"));

			if (key === "REGISTERED") {
				registrationType = $A.get("$Label.c.CP_Generic_Label_Registered");
			} else if (key === "NON-REGISTERED") {
				registrationType = $A.get("$Label.c.CP_Generic_Label_Non_Registered");
			}

			utils.createComponent(
				"CP_Overview_Account", {
					"accountType": registrationType,
					"accountTotal": totalValue,
					"accounts": val.previewItems,
					"lang": cmp.get("v.lang")
				},
				cmp,
				function (evt) {}
			);
		})

		// console.log("******************")
	}
})