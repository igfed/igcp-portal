({
	isValid: function(errors) {
		if (errors.length === 0) {
			return true;
		} else {
			return false;
		}
	},
	isSame: function(val1, val2) {
		if (val1 === val2) {
			return true;
		} else {
			return false;
		}
	},
	isEmail: function(value) {
		var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		return pattern.test(value);
	},
	lessThanOrEqual: function(val1, val2) {
		return val1 <= val2 ? true : false;
	},
	greaterThanOrEqual: function(val1, val2) {
		return val1 >= val2 ? true : false;
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
	alphanumericSpecial: function(value) {
		return /^[-@./+\w\s]*$/i.test(value);
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
		return /^\d+$/.test(value);
	},
	hasSpecialChar: function(value) {
		return /[^a-z\d]+/i.test(value);
	},
	isPhone: function(value) {
		value = value.replace(/\s+/g, "");
		return /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/.test(value);
	},
	hasValidPostalCode: function(value) {

		//validates space or no space
		var isValid = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/.test(value) || /[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]/.test(value);

		if (isValid === null) {
			return false;
		} else {
			return isValid;
		}
	},
	checkForErrors: function(valObj) {
		var
			isValid = false,
			errors = [],
			key;

		for (key in valObj) {

			if (valObj[key] === false) {
				errors.push({ type: key });
			} else if (key === "isEmpty" && valObj[key] === true) {
				errors.push({ type: key });
			}
		}

		return errors;
	},
	validateUsername: function(params, callBack, cmp, hlpr) {
		var
			isValid = false,
			errors = [],
			errorCheckObj = {},
			value = params.value,
			isEmpty = value.length === 0 ? true : false,
			id = params.id,
			minLength = hlpr.min(value.length, cmp.get("v.userMinLength")),
			isAlphanumeric = hlpr.alphanumericSpecial(value);

		if (isEmpty === true) {
			errorCheckObj["isEmpty"] = isEmpty;
		} else {
			errorCheckObj["minLength"] = minLength;
			errorCheckObj["isAlphanumeric"] = isAlphanumeric;
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function(item, i) {
			if (item.type === "minLength") {
				item["msg"] = "The username is less than " + cmp.get("v.userMinLength") + " characters";
			} else if (item.type === "isAlphanumeric") {
				item["msg"] = "The username can only contain the following characters: - _ @ .";
			} else if (item.type === "isEmpty") {
				item["msg"] = "The username must not be empty";
			}
		});

		callBack({ "id": id, "isValid": hlpr.isValid(errors), "errors": errors });
	},
	validatePassword: function(params, callBack, cmp, hlpr) {

		var
			value = params.value,
			id = params.id,
			errors = [],
			errorCheckObj = {},
			isEmpty = value.length === 0 ? true : false,
			minLength = hlpr.min(value.length, cmp.get("v.passMinLength")),
			hasUppercase = hlpr.hasUppercase(value),
			hasNumber = hlpr.hasNumber(value),
			hasSpecialChar = hlpr.hasSpecialChar(value);

		if (isEmpty === true) {
			errorCheckObj["isEmpty"] = isEmpty;
		} else {
			errorCheckObj["minLength"] = minLength;
			errorCheckObj["hasUppercase"] = hasUppercase;
			errorCheckObj["hasNumber"] = hasNumber;
			errorCheckObj["hasSpecialChar"] = hasSpecialChar;
		}

		if (params.confirmValue && isEmpty === false) {

			errorCheckObj["passwordsMatch"] = hlpr.isSame(params.value, params.confirmValue);
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function(item, i) {
			if (item.type === "minLength") {
				item["msg"] = "The password is less than " + cmp.get("v.passMinLength") + " characters";
			} else if (item.type === "hasUppercase") {
				item["msg"] = "The password must have at least one uppercase character";
			} else if (item.type === "hasNumber") {
				item["msg"] = "The password must have at least one number";
			} else if (item.type === "hasSpecialChar") {
				item["msg"] = "The password must have at least one special character";
			} else if (item.type === "passwordsMatch") {
				item["msg"] = "The passwords do not match.";
			} else if (item.type === "isEmpty") {
				item["msg"] = "This field cannot be empty";
			}
		});

		callBack({ "id": id, "isValid": hlpr.isValid(errors), "errors": errors });
	},
	validatePasswordConfirm: function(params, callBack, cmp, hlpr) {

		var
			value = params.value,
			id = params.id,
			errors = [],
			errorCheckObj = {};

		errorCheckObj["passwordsMatch"] = hlpr.isSame(params.value, params.confirmValue);

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function(item, i) {
			if (item.type === "passwordsMatch") {
				item["msg"] = "The passwords do not match.";
			}
		});

		callBack({ "id": id, "isValid": hlpr.isValid(errors), "errors": errors });
	},
	validateClientnumber: function(params, callBack, cmp, hlpr) {

		var
			value = params.value,
			id = params.id,
			errors = [],
			errorCheckObj = {},
			isEmpty = value.length === 0 ? true : false,
			minLength = hlpr.min(value.length, cmp.get("v.clientMinLength")),
			hasNumberOnly = hlpr.hasNumberOnly(value);

		if (isEmpty === true) {
			errorCheckObj["isEmpty"] = isEmpty;
		} else {
			errorCheckObj["minLength"] = minLength;
			errorCheckObj["hasNumberOnly"] = hasNumberOnly;
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function(item, i) {
			if (item.type === "minLength") {
				item["msg"] = "The client number is less than " + cmp.get("v.clientMinLength") + " characters";
			} else if (item.type === "hasNumberOnly") {
				item["msg"] = "The client number must only be numbers";
			} else if(item.type === "isEmpty") {
				item["msg"] = "This field cannot be empty";
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

		if (value.length === 5) {

			if (numbersOnly === true) {
				errorCheckObj["hasValidZipcode"] = true;
			} else {
				errorCheckObj["hasValidZipcode"] = false;
			}

		} else if (value.length >= 5) {
			errorCheckObj["hasValidPostalCode"] = hlpr.hasValidPostalCode(value);
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function(item, i) {
			if (item.type === "minLength") {
				item["msg"] = "The postal/zip code must have at least 5 characters.";
			} else if (item.type === "hasValidZipcode") {
				item["msg"] = "Not a valid zip code format. Must be numeric only.";
			} else if (item.type === "hasValidPostalCode") {
				item["msg"] = "Not a valid postal code format."
			}
		});

		callBack({ "id": id, "isValid": hlpr.isValid(errors), "errors": errors });
	},
	validateDate: function(params, callBack, cmp, hlpr) {

		var
			value = params.value,
			id = params.id,
			splitValues = [],
			isEmpty = value.length === 0 ? true : false,
			monthValid = false,
			dayValid = false,
			yearValid = false,
			errors = [],
			errorCheckObj = {};

		if (isEmpty === true) {
			errorCheckObj["isEmpty"] = isEmpty;
		} else {
			splitValues = value.split("/");
			monthValid = hlpr.lessThanOrEqual(splitValues[0], 12);
			dayValid = hlpr.lessThanOrEqual(splitValues[1], 31);
			yearValid = hlpr.lessThanOrEqual(splitValues[2], (new Date()).getFullYear());

			if(splitValues[1] === "") {
				errorCheckObj["hasDay"] = false;
				errorCheckObj["hasYear"] = false;
			} else if(splitValues[2] === "") {
				errorCheckObj["hasYear"] = false;
			} else {
				errorCheckObj["monthValid"] = monthValid;
				errorCheckObj["dayValid"] = dayValid;
				errorCheckObj["yearValid"] = yearValid;
			}
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function(item, i) {
			if (item.type === "monthValid") {
				item["msg"] = "Month must be 1 - 12";
			} else if (item.type === "dayValid") {
				item["msg"] = "Day must be 1 - 31";
			} else if (item.type === "yearValid") {
				item["msg"] = "Year must be less than current year";
			} else if(item.type === "hasDay") {
				item["msg"] = "Please enter a valid day";
			} else if(item.type === "hasYear") {
				item["msg"] = "Please enter a valid year";
			} else if(item.type === "isEmpty") {
				item["msg"] = "Please enter a valid date";
			}
		});

		callBack({ "id": id, "isValid": hlpr.isValid(errors), "errors": errors });
	},
	validateEmail: function(params, callBack, cmp, hlpr) {

		var
			value = params.value,
			id = params.id,
			errors = [],
			errorCheckObj = {},
			isEmpty = value.length === 0 ? true : false,
			isEmail = hlpr.isEmail(value);

		if (isEmpty === true) {
			errorCheckObj["isEmpty"] = isEmpty;
		} else {
			errorCheckObj["isEmail"] = isEmail;
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function(item, i) {
			if (item.type === "isEmpty") {
				item["msg"] = "E-mail field is empty"
			} else if (item.type === "isEmail") {
				item["msg"] = "E-mail format is invalid"
			}
		});


		callBack({ "id": id, "isValid": hlpr.isValid(errors), "errors": errors });
	},
	validatePhone: function(params, callBack, cmp, hlpr) {

		var
			value = params.value,
			id = params.id,
			errors = [],
			errorCheckObj = {},
			isEmpty = value.length === 0 ? true : false,
			isPhone = hlpr.isPhone(value);

		if (isEmpty === true) {
			errorCheckObj["isEmpty"] = isEmpty;
		} else {
			errorCheckObj["isPhone"] = isPhone;
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function(item, i) {
			if (item.type === "isEmpty") {
				item["msg"] = "Phone field is empty"
			} else if (item.type === "isPhone") {
				item["msg"] = "Phone number invalid"
			}
		});


		callBack({ "id": id, "isValid": hlpr.isValid(errors), "errors": errors });
	},
	validateText: function (params, callBack, cmp, hlpr){
		var
			value = params.value,
			id = params.id,
			errors = [],
			errorCheckObj = {},
			isEmpty = value.length === 0 ? true : false,
			minLength = hlpr.min(value.length, cmp.get("v.textMinLength"));

		if (isEmpty === true) {
			errorCheckObj["isEmpty"] = isEmpty;
		} else {
			errorCheckObj["minLength"] = minLength;	
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function(item, i) {
			if (item.type === "isEmpty") {
				item["msg"] = "Text field is empty";
			} else if (item.type === "minLength") {
				item["msg"] = "The text is less than " + cmp.get("v.textMinLength") + " characters.";
			}
		});

		callBack({ "id": id, "isValid": hlpr.isValid(errors), "errors": errors });	
	}
})