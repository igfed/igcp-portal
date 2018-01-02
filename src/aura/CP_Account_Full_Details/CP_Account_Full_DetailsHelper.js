({
	checkForExemptions : function(key, callback) {
		
		var 
			exemptionArr = ["clientBpid", "company"],
			hasKey = false;

		exemptionArr.forEach(function(item){
			if(key === item) {
				hasKey = true;
			}
		});

		if(hasKey === false) {
			callback();
		} 
		
	},
	formatValue: function(utils, key, val, callback) {

		var formattedValue = "";

		if(key === "bookCostCad") {
			//utils.formatToCurrency(val, function(returnedValue) {}, cmp.get("v.lang"));
		}
	}
})