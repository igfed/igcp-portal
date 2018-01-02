({
	checkForExemptions: function (key, callback) {

		var
			exemptionArr = ["clientBpid", "company"],
			hasKey = false;

		exemptionArr.forEach(function (item) {
			if (key === item) {
				hasKey = true;
			}
		});

		if (hasKey === false) {
			callback();
		}

	},
	formatValue: function (cmp, key, val, callback) {

		var formattedValue = "";

		try {
			if (key === "accountNumber") {
				//Account Number
				callback($A.get("$Label.c.CP_Generic_Label_Account_Number"), val);
			} else if (key === "asOfDate") {
				//As Of Date
				callback($A.get("$Label.c.CP_Generic_Label_As_Of_Date"), val);
			} else if (key === "bookCostCad") {
				//Book Cost
				cmp.find("CP_Utils").formatToCurrency(val.toString(), function (returnedValue) {
					callback($A.get("$Label.c.CP_Generic_Label_Book_Cost"), returnedValue);
				}, cmp.get("v.lang"), true);
			} else if (key === "calcPrice") {
				//Current Price
				cmp.find("CP_Utils").formatToCurrency(val.toString(), function (returnedValue) {
					callback($A.get("$Label.c.CP_Generic_Label_Current_Price"), returnedValue);
				}, cmp.get("v.lang"), true);
			} else if(key === "clientNumber") {

			} else if(key === "consultantNumber") {

			} else if(key === "") {

			} else if(key === "") {

			} else if(key === "") {

			} else if(key === "") {

			} else if(key === "") {

			} else if(key === "") {

			} else if(key === "") {

			}
		} catch (err) {
			console.error("CP_Account_Full_Details: helper: formatValue");
			console.error(err);
		}
	}
})