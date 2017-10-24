({
	getPosition : function(component) {
		var action = component.get("c.getOnlineStatementList");
		action.setCallback(this,function(a){
                //get the response state
                var state = a.getState();
                console.log("test"+state);
                //check if result is successfull
                if(state == "SUCCESS"){
                    var result = a.getReturnValue ();
                    console.log("temp"+result);
                    	component.set("v.lstPositions",result);
                } else if(state == "ERROR"){
                    alert('Error in calling server side action');
                }
            });
            
            //adds the server-side action to the queue        
            $A.enqueueAction(action);
	}
		
})