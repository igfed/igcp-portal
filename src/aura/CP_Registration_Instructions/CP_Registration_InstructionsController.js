({
	onStart : function(cmp, evt, hlpr) {
		var 
			id = evt.getParam("payload").id,
			events = cmp.find("CP_Events");

		if(id === "get-started-pfa-2") {
			events.fire("CP_Evt_Start", {
				id : id
			})
		}
	}
})