({
	 doInit : function(component, event, helper) {
          
        // var action = component.get("c.updatePassword");
        //helper.getPosition(component);
        helper.getRecords(component);
        /* var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url":"https://www.google.com",
                "isredirect":false
            });
            urlEvent.fire();*/
    }/*,
    gotoURL : function(component, event, helper) {
        helper.gotoURL(component);
    },
    navigate : function(component, event, helper) {
        helper.navigate(component);
    }*/
})