({
    doInit: function (component, event, helper) {
        component.invocationCallbacks = {};
    },

    doInvoke: function (component, event, helper) {


        var vfBaseURL = component.get("v.vfBaseURL");
        var topic = component.get("v.topic");
        var args = event.getParam('arguments');
        var invocationId = helper.getUniqueId();
        component.invocationCallbacks[invocationId] = args.callback;
        var message = {
            topic: topic,
            invocationId: invocationId,
            methodName: args.methodName,
            methodParams: args.methodParams
        };
        var vf = component.find("vfFrame").getElement().contentWindow;
        vf.postMessage(message, vfBaseURL);
    }

})