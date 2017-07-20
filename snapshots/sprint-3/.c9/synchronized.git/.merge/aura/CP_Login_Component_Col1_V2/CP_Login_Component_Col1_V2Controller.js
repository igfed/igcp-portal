({
	onSignIn : function(component, event, helper) {
		
		 var usernameEvent = $A.get("e.c:validateTextInputEvent");
		 usernameEvent.fire();
		 
		  var passwordEvent = $A.get("e.c:validatePasswordInputEvent");
		 passwordEvent.fire();
		
		// helper.validateInput(component.find("password"), "Must have a password");
	},
	onRegisterNow : function(component, event, helper) {
		console.log('onRegisterNow');
	}
})