({
	onSignIn : function(component, event, helper) {
		
		helper.validateInput(component.find("username"), "Must have a name");
		helper.validateInput(component.find("password"), "Must have a password")
	},
	onShowPassword : function(cmp, evt, hlpr) {
		cmp.set('v.showPassword', cmp.get('v.showPassword') ? false : true);
	},
	onRegisterNow : function(component, event, helper) {
		console.log('onRegisterNow');
	}
})