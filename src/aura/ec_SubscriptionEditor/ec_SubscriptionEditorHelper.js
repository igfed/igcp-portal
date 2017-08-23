({
    reduceTaxonomyList : function(taxonomyBundle, tagPaths){
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

            if (tagPaths.indexOf(bundleTagPath) !== -1) {
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
    },

    toggleLoadingSpinner: function(component) {
        var spinner = component.find('loadingSpinner'),
            container = component.find('subscriptionContainer').getElement();
        if ($A.util.hasClass(spinner, 'hidden')) {
            $A.util.removeClass(spinner, 'hidden');
            $A.util.removeClass(container, 'loaded');
        } else {
            $A.util.addClass(spinner, 'hidden');
            $A.util.addClass(container, 'loaded');
        }
    },

    toggleEditMode: function(component) {
        var editMode = component.get('v.editMode');
        component.set('v.editMode', !editMode);

        var toggleEvt = $A.get('e.c:ec_ToggleSubscriptionEditEvt');
        toggleEvt.setParams({
            'uuid': component.getGlobalId()
        }).fire();
    },

    formatSubscriptions: function(component) {
        var subscriptions = component.get('v.localeSubscriptions'),
            taxonomies = [],
            taxonomyMap = {},
            subscriptionBadges = [];

        subscriptions.forEach(function(subscription) {
            if (subscription.charAt(0) == '/') {
                subscription = subscription.slice(1, subscription.length);
            }
            var taxonomy = subscription.split('/')[0];
            taxonomies.push(taxonomy);

            if (!taxonomyMap[taxonomy]) {
                taxonomyMap[taxonomy] = [];
            }
            taxonomyMap[taxonomy].push(subscription);
        });

        taxonomies = $o.unique(taxonomies).sort();

        taxonomies.forEach(function(taxonomy) {
            var paths = taxonomyMap[taxonomy],
                nodes = [];
            paths.forEach(function(path) {
                var pathList = path.split('/');
                var nodeObj = {
                    leaf: pathList[pathList.length - 1],
                    full: path
                };
                nodes.push(nodeObj);
            });

            var taxObj = {
                root: taxonomy,
                nodes: nodes
            };

            subscriptionBadges.push(taxObj);
        });

        component.set('v.subscriptionBadges', subscriptionBadges);
    },

    splitAndTrimPathList: function(tagPathString, splitOn) {
        var tagPaths = tagPathString.split(splitOn);
        for (var i = 0; i < tagPaths.length; i++) {
            var path = $o.trim(tagPaths[i]);
            // remove leading / if present
            if (path.slice(0, 1) === '/') {
                path = path.slice(1);
            }

            tagPaths[i] = path;
        }
        return tagPaths;
    }
})