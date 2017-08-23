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

        component.set('v.tagPath', localeTagPath);
        component.set('v.depth', taxNode.depth);

        if (component.get('v.urlPath')) {
            helper.checkMyPathAgainstPath(component, component.get('v.urlPath'));
        }

        if (taxNode.children.length > 0 && taxNode.depth < maxDepth ) {
            $A.createComponent(
                'c:ec_TaxonomyMenuList',
                {
                    depth:                  component.get('v.depth'),
                    maxDepth:               component.get('v.maxDepth'),
                    tagPath:                component.get('v.tagPath'),
                    taxonomyList:           component.get('v.taxonomyList'),                //children list
                    listClass:              'level-' + component.get('v.depth') + '-list',
                    taxonomyInstanceName:   component.get('v.taxonomyInstanceName'),
                    sitePrefix:             component.get('v.sitePrefix'),
                    treeId:                 component.get('v.nodeId'),
                    urlPath:                component.get('v.urlPath'),
                    ariaLevel:              component.get('v.ariaLevel') + 1
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

    taxItemClicked: function (cmp, evt) {
        var appEvent = $A.get('e.c:ec_RefreshTaxonomyMenuEvt');
        appEvent.setParams({'eventElement': evt});
        appEvent.fire();

        var taxClickedEvt = $A.get('e.c:ec_ChangeTaxonomyPathEvt'),
            el = evt.currentTarget,
            tag = el.dataset.tagpath;

        taxClickedEvt.setParams({
            tagPath: tag,
            taxonomyInstanceName: cmp.get('v.taxonomyInstanceName'),
            scrollIntoView: true
        }).fire();

        sessionStorage.setItem('tagpath', tag);
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

    handleRefreshTaxonomyMenu: function(cmp,evt,helper){
        var taxonomyInstanceName = evt.getParams('taxonomyInstanceName').taxonomyInstanceName;
        if (taxonomyInstanceName === cmp.get('v.taxonomyInstanceName')){
	        var selectedTagPath = evt.getParams('tag').tagPath;
            helper.checkMyPathAgainstPath(cmp, selectedTagPath);
        }   
    }
})