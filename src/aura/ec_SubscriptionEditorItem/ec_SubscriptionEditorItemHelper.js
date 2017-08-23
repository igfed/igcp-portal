({
    checkMyPathAgainstSubscriptions: function(component, localeTagPath) {
        var subscriptions = component.get('v.subscriptions'),
            myTagPath = component.get('v.tagPath');

        if (subscriptions.indexOf(myTagPath) !== -1) {
            component.set('v.subscribed', true);

            var subMatch = $A.get('e.c:ec_SubscriptionMatchEvt');
            subMatch.setParams({
                'tagPath': localeTagPath
            }).fire();

        }

        // if a subscription starts with myTagPath but doesn't fully match, expand child menu
        subscriptions.forEach(function(subscription) {
            var subStr = subscription.substr(0, myTagPath.length);
            if (subStr === myTagPath) { // TODO it's possible that a subscription of "/Global/Europe & Asia" will cause "/Global/Europe" to mark itself expanded
                component.set('v.ariaExpanded', true);
            }
        });

    }
})