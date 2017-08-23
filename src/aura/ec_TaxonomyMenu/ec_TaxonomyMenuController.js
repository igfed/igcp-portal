({
    doInit : function(component, event, helper) {
    },

    scriptLoad: function(component, event, helper) {
        component.set('v.siteName', component.get('v.orchestraCMSSiteName')); // TODO replace orchestraCMSSiteName with siteName

        var langCode = $A.get('$Locale.language');
        if (langCode == 'en') {
            langCode = 'en_US';
        }

        // determine the taxonomy name from the first node of the starting path.
        var tagPath = component.get('v.tagPath');

        // remove leading / if present
        if (tagPath.slice(0, 1) === '/') {
            tagPath = tagPath.slice(1);
        }

        var tagPathNodes = tagPath.split('/');
        component.set('v.taxonomyName', tagPathNodes[0]);

        // determine the header to show.  If no custom header is supplied, the last category node from the
        // tagPath will be used as the heading.
        if (!component.get('v.taxonomyTopNodeLabel') || component.get('v.taxonomyTopNodeLabel') === '') {
            component.set('v.taxonomyTopNodeLabel', tagPathNodes[tagPathNodes.length - 1]);
        }

        var spinner = component.find('loadingSpinner');
        $A.util.removeClass(spinner, 'hidden');

        // Do not attempt to retrieve a taxonomy if taxonomy name is not supplied or if Site Name not supplied
        if (component.get('v.taxonomyName') != '') {
            $o.callServer(component, 'c.getTaxonomies', function (response) {
                response = JSON.parse(response);
                var siteData = response.siteData,
                    taxBundle = response.taxonomyBundle,
                    startingBundle = helper.reduceTaxonomyList(component.get('v.tagPath'), taxBundle);
                
                component.set('v.taxonomyList', startingBundle.children);
                component.set('v.sitePrefix', siteData.prefix);

                // valid maxDepth is between 1 and 5.
                var maxDepth = component.get('v.maxDepth');
                if (maxDepth < 1) {
                    maxDepth = 1;
                } else if (maxDepth > 5) {
                    maxDepth = 5;
                }
                component.set('v.maxDepth', startingBundle.depth + maxDepth);

                if (component.get('v.showHeader')) {
                    // include the parent node as part of the tree
                    $A.createComponent(
                        'c:ec_TaxonomyMenuItem',
                        {
                            taxonomyNode:           startingBundle,
                            taxonomyItemName:       component.get('v.taxonomyTopNodeLabel'),
                            maxDepth:               component.get('v.maxDepth'),
                            taxonomyInstanceName:   component.get('v.taxonomyInstanceName'),
                            sitePrefix:             component.get('v.sitePrefix'),
                            nodeId:                 component.getGlobalId() + '_tree0-Node',
                            urlPath:                $o.urlParameter('tagpath'),
                            ariaLevel:              1,
                            ariaExpanded:           true
                        },
                        $o.createComponentCallbackFor(component)
                    );
                } else {
                    // insert the first taxonomy list into the body of the menu component
                    $A.createComponent(
                        'c:ec_TaxonomyMenuList',
                        {
                            maxDepth:               component.get('v.maxDepth'),
                            tagPath:                component.get('v.tagPath'),
                            taxonomyList:           component.get('v.taxonomyList'),
                            listClass:              'root-level-list slds-tree',
                            taxonomyInstanceName:   component.get('v.taxonomyInstanceName'),
                            sitePrefix:             component.get('v.sitePrefix'),
                            treeId:                 component.getGlobalId() + '_tree0-Node',
                            urlPath:                $o.urlParameter('tagpath'),
                            ariaLevel:              1
                        },
                        $o.createComponentCallbackFor(component)
                    );
                }

                $A.util.addClass(spinner, 'hidden');
            }, {
                taxonomyName: component.get('v.taxonomyName'),
                siteName: component.get('v.orchestraCMSSiteName'),
                langCode: langCode
            });
        } else {
            console.warn('empty v.taxonomyName');
            $A.util.addClass(spinner, 'hidden');
        }
    },

    handleLoadTaxonomyContent : function(cmp, evt, helper) {
        var tagPath = evt.getParam('tagPath'),
            thisElementId = cmp.getElement().getAttribute('id'),
            domElementList = document.getElementById(thisElementId).getElementsByTagName('LI'),
            targetElement;
        
        // only perform the check if this is a 'matched' menu to the loader
        if (cmp.get('v.taxonomyInstanceName') == evt.getParam('taxonomyInstanceName')) {
            // find the menu LI element containing the A element which matches the supplied tag path
            for (var i = 0; i < domElementList.length; i++) {
                // find the data-tagpath from the FIRST anchor under this element.
                if (domElementList[i].getElementsByTagName('a')[0].getAttribute('data-tagpath') == tagPath) {
                    targetElement = domElementList[i];
                    break;
                }
            }
            if (targetElement) {
                helper.setActiveLI(thisElementId,targetElement);
            } else {
                // console.error ('No matching elements found for taxonomy tag');
            }
        }
    },

    handleRefreshTaxonomyMenu : function(cmp, evt, helper) {
        var elementId = cmp.getElement().getAttribute('id');
        var sourceElementId = evt.getSource().getElement().getAttribute('id');
        var thisEl = document.getElementById(elementId);
        var sourceEl = document.getElementById(sourceElementId);

        // var domElementList = document.getElementById(elementId).getElementsByTagName('LI');
        if (thisEl.contains(sourceEl)){
            helper.setActiveLI(elementId, sourceEl);
        }
    },

    taxListLoaded : function (cmp, evt, helper) {
        cmp.set('v.taxListLoaded', true);
    },
    
    taxItemClicked: function (cmp, evt, helper) {
        var appEvent = $A.get('e.c:ec_RefreshTaxonomyMenuEvt');
        appEvent.setParams({'eventElement': evt});
        appEvent.fire();

        var taxClickedEvt = $A.get('e.c:ec_ChangeTaxonomyPathEvt'),
            el = evt.currentTarget;
        
        taxClickedEvt.setParams({
            tagPath: cmp.get('v.tagPath'),
            taxonomyInstanceName : cmp.get('v.taxonomyInstanceName')
        }).fire();
    },

    toggleEditSubscriptions: function(component, event, helper) {
        var editMode = component.get('v.editMode');
        component.set('v.editMode', !editMode);
    }
})