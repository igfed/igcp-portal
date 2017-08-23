({
    scriptLoad: function(component, event, helper) {
        var tagPath = component.get('v.tagPath');
        var originId = component.get('v.originId');
        component.set('v.displayButton', false);

        if (originId) {
            $o.callServer(component, 'c.isUserSubscribedToOriginId', function (response) {
                response = JSON.parse(response);
                component.set('v.subscribed', response.subscribed);
                component.set('v.displayButton', true);
            }, {
                originId: component.get('v.originId'),
                siteName: component.get('v.siteName')
            });
        }
        else if (tagPath.slice(1, tagPath.length).indexOf('/') !== -1) {
            $o.callServer(component, 'c.isUserSubscribedToPath', function (response) {
                response = JSON.parse(response);
                component.set('v.subscribed', response.subscribed);
                component.set('v.displayButton', true);
            }, {
                tagPath: component.get('v.tagPath'),
                siteName: component.get('v.siteName')
            });
        }
    },

    toggleSubscription: function(component, event, helper) {
        
        event.stopPropagation();

        var subscribeToTagPath = component.get('v.tagPath'),
            subscribeToOriginId = component.get('v.originId'),
            subscribed = component.get('v.subscribed');

        if (subscribeToOriginId) {
            $o.callServer(component, 'c.subscribeToOriginId', function(response) {
                // toggle the current known subscribed value
                component.set('v.subscribed', !subscribed);

                var changeSubsEvt = $A.get('e.c:ec_ChangeSubscriptionsEvt');
                changeSubsEvt.fire();
            }, {
                originId: subscribeToOriginId,
                siteName: component.get('v.siteName')
            });
        } else {
            $o.callServer(component, 'c.subscribeToPath', function(responseJson) {
                var response = JSON.parse(responseJson);
                if (response.success) {
                    var changeSubsEvt = $A.get('e.c:ec_ChangeSubscriptionsEvt'),
                        subscribedPaths = [];

                    if (response.subscribed) {
                        subscribedPaths.push(response.tagPath);
                    }
                    changeSubsEvt.setParams({
                        tagPaths: subscribedPaths
                    }).fire();
                }
            }, {
                tagPath: subscribeToTagPath,
                siteName: component.get('v.siteName')
            });
        }


    },

    changeTagPath: function(component, event, helper) {
        var tagPath = component.get('v.tagPath');
        if (tagPath.slice(1, tagPath.length).indexOf('/') !== -1) {
            component.set('v.displayButton', true);
        } else {
            component.set('v.displayButton', false);
        }
    },

    changeSubscription: function(component, event, helper) {
        var tagPaths = event.getParam('tagPaths');
        if (tagPaths.indexOf(component.get('v.tagPath')) !== -1) {
            // toggle the current known subscribed value
            component.set('v.subscribed', true);
        } else {
            component.set('v.subscribed', false);
        }
    }
})