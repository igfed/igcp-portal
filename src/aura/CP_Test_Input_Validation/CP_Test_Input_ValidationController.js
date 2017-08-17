({
	onSubmit : function(cmp, evt, hlpr) {

		var events = cmp.find('CP_Events');
		events.fire("CP_Evt_Get_Input_Value",
			{
				"id" : evt.getParam("payload").for
			});
	},
	onInputValueReceived : function(cmp, evt, hlpr) {
		console.log('onInputValueReceived');

		console.log(evt.getParam("payload").value);
	}
})