({
    doInit: function (component, event, helper) {
        var langLocale = $A.get('$Locale.langLocale');
        var taxNode = component.get('v.taxonomyNode');
        var maxDepth = component.get('v.maxDepth');

        component.set('v.taxonomyList', taxNode.children);

        // find the multilingual tag path,
        var localeTagPath = taxNode.languageMapOfPaths[langLocale];

       // if localized tagPath not present, default to english
       if (!localeTagPath) {
            localeTagPath = taxNode.languageMapOfPaths['en_US'];
       }

        component.set('v.tagPath', taxNode.languageMapOfPaths['en_US']);
        component.set('v.depth', taxNode.depth);

        helper.checkMyPathAgainstSubscriptions(component, localeTagPath);

        if (taxNode.children.length > 0 && taxNode.depth < maxDepth ) {
            $A.createComponent(
                'c:ec_SubscriptionEditorList',
                {
                    depth:                  component.get('v.depth'),
                    maxDepth:               component.get('v.maxDepth'),
                    tagPath:                component.get('v.tagPath'),
                    taxonomyList:           component.get('v.taxonomyList'),                //children list
                    listClass:              'level-' + component.get('v.depth') + '-list',
                    taxonomyInstanceName:   component.get('v.taxonomyInstanceName'),
                    sitePrefix:             component.get('v.sitePrefix'),
                    treeId:                 component.get('v.nodeId'),
                    ariaLevel:              component.get('v.ariaLevel') + 1,
                    subscriptions: component.get('v.subscriptions'),
                    uuid: component.get('v.uuid'),
                    editMode: component.get('v.editMode')
                },
                function (newTaxonomyListCmp, status, errorMessage) {
                    // Add the List to the component array
                    if (status === 'SUCCESS') {
                        var body = component.get('v.body');
                        body.push(newTaxonomyListCmp);

                        component.set('v.body', body);
                        var classNames = component.get('v.classNames');
                        classNames += ' slds-item expandable';
                        component.set('v.classNames', classNames);
                    }
                    else if (status === 'INCOMPLETE') {
                        console.log('No response from server or client is offline.');
                    }
                    else if (status === 'ERROR') {
                        console.error('Error: ' + errorMessage);
                    }
                }
            );
        } else {
            // there are no children, disable the button (/hides/ the tree node expansion icon)
            component.set('v.buttonClass', 'slds-is-disabled');
        }
    },

    taxItemClicked: function (component, event) {
        if (component.get('v.editMode')) {
            var taxNode = component.get('v.taxonomyNode');
            // find the multilingual tag path,
            var localeTagPath = taxNode.languageMapOfPaths[$A.get('$Locale.langLocale')];

            // if localized tagPath not present, default to english
            if (!localeTagPath) {
                localeTagPath = taxNode.languageMapOfPaths['en_US'];
            }

            var subscribeTo = event.currentTarget.dataset.tagpath;
            if (subscribeTo.slice(1, subscribeTo.length).indexOf('/') !== -1) {
                // check to make sure that this isn't a root node by removing the first / and then seeing if other / exist
                var subscribed = component.get('v.subscribed'),
                    toggleSub = $A.get('e.c:ec_ToggleSubscriptionEvt');
                toggleSub.setParams({
                        'tagPath': subscribeTo,
                        'localeTagPath': localeTagPath,
                        'uuid': component.get('v.uuid')
                    }).fire();

                component.set('v.subscribed', !subscribed);
            }
        }
    },

    handleToggleTreeExpand: function(cmp, evt, helper){
        var expanded = cmp.get('v.ariaExpanded');
        expanded = !expanded;
        cmp.set('v.ariaExpanded', expanded);
    },

    handleAriaExpandedChange: function (cmp, evt, helper){
        var subUL = cmp.find('subMenu');
        $A.util.toggleClass(subUL, 'slds-is-expanded');
        $A.util.toggleClass(subUL, 'slds-is-collapsed');
    },

    toggleEditMode: function(component, event, helper) {
        var editMode = component.get('v.editMode');
        component.set('v.editMode', !editMode);
    }
})