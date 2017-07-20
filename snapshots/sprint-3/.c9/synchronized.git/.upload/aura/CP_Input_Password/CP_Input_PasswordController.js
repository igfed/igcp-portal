({
    onValidate : function(component, event, helper) {
	   helper.validateInput(component.find("password"), "Must have a password")
	},
    onShowPassword : function(cmp, evt, hlpr) {
		cmp.set('v.showPassword', cmp.get('v.showPassword') ? false : true);
	}
})