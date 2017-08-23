({
    writeBreadcrumb : function(cmp){
        var tagsArr = cmp.get("v.tags");
        //clear the current body:
        cmp.set("v.body", []);
        if (tagsArr.length > 1 || cmp.get('v.showFirstLevel')) {
            for (var i = 0, j = tagsArr.length; i < j; i++){
                if (i < j - 1){
                    //all nodes (except last) should be a link.
                    $A.createComponent(
                        "aura:html",
                        {
                            tag: "a",
                            body: tagsArr[i],
                            HTMLAttributes: 
                            {
                                "onclick": cmp.getReference("c.handleLinkClick"),
                                "data-index": i,
                                "class": 'slds-breadcrumb__item'
                            }
                        },
                        function(newAnchor, status, errorMessage){
                            if (status == 'SUCCESS'){
                                var body = cmp.get("v.body");
                                body.push(newAnchor);
                                cmp.set("v.body", body);
                            } else if (status === "INCOMPLETE") {
                                console.log("No response from server or client is offline.");
                                // Show offline error
                            } else if (status === "ERROR") {
                                console.log("Error: " + errorMessage);
                                // Show error message
                            }
                        }
                    );
                } else {
                    //last node should just be a span.
                    $A.createComponent(
                        "aura:html",
                        {
                            tag: "span",
                            body: tagsArr[i],
                            HTMLAttributes: {
                                "class": 'slds-breadcrumb__item'
                            }
                        },
                        function(newAnchor, status, errorMessage){
                            if (status == 'SUCCESS'){
                                var body = cmp.get("v.body");
                                body.push(newAnchor);
                                cmp.set("v.body",body);
                            } else if (status === "INCOMPLETE") {
                                console.log("No response from server or client is offline.");
                                // Show offline error
                            } else if (status === "ERROR") {
                                console.log("Error: " + errorMessage);
                                // Show error message
                            }
                        }
                    );
                }
            }

        } // if length > 1
    }
})