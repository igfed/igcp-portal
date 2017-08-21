({
	isSame: function(val1, val2) {
		return val1 === val2 ? true : false;
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
	hasSpecialChar: function(value) {
		return /[^a-z\d]+/i.test(value);
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

		callBack({ "id": id, "isValid": isValid, "errors": errors });
	},
	validatePassword: function(params, callBack, cmp, hlpr) {

		var 
			isValid = false,
			errors	= [],
			value = params.value,
			id = params.id, 
			minLength = hlpr.min(value.length, cmp.get("v.passMinLength")),
			hasUppercase = hlpr.hasUppercase(value),
			hasNumber = hlpr.hasNumber(value),
			hasSpecialChar = hlpr.hasSpecialChar(value);

		//Check for min length
		if (minLength === true) {
			isValid = true;
		} else {
			isValid = false
			errors.push({ type: "minLength", msg: ("The password is less than " + cmp.get("v.passMinLength") + " characters") });
		}

		//Check for uppercase
		if(hasUppercase === true) {
			isValid = true;
		} else {
			isValid = false;
			errors.push({ type: "hasUppercase", msg: ("The password must have at least one uppercase character") });
		}

		//Check for number
		if(hasNumber === true) {
			isValid = true;
		} else {
			isValid = false;
			errors.push({ type: "hasNumber", msg: ("The password must have at least one number") });
		}

		//Check for special characters
		if(hasSpecialChar === true) {
			isValid = true;
		} else {
			isValid = false;
			errors.push({ type: "hasSpecialChar", msg: ("The password must have at least one special character") });
		}

		callBack({ "id": id, "isValid": isValid, "errors": errors });
	}
})