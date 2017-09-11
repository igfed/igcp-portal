({
	onInit : function(cmp, evt, hlpr) {
	},
	onClick: function(cmp, evt, hlpr) {

		var 
			modalId = cmp.get("v.modalId"),
			events = cmp.find("CP_Events");

		if(modalId != "none") {
			events.fire("CP_Evt_Modal_Open", {
				"id" : modalId
			});
			
		}		
	}
})