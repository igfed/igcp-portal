({
    doInit : function(component, event, helper) {
        var taxList = component.get('v.taxonomyList'),
            maxDepth = component.get('v.maxDepth');

        for (var i = 0, j = taxList.length; i < j; i++) {
            // console.log ('taxNode in TaxListController:');
            // console.log (taxList[i]);
            // console.log ('maxDepth: ' + maxDepth);

            // multilingual - try to find user’s language in language map of tag names - default to english if not found
            var langLocale = $A.get('$Locale.langLocale');
            var taxName = taxList[i].languageMapOfTagNames[langLocale];

            if (!taxName) {
                taxName = taxList[i].languageMapOfTagNames['en_US'];
            }

            var nodeId = component.get('v.treeId');
            // if the last character of the current nodeId is not a number, it is adding first Node #, don't add hyphen.
            // Node ID will be in format: tree#-Node#-#-#
            nodeId = isNaN(nodeId.slice(-1)) ? nodeId + i : nodeId + '-' + i;

            $A.createComponent(
                'c:ec_SubscriptionEditorItem',
                {
                    taxonomyNode: taxList[i],
                    taxonomyItemName : taxName,
                    maxDepth: maxDepth,
                    taxonomyInstanceName: component.get('v.taxonomyInstanceName'),
                    sitePrefix: component.get('v.sitePrefix'),
                    nodeId: nodeId,
                    ariaLevel: component.get('v.ariaLevel'),
                    subscriptions: component.get('v.subscriptions'),
                    uuid: component.get('v.uuid'),
                    editMode: component.get('v.editMode')
                },
                $o.createComponentCallbackFor(component)
            );
        }
    },

    doneRendering : function (component, event, helper) {
        component.set('v.currentTagPath', component.get('v.tagPath'));
        // console.log('DONE RENDERING current tag path');
        // console.log(component.get('v.currentTagPath'));
        // console.log(component.get('v.tagPath'));
        // console.log(component.get('v.depth'));

    },

    currentTagChanged : function (component, event, helper) {
        component.set('v.currentTagChanged', true);
    },

    handleRefreshTaxonomyMenu : function(cmp,evt){
        console.log('handleRefreshTaxonomyMenu fired from list controller');
    }
})