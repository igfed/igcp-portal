({
	onInit: function(cmp, evt, hlpr) {

		if(cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Form_Back_Next: 'id' needs to be set.");
		}		

		if(cmp.get("v.nextType") === "submit") {

			if(cmp.get("v.form") === "default") {
				console.error("CP_Cmp_Form_Back_Next: 'form' needs to be set.")
			}
		}	

	},
	onButtonClick: function(cmp, evt, hlpr) {
		console.log('onButtonClick')

		var payload = evt.getParam("payload");

		console.log(payload);

		if(payload.id === "next_step_button") {
			cmp.onNextStep();
		}
	},
	onNext : function(cmp, evt, hlpr) {

		console.log("onNextStep")	

		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id" : cmp.get("v.id")
		});	
	},
	onBack: function(cmp, evt, hlpr) {
		console.log("BACK_NEXT: onBack")
	}
})