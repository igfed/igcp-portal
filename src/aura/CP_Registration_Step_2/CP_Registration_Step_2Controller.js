({
	onSubmit : function(cmp, evt, hlpr) {
		console.log('CP_Registration_Step_2: onSubmit');
		console.log(evt.getParam('payload'));
		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value", { 'formId' : evt.getParam('payload').for });
	},
	onInputValueReceived : function(cmp, evt, hlpr) {

		console.log('CP_Registration_Step_2: onInputValueReceived');

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
	},
	onBackNext: function(cmp, evt, hlpr) {
		console.log('CP_Registration_Step_2: onBackNext!!!');
	}
})