({
	isValid: function(errors) {
		if(errors.length === 0) {
			return true;
		} else {
			return false;
		}	
	},
	isSame: function(val1, val2) {
		if(val1 === val2) {
			return true;
		} else {
			return false;
		}
	},
	min: function(length, param) {
		return length >= param;
	},
	max: function(length, param) {
		return length <= param;
	},
	alphanumeric: function(value) {
		return /^\w+$/i.test(value);
	},
	hasUppercase: function(value) {
		return /[A-Z]/.test(value);
	},
	hasLowercase: function(value) {
		return /[a-z]/.test(value);
	},
	hasNumber: function(value) {
		return /[0-9]/.test(value);			
	},
	hasNumberOnly: function(value) {
		return 	/^\d+$/.test(value);
	},
	hasSpecialChar: function(value) {
		return /[^a-z\d]+/i.test(value);
	},
	hasValidPostalCode: function(value) {
		var isValid = value.match(/[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/) || value.match(/[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]/);
		
		if(isValid === null) {
			return false;
		} else {
			return isValid;
		}
	},
	hasValidZipcode: function(value){
		// var 
		// 	isValid = false,
		// 	numbersOnly = /^\d+$/.test(value),
		// 	length = value.length;

		// if(numbersOnly === true && length === 5) {
		// 	isValid = true;
		// }		

		// return isValid; 	
	},
	checkForErrors: function(valObj) {
		var
			isValid = false,
			errors = [], key;

		for(key in valObj) {

			if(valObj[key] === false) {
				errors.push({ type: key });
			} else if(key === "isEmpty" && valObj[key] === true) {
				errors.push({ type: key });
			}
		}

		return errors;	
	},
	validateUsername: function(params, callBack, cmp, hlpr) {
		var
			isValid = false,
			errors = [],
			value = params.value,
			id = params.id,
			minLength = hlpr.min(value.length, cmp.get("v.userMinLength")),
			isAlphanumeric = hlpr.alphanumeric(value);

		//Check for min length
		if (minLength === true) {
			isValid = true;
		} else {
			isValid = false
			errors.push({ type: "minLength", msg: ("The username is less than " + cmp.get("v.userMinLength") + " characters") });
		}

		//Check for non alpha numeric chars
		if (minLength === true) {
			if (isAlphanumeric === true && cmp.get("v.userIsAlphanumeric") === true) {
				isValid = true;
			} else {
				isValid = hlpr.isSame(isAlphanumeric, cmp.get("v.userIsAlphanumeric"));

				if (value.length !== 0) {
					errors.push({ type: "isAlphanumeric", msg: ("The username must not contain any special characters") });
				}
			}
		}

		callBack({ "id": id, "isValid": hlpr.isValid(errors), "errors": errors });
	},
	validatePassword: function(params, callBack, cmp, hlpr) {

		var 
			value = params.value,
			id = params.id,
			errors = [],
			minLength = hlpr.min(value.length, cmp.get("v.passMinLength")),
			hasUppercase = hlpr.hasUppercase(value),
			hasNumber = hlpr.hasNumber(value),
			hasSpecialChar = hlpr.hasSpecialChar(value);

		errors = hlpr.checkForErrors({ 
			"minLength" : minLength,
			"hasUppercase" : hasUppercase,
			"hasNumber" : hasNumber,
			"hasSpecialChar" : hasSpecialChar 
		});

		errors.forEach(function(item, i){
			if(item.type === "minLength") {
				item["msg"] = "The password is less than " + cmp.get("v.passMinLength") + " characters";
			} else if(item.type === "hasUppercase") {
				item["msg"] = "The password must have at least one uppercase character";
			} else if(item.type === "hasNumber") {
				item["msg"] = "The password must have at least one number";
			} else if(item.type === "hasSpecialChar") {
				item["msg"] = "The password must have at least one special character";	
			}
		});

		callBack({ "id": id, "isValid": hlpr.isValid(errors), "errors": errors });
	},
	validateClientnumber: function(params, callBack, cmp, hlpr) {

		var 
			value = params.value,
			id = params.id,
			minLength = hlpr.min(value.length, cmp.get("v.clientMinLength")),
			errors = [];

		errors = hlpr.checkForErrors({ "minLength" : minLength });

		errors.forEach(function(item, i){
			if(item.type === "minLength") {
				item["msg"] = ("The client number is less than " + cmp.get("v.clientMinLength") + " characters");
			}
		});

		callBack({ "id": id, "isValid": hlpr.isValid(errors), "errors": errors });
	},
	validatePostalcode: function(params, callBack, cmp, hlpr) {
		var 
			value = params.value,
			id = params.id,
			errors = [],
			errorCheckObj = {},
			minLength = hlpr.min(value.length, 5),
			numbersOnly = hlpr.hasNumberOnly(value),
			hasValidZipcode,
			hasValidPostalCode;

		errorCheckObj["minLength"] = minLength;

		// if(numbersOnly === true) {
		// 	//This might be a zipcode
		// 	errorCheckObj["hasValidZipcode"] = hlpr.hasValidZipcode(value);
		// } else {
		// 	//This might be a postal code
		// 	errorCheckObj["hasValidPostalCode"] = hlpr.hasValidPostalCode(value);
		// }

		errors = hlpr.checkForErrors(errorObj);

		errors.forEach(function(item, i){
			if(item.type === "minLength") {
				item["msg"] = "The postal/zip code must have at least 5 characters.";
			} else if(item.type === "numbersOnly") {
				item["msg"] = "Zip codes must contain numbers only."
			}
		});

		console.log("VALIDATE POSTAL CODE");
		console.log(errors);

		callBack({ "id": id, "isValid": hlpr.isValid(errors), "errors": errors });
	}
})