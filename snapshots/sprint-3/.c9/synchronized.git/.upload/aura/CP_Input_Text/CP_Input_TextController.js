({
	onValidate : function(component, event, helper) {
	    if(component.get("v.required") === true) {
    	    helper.validateInput(
    	        component.find("text-input"), 
    	        component.get("v.errorText"));   
	    }
	}
})