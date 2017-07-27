({
    doInit: function(component, event, helper) {
        // Create the action
        //c is pertaining to the Apex controller
        var action = component.get("c.getItems");
    
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.items", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
    
        // Send action off to be executed
        $A.enqueueAction(action);
    },
    clickPacked: function(component, event, helper) {
        var item = component.get("v.item");
        var updateEvent = component.getEvent("addItem");
        updateEvent.setParams({ "item": item });
        updateEvent.fire();
    }, 
    handleUpdateItem: function(component, event, helper) {
        var updatedIt = event.getParam("item");
        helper.updateItem(component, updatedIt);
    }
})