({
	goToURL : function(component, event, helper) {
        var cmpURL = component.get("v.url");
        helper.navigateToURL(cmpURL, {}, true);
	}
})