({
	render: function (cmp, hlpr) {
		var ret = this.superRender();
		return ret;
	},
	rerender: function (cmp, hlpr) {
	},
	afterRender: function (component, hlpr) {
        // var action = component.get("c.getVFBaseURL");
        // action.setStorable();


        // return new Promise($A.getCallback(function(resolve, reject) {
        //     // do something

        //     action.setCallback(this, function (response) {
        //         var vfBaseURL = response.getReturnValue();
        //         component.set("v.vfBaseURL", vfBaseURL);
        //         var topic = component.get("v.topic");
        //         window.addEventListener("message", function (event) {
        //             if (event.origin !== vfBaseURL) {
        //                 // Not the expected origin: reject message
        //                 reject("Not the expected origin: reject message");
        //                 return;
        //             }
        //             // Only handle messages we are interested in
        //             if (event.data.topic === topic) {
        //                 // Retrieve the callback for the specified invocation id
        //                 var callback = component.invocationCallbacks[event.data.invocationId];
        //                 if (callback && typeof callback == 'function') {
        //                     resolve(event.data.result);
        //                     delete component.invocationCallbacks[event.data.invocationId];
        //                 }
        //             }
        //         }, false);
        //     });
          
            // if (/* success */) {
            //   resolve("Resolved");
            // }
            // else {
            //   reject("Rejected");
            // }
          //}));

        // action.setCallback(this, function (response) {
        //     var vfBaseURL = response.getReturnValue();
        //     component.set("v.vfBaseURL", vfBaseURL);
        //     var topic = component.get("v.topic");
        //     window.addEventListener("message", function (event) {
        //         if (event.origin !== vfBaseURL) {
        //             // Not the expected origin: reject message
        //             return;
        //         }
        //         // Only handle messages we are interested in
        //         if (event.data.topic === topic) {
        //             // Retrieve the callback for the specified invocation id
        //             var callback = component.invocationCallbacks[event.data.invocationId];
        //             if (callback && typeof callback == 'function') {
        //                 callback(event.data.result);
        //                 delete component.invocationCallbacks[event.data.invocationId];
        //             }
        //         }
        //     }, false);
        // });
        //$A.enqueueAction(action);
		this.superAfterRender();
	}
})