({
	arrayContainsOpt: function(array, opt) {
		// var utils = cmp.find("CP_Utils");

		// return utils.arrayContains(array, opt, function(hasValue) {
		// 	return hasValue;
		// });
	},
	logger: function(methodName, cmp, params) {
		console.log("********");
		console.log(methodName);
		console.log("||| " + cmp.get("v.id") + " |||");
		console.log(params);
		console.log("********");
	}
})