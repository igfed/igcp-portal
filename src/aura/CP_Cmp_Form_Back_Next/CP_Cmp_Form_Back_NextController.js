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
	onNext : function(cmp, evt, hlpr) {
		var event = cmp.find("CP_Events");
		event.fire("CP_Evt_Next_Step", {
			"id" : cmp.get("v.id")
		});	
	},
	onBack: function(cmp, evt, hlpr) {
		console.log("BACK_NEXT: onBack")
	}
})