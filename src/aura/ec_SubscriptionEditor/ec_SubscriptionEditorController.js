({
    doInit : function(component, event, helper) {
    },

    scriptLoad: function(component, event, helper) {
        helper.toggleLoadingSpinner(component);
        var tagPathString = component.get('v.tagPaths'),
            pathname = window.location.pathname.split('/'),
            profileId = pathname[pathname.length - 1];
        var langCode = $A.get('$Locale.language');
        if (langCode == 'en') {
            langCode = 'en_US';
        }

        // Do not attempt to retrieve a taxonomy if taxonomy name is not supplied or if Site Name not supplied
        if (tagPathString) {
            var tagPaths = helper.splitAndTrimPathList(tagPathString, ',');

            $o.callServer(component, 'c.getTaxonomies', function (response) {
                response = JSON.parse(response);
                var showOthersSubs = component.get('v.showOthersSubs');
                if (!showOthersSubs && response.otherUser) {
                    component.set('v.hideEverything', true);
                    return;
                }

                var siteData = response.siteData,
                    taxBundles = response.taxonomyBundles,
                    maxDepth = component.get('v.maxDepth');
                component.set('v.sitePrefix', siteData.prefix);
                component.set('v.subscriptions', response.subscriptions);
                component.set('v.originalSubscriptions', response.subscriptions);
                component.set('v.allowEdit', response.allowEdit);

                // valid maxDepth is between 1 and 5.
                if (maxDepth < 1) {
                    maxDepth = 1;
                } else if (maxDepth > 5) {
                    maxDepth = 5;
                }

                if (taxBundles) {
                    taxBundles.forEach(function (taxBundle) {
                        var startingBundle = helper.reduceTaxonomyList(taxBundle, tagPaths),
                            nodeName = startingBundle.languageMapOfTagNames[$A.get('$Locale.langLocale')];
                        if (!nodeName) {
                            var keys = Object.keys(startingBundle.languageMapOfTagNames);
                            nodeName = startingBundle.languageMapOfTagNames[keys[0]];
                        }

                        component.set('v.maxDepth', startingBundle.depth + maxDepth);

                        if (component.get('v.showHeader')) {
                            // include the parent node as part of the tree
                            $A.createComponent(
                                'c:ec_SubscriptionEditorItem',
                                {
                                    taxonomyNode: startingBundle,
                                    taxonomyItemName: nodeName,
                                    maxDepth: component.get('v.maxDepth'),
                                    sitePrefix: component.get('v.sitePrefix'),
                                    nodeId: component.getGlobalId() + '_tree0-Node',
                                    ariaLevel: 1,
                                    ariaExpanded: component.get('v.loadedAsOnboarding'),
                                    subscriptions: response.subscriptions,
                                    uuid: component.getGlobalId(),
                                    editMode: component.get('v.editMode')
                                },
                                $o.createComponentCallbackFor(component)
                            );
                        } else {
                            // insert the first taxonomy list into the body of the menu component
                            $A.createComponent(
                                'c:ec_SubscriptionEditorList',
                                {
                                    maxDepth: component.get('v.maxDepth'),
                                    tagPath: component.get('v.tagPath'),
                                    taxonomyList: startingBundle.children,
                                    listClass: 'root-level-list slds-tree',
                                    sitePrefix: component.get('v.sitePrefix'),
                                    treeId: component.getGlobalId() + '_tree0-Node',
                                    ariaLevel: 1,
                                    subscriptions: response.subscriptions,
                                    uuid: component.getGlobalId(),
                                    editMode: component.get('v.editMode')
                                },
                                $o.createComponentCallbackFor(component)
                            );
                        }
                    });
                }

                helper.toggleLoadingSpinner(component);
            }, {
                tagPaths: tagPaths,
                siteName: component.get('v.siteName'),
                profileIdString: profileId,
                showOthersSubs: component.get('v.showOthersSubs'),
                langCode: langCode
            });
        } else {
            component.set('v.errorMessage', 'No taxonomy starting path provided.');
            helper.toggleLoadingSpinner(component);
        }
    },
    toggleLoadingSpinner: function(component, event, helper) {
        helper.toggleLoadingSpinner(component);
    },
    toggleSubscription: function(component, event, helper) {
        if (component.get('v.editMode') && event.getParam('uuid') == component.getGlobalId()) {
            var subscriptions = component.get('v.subscriptions'),
                localeSubscriptions = component.get('v.localeSubscriptions'),
                subscribeTo = event.getParam('tagPath'),
                localeSubscribeTo = event.getParam('localeTagPath'),
                index = subscriptions.indexOf(subscribeTo),
                localeIndex = localeSubscriptions.indexOf(localeSubscribeTo);

            if (index !== -1) {
                subscriptions.splice(index, 1);
                console.log('Unsubscribed from ' + subscribeTo);
            } else {
                subscriptions.push(subscribeTo);
                console.log('Subscribed to ' + subscribeTo);
            }
            component.set('v.subscriptions', subscriptions);

            if (localeIndex !== -1) {
                localeSubscriptions.splice(index, 1);
            } else {
                localeSubscriptions.push(localeSubscribeTo);
            }
            component.set('v.localeSubscriptions', localeSubscriptions);
        }
    },
    toggleEditMode: function(component, event, helper) {
        helper.toggleEditMode(component);
    },
    cancelEditMode: function(component, event, helper) {
        var origSubscriptions = component.get('v.originalSubscriptions');
        component.set('v.subscriptions', origSubscriptions);
        if (component.get('v.loadedAsOnboarding')) {
            $o.callServer(component, 'c.skipOnboarding', function(response) {
                var completeEvt = $A.get('e.c:ec_CompleteOnboardingEvt');
                completeEvt.fire();
            });
        } else {
            helper.toggleEditMode(component);
        }
    },
    saveEditMode: function(component, event, helper) {
        var subscriptions = component.get('v.subscriptions'),
            tagPathString = component.get('v.tagPaths');
        component.set('v.originalSubscriptions', subscriptions);

        var taxonomies = helper.splitAndTrimPathList(tagPathString, ',');
        var langCode = $A.get('$Locale.language');
        if (langCode == 'en') {
            langCode = 'en_US';
        }

        helper.toggleLoadingSpinner(component);
        $o.callServer(component, 'c.setSubscriptions', function(response) {
            // response = JSON.parse(response);
            // debugger;
            if (component.get('v.loadedAsOnboarding')) {
                var completeEvt = $A.get('e.c:ec_CompleteOnboardingEvt');
                completeEvt.fire();
            } else {
                helper.toggleEditMode(component);
                helper.toggleLoadingSpinner(component);
            }

            var changeSubsEvt = $A.get('e.c:ec_ChangeSubscriptionsEvt');
            changeSubsEvt.setParams({
                tagPaths: subscriptions
            }).fire();

        }, {
            tagPaths: subscriptions,
            siteName: component.get('v.siteName'),
            taxonomies: taxonomies,
            langCode: langCode
        });

    },
    formatSubscriptions: function(component, event, helper) {
        helper.formatSubscriptions(component);
    },
    goToArea: function(component, event, helper) {
        if (component.get('v.areaPageName')) {
            var destination = event.currentTarget.title;
            if (destination.charAt(0) != '/') {
                destination = '/' + destination;
            }

            $o.navigateToURL(
                component.get('v.areaPageName'),
                {
                    tagpath: destination,
                    sname: component.get('v.siteName')
                },
                true
            );
        }
    },
    matchSubscription: function(component, event, helper) {
        var localeSubscriptions = component.get('v.localeSubscriptions');
        localeSubscriptions.push(event.getParam('tagPath'));
        component.set('v.localeSubscriptions', localeSubscriptions);
    }


})