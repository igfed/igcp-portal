({
    doInit : function(component, event, helper) {
        if (!('ontouchstart' in document.documentElement)){
            var loaderComponent =  component.find('taxLoaderContentItems');
            $A.util.addClass(loaderComponent,'no-touch');
        }
    },

    scriptLoad: function(component, event, helper) {
        component.set('v.origLimitCount', component.get('v.limitCount'));

        var path = $o.urlParameter('tagpath');
        if (path) {
            component.set('v.tagPaths', path);
        }
        helper.setupComponent(component, event, helper, true, true);
    },

    reInit : function(component, event, helper) {
        console.log('–•– TLController: reInit –•–');
        helper.setupComponent(component, event, helper, true, true);
        if (component.get('v.internalTagPathChange')) {
            //fire app event indicating the tagPath has changed.
            var tagPathEvent = $A.get('e.c:ec_ChangeTaxonomyPathEvt');
            tagPathEvent.setParams({
                'tagPath': component.get('v.tagPaths'),
                'taxonomyInstanceName': component.get('v.taxonomyInstanceName'),
                'scrollIntoView': false
            });
            tagPathEvent.fire();
            component.set('v.internalTagPathChange', false);
        }
    },

    handleLoadTaxonomyContent : function (component, event, helper) {
        var eventTaxonomyMenu = event.getParam("taxonomyInstanceName");
        //var contentLayouts = [component.get("v.layoutsForTaxonomy")];
        var myTaxonomyInstanceName = component.get("v.taxonomyInstanceName");
        if (eventTaxonomyMenu == myTaxonomyInstanceName) {
            var tagPath = event.getParam("tagPath");
            var scrollIntoView = event.getParam("scrollIntoView");
            // attempt to have page scroll to top of loader if the fired event calls for it.
            // typically only fires when a user has intentionally selected a taxonomy menu item.
            var container = component.getElement();
            var device = $A.get("$Browser.formFactor");
            if (container && scrollIntoView && device != 'DESKTOP' && screen.width < 768){
                container.scrollIntoView(true);
            }
            component.set('v.limitCount', component.get('v.origLimitCount'));
            component.set("v.tagPaths",tagPath);
            component.set('v.originId', null);
        }
    },
    hideDetail : function(component, event, helper) {
        var originId = component.get('v.originId');
        if (event.getParam('originId') == originId) {
            component.set('v.originId', null);
        }
    },
    toggleDetail : function(component, event, helper) {
        var taxItems = component.find('taxLoaderContent');
        var taxDetail = component.find('taxLoaderDetail');

        var originId = component.get('v.originId');
        if (originId) {
            helper.showDetail(component, event, helper);
            component.set('v.showBreadcrumb', false);
            $A.util.addClass(taxItems, 'hidden');
            $A.util.removeClass(taxDetail, 'hidden');
        } else {
            component.set('v.showBreadcrumb', true);
            $A.util.removeClass(taxItems, 'hidden');
            $A.util.addClass(taxDetail, 'hidden');
        }
    },

    completeOnboarding: function(component, event, helper) {
        var container = component.find('onboarding'),
            spinner = component.find('loadingSpinner');
        $A.util.addClass(container, 'hidden');
        $A.util.removeClass(spinner, 'hidden');

        helper.setupComponent(component, event, helper, true, true);
    },

    loadMore : function(component, event, helper) {
        var increment = component.get('v.incrementCount');
        var limitCount = component.get('v.limitCount');
        limitCount += increment;
        component.set('v.limitCount', limitCount);

        helper.setupComponent(component, event, helper, true, true);    // component, event, helper, showLoadingIndicator, setNewsRead
    },

    likeContent : function(component, event, helper) {
        var id = component.get('v.likedContent'),
            likedContentList = component.get('v.likedContentList'),
            langCode = $A.get('$Locale.language'),
            action = 'setLikeContent';
        if (langCode === 'en') {
            langCode = 'en_US';
        }

        if (id) {
            if (likedContentList.indexOf(id) !== -1) {
                action = 'setUnlikeContent'
            }
            $o.callServer(component, 'c.' + action, function (json) {
                console.log(json);
                var response = JSON.parse(json);
                if (response.success) {
                    var likeUnlikeEvt = $A.get('e.c:ec_LikeUnlikeContentEvt');
                    likeUnlikeEvt.setParams({
                        'id': response.id,
                        'message':  response.message
                    }).fire();
                } else {

                }
            }, {
                originId: id,
                siteName: component.get('v.siteName'),
                langCode: langCode
            });
            component.set('v.likedContent', null);
        }
    },


    handleLikeUnlikeContent: function(component, event, helper) {
        helper.updateLikeCount(component, event.getParam('id'), event.getParam('message'));
    },


    toggleAddContent : function(component, event, helper) {
        var container = component.find('contentContainer').getElement();
        event.stopPropagation();
        $A.util.toggleClass(container, 'addMode');
    },

    setOrderApiName: function(component, event, helper) {
        var apiOrder = '';
        switch(component.get('v.order')) {
            case 'Alphabetical':
                apiOrder = 'alpha';
                break;
            case 'Priority Original Publish Date':
                apiOrder = 'priority_date';
                break;
            case 'Published Start Date':
                apiOrder = 'publish_date';
                break;
            case 'Original Publish Date':
            default:
                apiOrder = 'date';
        }

        component.set('v.apiOrder', apiOrder);
    },

    subscriptionsChanged: function(component, event, helper) {
        if (component.get('v.loadSubscriptions')) {
            helper.setupComponent(component, event, helper, true, true);
        }
    }
})