({
	onValidateForm: function(cmp, evt, hlpr) {

		var params = evt.getParam('arguments');
		if (params) {
			var
				value = params.value,
				callBack = params.callBack;
			callBack('Nothing to return yet: ' + params.value);
		}
	},
	onValidateUsername: function(cmp, evt, hlpr) {

		var params = evt.getParam('arguments');
		if (params) {

			var
				isValid = false,
				errors = [],
				value = params.value,
				callBack = params.callBack,
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
			if(minLength === true) {
				if (isAlphanumeric === true && cmp.get("v.userIsAlphanumeric") === true) {
					isValid = true;
				} else {
					isValid = hlpr.isSame(isAlphanumeric, cmp.get("v.userIsAlphanumeric"));

					if (value.length !== 0) {
						errors.push({ type: "isAlphanumeric", msg: ("The username must not contain any special characters") });
					}
				}
			}

			callBack({ "isValid": isValid, "errors": errors });
		}
	}
})