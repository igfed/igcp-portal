({
    doInit: function(cmp, evt, hlpr){
        //Set scriptLoaded var to true
        if(!cmp.get('v.scriptLoaded')) {
            cmp.set('v.scriptLoaded', true);
        }
    },
    doneRendering: function(cmp, evt, hlpr){
        
        //TODO - This works except I can't get the 
        //footer event to fire, I am moving on to 
        //other stuff and will come back to this later
        
        if(!cmp.get("v.isDoneRendering")){
            
            cmp.set("v.isDoneRendering", true);
            //do something after component is first rendered
            
            // var footEvt = $A.get("e.c:checkFooterVisibleEvt");
            //  footEvt.setParams({"isVisible": true});
            // footEvt.fire();
          
            console.log('RENDERED');
          
            var checker;
        
            if(!cmp.get('v.scriptLoaded')) {
                
                //Begin polling to see if jQuery is loaded
                checker = setInterval(function(){
                    if(cmp.get('v.scriptLoaded')) {
                        clearInterval(checker);
                        
                        //Initialize scrolling evt
                        hlpr.onScrolling(cmp, hlpr, $A.getCallback(onFooterCallback));
                    }
                }, 500);
            } else {
                //Initialize scrolling evt
                hlpr.onScrolling(cmp, hlpr, $A.getCallback(onFooterCallback));
            }
        }
        
        function onFooterCallback(params){
    
        }
    },
    fireFooterEvent: function(cmp, event) {
      
      var footEvt = cmp.getEvent('onFooterEvt');
            footEvt.setParams({
                "isVisible": true
            });
            footEvt.fire();
    },
})