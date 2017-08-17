({
	doInit : function(cmp, evt, hlpr) {
	},
	onClick : function(cmp, evt, hlpr) {

		var events = cmp.find('CP_Events');

		events.fire("CP_Evt_Submit", 
			{
				"id" : cmp.get("v.id"),
				"for" : cmp.get("v.for"),
				"buttonType" : cmp.get("v.buttonType")
			});
	}
})