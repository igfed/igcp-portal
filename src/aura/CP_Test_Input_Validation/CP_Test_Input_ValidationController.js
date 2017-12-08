({
	onSubmit : function(cmp, evt, hlpr) {
		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId' : 'testForm'});
	},
	onInputValueReceived : function(cmp, evt, hlpr) {

		var 
				validator = cmp.find('CP_Validation'),
				events = cmp.find('CP_Events');

		validator.validate(evt.getParam("payload"), function(obj){

			if(obj.isValid === false) {
				events.fire("CP_Evt_Input_Error", {
					"id" : obj.id,
					"errors" : obj.errors
				});
			} else {
				events.fire("CP_Evt_Input_Valid", {
					"id" : obj.id
				});
			}
		});
	}
})