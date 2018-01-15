({
    doInit: function (component, event, helper) {

         
        try {
            console.info("ContinuationProxy: doInit: start");
            component.invocationCallbacks = {};
      
            var action = component.get("c.getVFBaseURL");
            action.setStorable();
            action.setCallback(this, function (response) {
              var vfBaseURL = response.getReturnValue();
      
              console.log("######");
              console.info(vfBaseURL);
              console.log("######");
      
              component.set("v.vfBaseURL", vfBaseURL);
              var topic = component.get("v.topic");
              
              window.addEventListener("message", function (event) {
                console.log("event.origin: " + event.origin);
                if (event.origin !== vfBaseURL) {
                  // Not the expected origin: reject message
                  console.error("ContinuationProxy: Not the expected origin: reject message");
                  return;
                }
      
                console.info("TOPIC: start");
                console.log(event.data.topic);
                console.log(topic);
                console.info("TOPIC: end");
      
                // Only handle messages we are interested in
                if (event.data.topic === topic) {
                  // Retrieve the callback for the specified invocation id
                  var callback = component.invocationCallbacks[event.data.invocationId];
                  if (callback && typeof callback == 'function') {
                    console.log(event.data.result);
                    callback(event.data.result);
                    delete component.invocationCallbacks[event.data.invocationId];
                  }
                }
              }, false);
            });
            $A.enqueueAction(action);
            console.info("ContinuationProxy: doInit: end");
          } catch (err) {
            console.error("ContinuationProxy: doInit: ");
            console.error(err);
          }

    },

    doInvoke: function (component, event, helper) {
        console.info("DO INVOKE WAS CALLED");

        try {
            //component.find("CP_Utils").waitForDefined(component, "v.vfBaseURL", function(val){

                console.log("READY");
                //console.log(val);
                var vfBaseURL = component.get("v.vfBaseURL");
                var topic = component.get("v.topic");
                var args = event.getParam('arguments');
                var invocationId = helper.getUniqueId();

                console.log("topic: " + topic);
                console.log("args: " + args);
                console.log("invocationId: " + invocationId);
        
                component.invocationCallbacks[invocationId] = args.callback;

                var message = {
                    topic: topic,
                    invocationId: invocationId,
                    methodName: args.methodName,
                    methodParams: args.methodParams
                };
                
                console.log("=====> " + component.find("vfFrame"));
                console.log("=====> " + component.find("vfFrame").getElement());
                console.log("=====> " + component.find("vfFrame").getElement().contentWindow);

                var vf = component.find("vfFrame").getElement().contentWindow;
                vf.postMessage(message, vfBaseURL);

                console.log("Message Posted");
            //});
        } catch(err) {
            console.error(err);
        }
    }

})