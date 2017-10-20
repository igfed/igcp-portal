({
	callServer : function(component, method, callback, params, cacheable) {
        var action = component.get(method);
        if (params) {
            action.setParams(params);
        }
        if (cacheable) {
            action.setStorable();
        }

        action.setCallback(this, function(response) {
            var state = response.getState();

            if (state === 'SUCCESS') {
                // pass returned value to callback function
                callback.call(this, response.getReturnValue());
            } else if (state === 'ERROR') {
                var errors = response.getError();

                if (errors) {
                    $A.log('Errors', errors);
                    if (errors[0] && errors[0].message) {
                        throw new Error('Error' + errors[0].message);
                    }
                } else {
                    throw new Error('Unknown Error');
                }
            }
        });

        $A.enqueueAction(action);
    },

    fixLinksInBuilder: function(href, communityUrl, prefix) {
        //  something odd from the demo org
        // builder's getSiteData.siteUrl returns a livepreview url instead of the community url
        // look for --livepreview and remove it.
        // also, since all our links are absolute, builder complains about cross-origin whenever you
        // attempt to click anything...
        if (window.location.href.indexOf('livepreview.') !== -1) {
            var regex = new RegExp(communityUrl + '/s', 'g');
            href = href.replace(regex, window.location.origin + '/' + prefix + '/s');
        }
        return href;
    }
})