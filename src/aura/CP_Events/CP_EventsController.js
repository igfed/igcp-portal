({
	onFireEvent : function(cmp, evt, hlpr) {
		var params = evt.getParam('arguments');
        if (params) {

            var newEvent = $A.get("e.c:" + params.evtName);
				newEvent.setParams({
				"payload" : params.payload });
			newEvent.fire();
        } else {
        	console.warn('CP_Events.fire: event was fired but no params received');
        }
	}
})