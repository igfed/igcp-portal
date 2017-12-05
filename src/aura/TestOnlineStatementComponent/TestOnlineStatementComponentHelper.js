({
    getRecords : function(component) {
       // window.open("https://igportaldev3--portaldev3--c.cs70.visual.force.com/apex/PDFRenderTest?id=0693D000000DTnU");
        console.log("Test");
        var tempData = JSON.stringify({ "username" : "portalclient2@igext", "currentPassword" : "qwerty" , "newPassword" : "testPassword" , "verifyPassword" : "testPassword" }); 
        
        
        console.log(tempData);
      //window.open("https://www.w3schools.com");
        
/*        var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url": "https://www.google.com",
                "isredirect" :false
            });
            urlEvent.fire();*/
       var action = component.get("c.getAllFinancialAssets ");
     
        
		console.log(action);
		action.setCallback(this,function(resp){
                //get the response state
                console.log("hello world");
                var state = resp.getState();
                console.log("test"+state);
                //check if result is successfull
                if(state == "SUCCESS"){
                    var result = resp.getReturnValue();
                    console.log("temp -> "+result);
                    str = JSON.stringify(result);
                   console.log(str);
                    	//component.set("v.lstPositions",result);
                    //
                } else if(state == "ERROR"){
                    alert('Error in calling server side action');
                }
            });
            
            //adds the server-side action to the queue        
            $A.enqueueAction(action);
/*
		var action = component.get("c.getOnlineStatementListFilter");
        action.setParams({'filter':'Last 4 quarters'});
		console.log(action);
		action.setCallback(this,function(resp){
                //get the response state
                var state = resp.getState();
                console.log("test"+state);
                //check if result is successfull
                if(state == "SUCCESS"){
                    var result = resp.getReturnValue();
                    console.log("temp"+result);
                    	//component.set("v.lstPositions",result);
                    //
                } else if(state == "ERROR"){
                    alert('Error in calling server side action');
                }
            });
            
            //adds the server-side action to the queue        
            $A.enqueueAction(action);*/
	}
	,getPosition : function(component) {
       // window.open("https://igportaldev3--portaldev3--c.cs70.visual.force.com/apex/PDFRenderTest?id=0693D000000DTnU");
        console.log("Test");
        var tempData = JSON.stringify({ "username" : "portalclient2@igext", "currentPassword" : "qwerty" , "newPassword" : "testPassword" , "verifyPassword" : "testPassword" }); 
        
        
        console.log(tempData);
      //window.open("https://www.w3schools.com");
        
/*        var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({
                "url": "https://www.google.com",
                "isredirect" :false
            });
            urlEvent.fire();*/
       var action = component.get("c.updatePassword");
     
        action.setParams({payLoad : tempData});
		console.log(action);
		action.setCallback(this,function(resp){
                //get the response state
                console.log("hello world");
                var state = resp.getState();
                console.log("test"+state);
                //check if result is successfull
                if(state == "SUCCESS"){
                    var result = resp.getReturnValue();
                    console.log("temp -> "+result);
                    str = JSON.stringify(result);
                   console.log(str);
                    	//component.set("v.lstPositions",result);
                    //
                } else if(state == "ERROR"){
                    alert('Error in calling server side action');
                }
            });
            
            //adds the server-side action to the queue        
            $A.enqueueAction(action);
/*
		var action = component.get("c.getOnlineStatementListFilter");
        action.setParams({'filter':'Last 4 quarters'});
		console.log(action);
		action.setCallback(this,function(resp){
                //get the response state
                var state = resp.getState();
                console.log("test"+state);
                //check if result is successfull
                if(state == "SUCCESS"){
                    var result = resp.getReturnValue();
                    console.log("temp"+result);
                    	//component.set("v.lstPositions",result);
                    //
                } else if(state == "ERROR"){
                    alert('Error in calling server side action');
                }
            });
            
            //adds the server-side action to the queue        
            $A.enqueueAction(action);*/
	},
        gotoURL : function (component) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          "url": "/006/o"
        });
        urlEvent.fire();
    },
    navigate : function(component) {
        //var address = '/Salesforce.com+Inc/@37.793779,-122.39448,17z/';
        /*var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          "url": 'https://www.google.com/'
        });
        urlEvent.fire();*/
        window.open('https://www.google.com/');
    }
		
})