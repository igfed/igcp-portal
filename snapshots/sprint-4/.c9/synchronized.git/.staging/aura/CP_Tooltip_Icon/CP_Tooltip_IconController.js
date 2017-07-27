({
    doInit: function(cmp) {
        var 
            id = cmp.get("v.id"),
            copy = cmp.get("v.tooltip");
            
        $A.createComponent(
            "c:CP_Tooltip",
            {
                "id" : id,
                "aura:id" : id,
                "copy" : copy
            },
            function(tooltip, status, errorMessage){
                 //Add the new button to the body array
                if (status === "SUCCESS") {
                    var body = cmp.get("v.body");
                        body.push(tooltip); 
                        cmp.set("v.body", body);
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
        );
    },
    openTooltip: function(cmp, evt, hlpr) {
        var tooltipEvent = $A.get("e.c:toggleTooltipEvent").setParams({
            "id" : cmp.get("v.id")
        });
        
		 tooltipEvent.fire();
    },
    closeTooltip: function(cmp, evt, hlpr) {
        var tooltipEvent = $A.get("e.c:toggleTooltipEvent").setParams({
            "id" : cmp.get("v.id")
        });
    }
})