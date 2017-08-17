({
	onValidate : function(component, event, helper) {
	    if(component.get("v.required") === true) {
    	    helper.validateInput(
    	        component.find("text-input"), 
    	        component.get("v.errorText"));   
	    }
	},
	onGetValue : function(cmp, evt, hlpr) {

		console.log("CP_Cmp_Input_Text");

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Send_Input_Value", 
			{
				"value" : cmp.get("v.inputValue")
			});
	}	
})