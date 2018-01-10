({
    doInit: function (component, event, helper) {
        try {
            var action = component.get("c.getSessionVal");
            action.setCallback(this, function (response) {
                var newVal = response.getReturnValue();

                console.log(newVal);
                component.set("v.mySessionVal", newVal);
            })
            $A.enqueueAction(action);
        } catch (err) {
            console.error(err);
        }

    }
    /*,
    updateSessionVal: function (component, event, helper) {
        try {
            var action = component.get("c.setSessionVal");

            console.log(component.get("v.mySessionVal"));

            var newVal = component.get("v.mySessionVal");
            action.setParams({
                "strAnswer": newVal
            });

            action.setCallback(this, function (response) {

                var state = response.getState();

                if (state === "SUCCESS") {

                    // Alert the user with the value returned 
                    // from the server
                    if (response !== null) {
                        console.log("SUCCESS!!!!");
                        console.log(response);
                    } else {
                        console.log("Success: But response is null :(")
                    }
    
                    // You would typically fire a event here to trigger 
                    // client-side notification that the server-side 
                    // action is complete
                } else if (state === "INCOMPLETE") {
                    // do something
                    console.log("INCOMPLETE");
                } else if (state === "ERROR") {
                    var errors = response.getError();
    
                    if (errors) {
                        if (errors) {
                           console.error(errors);
                        }
                    } else {
                        console.error("UNknown error");
                    }
                }

                component.set("v.result", r);
            })
            $A.enqueueAction(action);
        } catch (err) {
            console.error(err);
        }

    }
    */
})