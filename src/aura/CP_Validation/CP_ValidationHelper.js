({
	isValid: function (errors) {
		if (errors.length === 0) {
			return true;
		} else {
			return false;
		}
	},
	isSame: function (val1, val2) {
		if (val1 === val2) {
			return true;
		} else {
			return false;
		}
	},
	isEmail: function (value) {
		var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		return pattern.test(value);
	},
	lessThanOrEqual: function (val1, val2) {
		return val1 <= val2 ? true : false;
	},
	greaterThanOrEqual: function (val1, val2) {
		return val1 >= val2 ? true : false;
	},
	min: function (length, param) {
		return length >= param;
	},
	max: function (length, param) {
		return length <= param;
	},
	alphanumeric: function (value) {
		return /^\w+$/i.test(value);
	},
	alphanumericSpecial: function (value) {
		return /^[-@.\w\s]*$/i.test(value);
	},
	hasUppercase: function (value) {
		return /[A-Z]/.test(value);
	},
	hasLowercase: function (value) {
		return /[a-z]/.test(value);
	},
	hasNumber: function (value) {
		return /[0-9]/.test(value);
	},
	hasNumberOnly: function (value) {
		return /^\d+$/.test(value);
	},
	hasSpecialChar: function (value) {
		return /[^a-z\d]+/i.test(value);
	},
	hasCharacter: function(value, character) {
		var 
			returnObj = { "detected" : false }, 
			regEx = new RegExp('\\' + character, 'g'), 
			test = value.match(regEx);
        if(test !== null) {
			returnObj["index"] = value.indexOf(character.toString());
            returnObj["detected"] = true;
        }
        return returnObj;
	},
	isPhone: function (value) {
		// console.info("IS PHONE");
		// console.info(value);
		value = value.replace(/\s+/g, "");
		return /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/.test(value);
	},
	isInternationalPhone: function(value) {
		// console.info("IS INTERNATIONAL PHONE");
		// console.info(value);
		return /^\+(?:[0-9]●?){6,14}[0-9]$/.test(value);
	},
	hasValidPostalCode: function (value) {

		//validates space or no space
		var isValid = /[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]/.test(value) || /[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]/.test(value);

		if (isValid === null) {
			return false;
		} else {
			return isValid;
		}
	},
	checkForErrors: function (valObj) {
		var
			errors = [],
			key;

		for (key in valObj) {

			if (valObj[key] === false) {
				errors.push({
					type: key
				});
			} else if (key === "isEmpty" && valObj[key] === true) {
				errors.push({
					type: key
				});
			}
		}

		return errors;
	},
	validateUsername: function (params, callBack, cmp, hlpr) {
		var
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

		callBack({
			"id": id,
			"isValid": hlpr.isValid(errors),
			"errors": errors
		});
	},
	validatePassword: function (params, callBack, cmp, hlpr) {

		try {
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

				if (hasNumber !== true) {
					//check if pass has special char
					errorCheckObj["hasSpecialChar"] = hasSpecialChar;
				}

				if (hasSpecialChar !== true) {
					//Check if pass has number
					errorCheckObj["hasNumber"] = hasNumber;
				}
				
				// if (params.confirmValue !== undefined) {
				
				// 	errorCheckObj["passwordsMatch"] = hlpr.isSame(params.value, params.confirmValue);
				// }
			}

			errors = hlpr.checkForErrors(errorCheckObj);

			errors.forEach(function (item) {
				if (item.type === "isEmpty") {
					item["msg"] = $A.get("$Label.c.CP_Error_Empty_Field");
				}
			});

			callBack({
				"id": id,
				"type" : params.type,
				"isValid": hlpr.isValid(errors),
				"errors": errors
			});
		} catch (err) {
			console.error("CP_Validation: validationPassword");
			console.error(err);
		}
	},
	validatePasswordConfirm: function (params, callBack, cmp, hlpr) {

		var
			value = params.confirmValue,
			id = params.id,
			isEmpty = value.length === 0 ? true : false,
			errors = [],
			errorCheckObj = {};

		if (isEmpty === true) {
			errorCheckObj["isEmpty"] = isEmpty;
		} else {
			errorCheckObj["passwordsMatch"] = hlpr.isSame(params.value, params.confirmValue);
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function (item, i) {
			if (item.type === "isEmpty") {
				item["msg"] = $A.get("$Label.c.CP_Error_Empty_Field");
			} else if (item.type === "passwordsMatch") {
				item["msg"] = $A.get("$Label.c.CP_Error_Passwords_Match");
			}
		});

		console.log(errors)

		callBack({
			"id": id,
			"type" : params.type,
			"isValid": hlpr.isValid(errors),
			"errors": errors
		});
	},
	validateClientnumber: function (params, callBack, cmp, hlpr) {

		var
			value = params.value,
			id = params.id,
			errors = [],
			errorCheckObj = {},
			isEmpty = value.length === 0 ? true : false,
			hasNumberOnly = hlpr.hasNumberOnly(value);

		if (isEmpty === true) {
			errorCheckObj["isEmpty"] = isEmpty;
		} else {
			errorCheckObj["hasNumberOnly"] = hasNumberOnly;
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function (item, i) {
			if (item.type === "hasNumberOnly") {
				item["msg"] = $A.get("$Label.c.CP_Error_Client_Number_Numbers_Only");
			} else if (item.type === "isEmpty") {
				item["msg"] = $A.get("$Label.c.CP_Error_Empty_Field");
			}
		});

		callBack({
			"id": id,
			"isValid": hlpr.isValid(errors),
			"errors": errors
		});
	},
	validatePostalcode: function (params, callBack, cmp, hlpr) {

		var
			value = params.value,
			id = params.id,
			errors = [],
			errorCheckObj = {},
			minLength = hlpr.min(value.length, 5),
			numbersOnly = hlpr.hasNumberOnly(value);

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

		errors.forEach(function (item, i) {
			if (item.type === "minLength") {
				item["msg"] = $A.get("$Label.c.CP_Error_Postal_Too_Short");
			} else if (item.type === "hasValidZipcode") {
				item["msg"] = $A.get("$Label.c.CP_Error_Zip_Invalid");
			} else if (item.type === "hasValidPostalCode") {
				item["msg"] = $A.get("$Label.c.CP_Error_Postal_Invalid");
			}
		});

		callBack({
			"id": id,
			"isValid": hlpr.isValid(errors),
			"errors": errors
		});
	},
	validateDate: function (params, callBack, cmp, hlpr) {

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

			if (splitValues[1] === "") {
				errorCheckObj["hasDay"] = false;
				errorCheckObj["hasYear"] = false;
			} else if (splitValues[2] === "") {
				errorCheckObj["hasYear"] = false;
			} else {
				errorCheckObj["monthValid"] = monthValid;
				errorCheckObj["dayValid"] = dayValid;
				errorCheckObj["yearValid"] = yearValid;
			}
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function (item, i) {
			if (item.type === "monthValid") {
				item["msg"] = $A.get("$Label.c.CP_Error_Month_Invalid");
			} else if (item.type === "dayValid") {
				item["msg"] = $A.get("$Label.c.CP_Error_Day_Invalid");
			} else if (item.type === "yearValid") {
				item["msg"] = $A.get("$Label.c.CP_Error_Year_Invalid");
			} else if (item.type === "hasDay") {
				item["msg"] = $A.get("$Label.c.CP_Error_Date_No_Day");
			} else if (item.type === "hasYear") {
				item["msg"] = $A.get("$Label.c.CP_Error_Date_No_Year");
			} else if (item.type === "isEmpty") {
				item["msg"] = $A.get("$Label.c.CP_Error_Date_Empty");
			}
		});

		callBack({
			"id": id,
			"isValid": hlpr.isValid(errors),
			"errors": errors
		});
	},
	validateEmail: function (params, callBack, cmp, hlpr) {

		var
			value = params.value,
			id = params.id,
			errors = [],
			errorCheckObj = {},
			isEmpty = value.length === 0 ? true : false,
			isEmail = hlpr.isEmail(value);

		console.info("VALIDATE EMIAL")
		console.info(value);
		console.log(isEmpty);
		console.log(isEmail);

		if (isEmpty === true) {
			errorCheckObj["isEmpty"] = isEmpty;
		} else {
			errorCheckObj["isEmail"] = isEmail;
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function (item) {
			if (item.type === "isEmpty") {
				item["msg"] = $A.get("$Label.c.CP_Error_Email_Empty");
			} else if (item.type === "isEmail") {
				item["msg"] = $A.get("$Label.c.CP_Error_Email_Invalid");
			}
		});

	
		callBack({
			"id": id,
			"type" : params.type,
			"isValid": hlpr.isValid(errors),
			"errors": errors
		});
	},
	validateEmailConfirm: function (params, callBack, cmp, hlpr) {
		var
			value = params.confirmValue,
			id = params.id,
			errors = [],
			errorCheckObj = {},
			isEmpty = value.length === 0 ? true : false;

		console.info("VALIDATE EMAIL CONFIRM");

		if (isEmpty === true) {
			errorCheckObj["isEmpty"] = isEmpty;
		} else {
			errorCheckObj["emailsMatch"] = hlpr.isSame(params.value, params.confirmValue);
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function (item, i) {
			if (item.type === "isEmpty") {
				item["msg"] = $A.get("$Label.c.CP_Error_Empty_Field");
			} else if (item.type === "emailsMatch") {
				item["msg"] = $A.get("$Label.c.CP_Error_Emails_Match");
			}
		});

		callBack({
			"id": id,
			"type" : params.type,
			"isValid": hlpr.isValid(errors),
			"errors": errors
		});
	},
	validatePhone: function (params, callBack, cmp, hlpr) {

		var
			value = params.value,
			id = params.id,
			errors = [],
			errorCheckObj = {},
			isEmpty = value.length === 0 ? true : false,
			isPhone = false,
			hasPlus = hlpr.hasCharacter(value, "+");

		if (value.length <= 14 && hasPlus.detected === false) {
			//Phone number is North American
			isPhone = hlpr.isPhone(value);
		} else if(value.length <= 14 && (hasPlus.detected === true && hasPlus.index === 0) || value.length > 14) {
			//International Phone Number
			isPhone = hlpr.isInternationalPhone(value);
		} else {
			console.warn("CP_Validation: validatePhone: unable to recognize number: " + value);
		}

		if (isEmpty !== true) {
			errorCheckObj["isPhone"] = isPhone;
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function (item, i) {
			if (item.type === "isPhone") {
				item["msg"] = $A.get("$Label.c.CP_Error_Phone_Invalid");
			}
		});

		callBack({
			"id": id,
			"isValid": hlpr.isValid(errors),
			"errors": errors
		});
	},
	validatePhoneRequired: function (params, callBack, cmp, hlpr) {

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

		errors.forEach(function (item, i) {
			if (item.type === "isEmpty") {
				item["msg"] = $A.get("$Label.c.CP_Error_Phone_Empty");
			} else if (item.type === "isPhone") {
				item["msg"] = $A.get("$Label.c.CP_Error_Phone_Invalid");
			}
		});


		callBack({
			"id": id,
			"isValid": hlpr.isValid(errors),
			"errors": errors
		});
	},
	validateText: function (params, callBack, cmp, hlpr) {
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

		errors.forEach(function (item, i) {
			if (item.type === "isEmpty") {
				item["msg"] = $A.get("$Label.c.CP_Error_Empty_Field");
			} else if (item.type === "minLength") {
				item["msg"] = $A.get("$Label.c.CP_Error_Text_Too_Short_1") + " " + cmp.get("v.textMinLength") + " " + $A.get("$Label.c.CP_Error_Text_Too_Short_2");
			}
		});

		callBack({
			"id": id,
			"isValid": hlpr.isValid(errors),
			"errors": errors
		});
	},
	validateQuestion: function (params, callBack, cmp, hlpr) {

		var
			value = params.value,
			id = params.id,
			errors = [],
			isEmpty = value.length === 0 ? true : false,
			errorCheckObj = {};

		if (isEmpty === true) {
			errorCheckObj["isEmpty"] = isEmpty;
		}

		errors = hlpr.checkForErrors(errorCheckObj);

		errors.forEach(function (item, i) {
			if (item.type === "isEmpty") {
				item["msg"] = $A.get("$Label.c.CP_Error_Question_Empty");
			}
		});

		callBack({
			"id": id,
			"isValid": hlpr.isValid(errors),
			"errors": errors
		});
	},
})