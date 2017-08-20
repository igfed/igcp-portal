({
	onSubmit : function(cmp, evt, hlpr) {

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value",
			{
				"id" : evt.getParam("payload").for
			});
	},
	onInputValueReceived : function(cmp, evt, hlpr) {
		console.log(evt.getParam("payload"))

		var 
				validator = cmp.find('CP_Validation'),
				events = cmp.find('CP_Events');

		validator.validateUsername(evt.getParam("payload").value, function(obj){

			if(obj.isValid === false) {
				events.fire("CP_Evt_Input_Error", {
					"errors" : obj.errors
				});
			} else {
				events.fire("CP_Evt_Input_Valid", {});
			}
		});
	}
})