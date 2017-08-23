({
    callServer : function(component,method,callback,params,cacheable) {
        var action = component.get(method);

        if (params) {
            action.setParams(params);
        }

        if (cacheable) {
            action.setStorable();
        }

        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                // pass returned value to callback function
                callback.call(this,response.getReturnValue());
            } else if (state === 'ERROR') {
                // generic error handler
                var errors = response.getError();
                if (errors) {
                    $A.log('Errors', errors);
                    if (errors[0] && errors[0].message) {
                        throw new Error('Error in response: ' + errors[0].message);
                    }
                } else {
                    throw new Error('Unknown Error');
                }
            }
        });
        $A.enqueueAction(action);
    },

    setActiveLI : function(containerId, activeElement){
        //this function will traverse the LI items under the currently identified node.  It will reset all the active
        //class names (make them non-active), then set the specified element to active.
        var domElementList = document.getElementById(containerId).getElementsByTagName('LI');
        for (var i = 0; i < domElementList.length; i++){
            //console.log(domElementList[i].className)
            //remove the active classname from all LI elements
            // domElementList[i].className = domElementList[i].className.replace( /(?:^|\s)slds-is-active(?!\S)/ , '' );
            domElementList[i].classList.remove('slds-is-active');
        }
        activeElement.classList.add('slds-is-active');
    },

    reduceTaxonomyList : function(tagPath, taxonomyBundle){
        var bundleArr = [];
        var returnBundle;
        var langLocale = $A.get('$Locale.langLocale');
        //make use of the following when multilingual design is enabled:
        //var lang = $A.get('$Locale.langLocale');
        this.createBundleArray(bundleArr,taxonomyBundle);
        //loop through the bundle array to find the correct starting bundle
        for (var i = 0; i < bundleArr.length; i++){
            //get the localized path name.
            var bundleTagPath = bundleArr[i].languageMapOfPaths[langLocale];
            if (!bundleTagPath) {
                //default to english if no localized version.
                bundleTagPath = bundleArr[i].languageMapOfPaths['en_US'];
            }

            if (bundleTagPath === tagPath) {
                returnBundle = bundleArr[i];
            }
        }
        //if we didn't find the specified starting node, return the full taxonomy bundle.
        if (!returnBundle){
            returnBundle = taxonomyBundle;
        }

        return returnBundle;
    },

    createBundleArray : function(taxonomyBundleArray, taxonomyBundle){
        for (var i = 0; i < taxonomyBundle.children.length; i++){
            this.createBundleArray(taxonomyBundleArray, taxonomyBundle.children[i]);
        }
        taxonomyBundleArray.push(taxonomyBundle);
    }
})