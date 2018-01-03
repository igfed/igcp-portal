({
	checkForExemptions: function (key, callback) {

		var
			exemptionArr = ["clientBpid", "company", "gainLossCad", "productName"],
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
		try {

			console.info(key);

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
				//Client Number
				callback($A.get("$Label.c.CP_Generic_Label_Client_Number"), val);
			} else if(key === "consultantNumber") {
				//Consultant Number
				callback($A.get("$Label.c.CP_Generic_Label_Consultant_Number"), val);
			} else if(key === "fundName") {
				//Fund Name
				callback($A.get("$Label.c.CP_Generic_Label_Fund_Name"), val);
			} else if(key === "fundNumber") {
				//Fund Number
				callback($A.get("$Label.c.CP_Generic_Label_Fund_Number"), val);
			} else if(key === "holdingNumber") {
				//Holding Number
				callback($A.get("$Label.c.CP_Generic_Label_Holding_Number"), val);
			} else if(key === "loadType") {
				//Fund Load Type
				callback($A.get("$Label.c.CP_Generic_Label_Fund_Load_Type"), val);
			} else if(key === "marketValueCad") {
				//Market Value
				cmp.find("CP_Utils").formatToCurrency(val.toString(), function (returnedValue) {
					callback($A.get("$Label.c.CP_Generic_Label_Market_Value"), returnedValue);
				}, cmp.get("v.lang"), true);
			} else if(key === "marketValuePerc") {
				//Holding %
				cmp.find("CP_Utils").formatPercentage(val.toString(), function (returnedValue) {
					callback($A.get("$Label.c.CP_Generic_Label_Holding_Percent"), returnedValue);
				}, cmp.get("v.lang"), true);
			} else if(key === "reportingDate") {
				//Reporting Date
				callback($A.get("$Label.c.CP_Generic_Label_Reporting_Date"), val);
			} else if(key === "series") {
				//Series
				callback($A.get("$Label.c.CP_Generic_Label_Series"), val);
			} else if(key === "settledUnits") {
				//Settled Units
				callback($A.get("$Label.c.CP_Generic_Label_Settled_Units"), val);
			} else if(key === "totalContributedAmount") {
				//Total Contributed Amount
				cmp.find("CP_Utils").formatToCurrency(val.toString(), function (returnedValue) {
					callback($A.get("$Label.c.CP_Generic_Label_Total_Contributed_Amount"), returnedValue);
				}, cmp.get("v.lang"), true);
			} else if(key === "totalDistributedAmount") {
				//Total Distributed Amount
				cmp.find("CP_Utils").formatToCurrency(val.toString(), function (returnedValue) {
					callback($A.get("$Label.c.CP_Generic_Label_Total_Distributed_Amount"), returnedValue);
				}, cmp.get("v.lang"), true);
			} else if(key === "totalRedeemedAmount") {
				//Total Redeemed Amount
				cmp.find("CP_Utils").formatToCurrency(val.toString(), function (returnedValue) {
					callback($A.get("$Label.c.CP_Generic_Label_Total_Redeemed_Amount"), returnedValue);
				}, cmp.get("v.lang"), true);
			} else if(key === "totalReinvestedAmount") {
				//Total Reinvested Amount
				cmp.find("CP_Utils").formatToCurrency(val.toString(), function (returnedValue) {
					callback($A.get("$Label.c.CP_Generic_Label_Total_Reinvested_Amount"), returnedValue);
				}, cmp.get("v.lang"), true);
			} 
		} catch (err) {
			console.error("CP_Account_Full_Details: helper: formatValue");
			console.error(err);
		}
	}
})