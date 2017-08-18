({
	onGetValue : function(cmp, evt, hlpr) {

		console.log("CP_Cmp_Input_Text: onGetValue");

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Send_Input_Value", 
			{
				"value" : cmp.get("v.inputValue")
			});
	},
	onError : function(cmp, evt, hlpr) {
		console.log('CP_Cmp_Input_Text: error');

		var field = cmp.find("text-input");
		field.set("v.errors", [{message: cmp.get("v.errorText")}]);
	}	
})