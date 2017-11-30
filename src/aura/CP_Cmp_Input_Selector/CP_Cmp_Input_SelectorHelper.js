({
	arrayContainsOpt: function(array, opt) {
		// var utils = cmp.find("CP_Utils");

		// return utils.arrayContains(array, opt, function(hasValue) {
		// 	return hasValue;
		// });
	},
	setValidStyle: function(cmp) {
		cmp.set("v.labelClass", "slds-form-element__label input-label");
	},
	setErrorStyle: function(cmp) {
		//show title and border in red
		cmp.set("v.labelClass", "igcp-input__label--error slds-form-element__label input-label");
	},
	logger: function(methodName, cmp, params) {
		console.log("********");
		console.log(methodName);
		console.log("||| " + cmp.get("v.id") + " |||");
		console.log(params);
		console.log("********");
	}
})