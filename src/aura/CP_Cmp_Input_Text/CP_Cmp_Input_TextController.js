({
	onGetValue : function(cmp, evt, hlpr) {

		console.log("CP_Cmp_Input_Text: onGetValue");

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Send_Input_Value", 
			{
				"value" : cmp.get("v.inputValue")
			});
	},
	onValid: function(cmp, evt, hlpr) {
		console.log('CP_Cmp_Input_Text: valid');
		
		var field = cmp.find("text-input");
		field.set("v.errors", []);
	},
	onError : function(cmp, evt, hlpr) {
		var field = cmp.find("text-input");
		field.set("v.errors", [{message: cmp.get("v.errorText")}]);
	}	
})