({
	onValidateForm: function(cmp, evt, hlpr) {

		var params = evt.getParam('arguments');
		if (params) {

			if(params.payload.type === "username") {
				hlpr.validateUsername(params.payload, params.callBack, cmp, hlpr);
			} else if (params.payload.type === "password") {
				hlpr.validatePassword(params.payload, params.callBack, cmp, hlpr);
			} else if (params.payload.type === "password-confirm") {
				hlpr.validatePasswordConfirm(params.payload, params.callBack, cmp, hlpr);
			} else if (params.payload.type === "client-number") {
				hlpr.validateClientnumber(params.payload, params.callBack, cmp, hlpr);
			} else if (params.payload.type === "postal") {
				hlpr.validatePostalcode(params.payload, params.callBack, cmp, hlpr);
			} else if(params.payload.type === "date") {
				hlpr.validateDate(params.payload, params.callBack, cmp, hlpr);
			} else if(params.payload.type === "email") {
				hlpr.validateEmail(params.payload, params.callBack, cmp, hlpr);
			} else if(params.payload.type === "phone") {
				hlpr.validatePhone(params.payload, params.callBack, cmp, hlpr);
			} else if(params.payload.type === "text") {
				hlpr.validateText(params.payload, params.callBack, cmp, hlpr);
			}
		}
	}
})