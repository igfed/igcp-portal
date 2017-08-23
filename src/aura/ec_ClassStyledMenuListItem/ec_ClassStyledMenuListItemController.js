({
    doInit: function(component, event, helper) {
        var childrenAttr = component.get("v.children");
        var children = JSON.parse(childrenAttr);

        for (var i=0, child; child = children[i]; i++) {
            $A.createComponent(
                "c:ec_ClassStyledMenuSubItem",
                {
                    "aura:id": "menuSubItem",
                    "label": child.label,
                    "url": child.url
                },
                function(newButton, status, errorMessage){
                    //Add the new button to the body array
                    if (status === "SUCCESS") {
                        var body = component.get("v.body");
                        body.push(newButton);
                        component.set("v.body", body);
                    }
                    else if (status === "INCOMPLETE") {
                        console.log("No response from server or client is offline.")
                        // Show offline error
                    }
                    else if (status === "ERROR") {
                        console.log("Error: " + errorMessage);
                        // Show error message
                    }
                }
            ); // end createComponent
        } // end for
    },
    goToURL : function(component, event, helper) {
        var cmpURL = component.get("v.url");
        helper.navigateToURL(cmpURL, {}, true);
	}
})