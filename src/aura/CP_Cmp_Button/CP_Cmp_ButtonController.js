({
	doInit : function(cmp, evt, hlpr) {
	},
	onClick : function(cmp, evt, hlpr) {

		var events = cmp.find('CP_Events');

		events.fire("CP_Evt_Click", 
			{
				"id" : cmp.get("v.id"),
				"buttonType" : cmp.get("v.buttonType")
			});
	}
})