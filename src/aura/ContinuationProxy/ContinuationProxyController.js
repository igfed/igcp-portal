({
    doInit: function (component, event, helper) {


        try {
            console.info("ContinuationProxy: doInit: start");
            component.invocationCallbacks = {};

            var action = component.get("c.getVFBaseURL");
            action.setStorable();
            action.setCallback(this, function (response) {
                var vfBaseURL = response.getReturnValue();
                component.set("v.vfBaseURL", vfBaseURL);

                window.addEventListener("message", function (event) {
                    console.log("M E S S A G E  R E T U R N E D: ", event);
                    if (event.origin !== "https://" + component.get("v.vfBaseURL")) {
                        // Not the expected origin: reject message
                        console.error("ContinuationProxy: Not the expected origin: reject message");
                        return;
                    }

                    // Only handle messages we are interested in
                    // Retrieve the callback for the specified invocation id
                    var callback = component.invocationCallbacks[event.data.invocationId];
                    if (callback && typeof callback == 'function') {
                        callback(event.data.result);
                        delete component.invocationCallbacks[event.data.invocationId];
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
            // console.log("=====> " + component.find("vfFrame"));
            // console.log("=====> " + component.find("vfFrame").getElement());
            // console.log("=====> " + component.find("vfFrame").getElement().contentWindow);

            helper.setPromise(
                component,
                function () {
                    console.info("S U C C E S S");
                    var vf = component.find("vfFrame").getElement().contentWindow;
                    console.log("v.vfBaseURL: ", component.get("v.vfBaseURL"));
                    vf.postMessage(message, "https://" + component.get("v.vfBaseURL"));
                },
                function (error) {
                    console.error("E R R O R");
                    console.error(error);
                });
        } catch (err) {
            console.error(err);
        }
    },
    onIFrameLoaded: function (cmp, evt, hlpr) {
        cmp.set("v.contentWindow", cmp.find("vfFrame").getElement().contentWindow);
    }
})