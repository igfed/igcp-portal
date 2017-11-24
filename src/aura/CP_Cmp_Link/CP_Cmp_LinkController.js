({
	onInit : function(cmp, evt, hlpr) {
	},
	onClick: function(cmp, evt, hlpr) {

		var 
			modalID = cmp.get("v.modalID"),
			events = cmp.find("CP_Events");

		if(modalID != "none") {
			events.fire("CP_Evt_Modal_Open", {
				"id" : modalID
			});
			
		} else {
			events.fire(
				"CP_Evt_Click",
				{
					"id" : cmp.get("v.id")
				}	
			);
		}	
	}
})