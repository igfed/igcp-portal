({
    doInit : function(cmp, evt, helper) {

    },
    scriptLoad: function(component, event, helper) {
        //read the incoming url; if tagPath present, set the current tagPath
        var tagPath = $o.urlParameter('tagpath');
        if (tagPath) {
            component.set('v.tagPath', tagPath);
        } else if (component.get('v.tagPath')) {
            tagPath = component.get('v.tagPath');
        }
        var tags = $o.splitTagPath(tagPath);

        component.set("v.tags", tags);
        helper.writeBreadcrumb(component);
    },
    handleLoadTaxonomyContent : function (cmp, evt, helper){
        var tagPath = evt.getParam("tagPath");
        var evtTaxonomyInstance = evt.getParam("taxonomyInstanceName");
        var myTaxonomyInstance = cmp.get("v.taxonomyInstanceName");
        var tags;

        if (myTaxonomyInstance == evtTaxonomyInstance){
            tags = $o.splitTagPath(tagPath);
            
            cmp.set("v.tags", tags);
            cmp.set("v.tagPath", tagPath);
        }

        helper.writeBreadcrumb(cmp);

    },
    handleLinkClick : function (cmp, evt, helper) {
        var sourceEleIndex = evt.currentTarget;
        var linkString = '';
        var tags = cmp.get("v.tags");
        var taxClickedEvt = $A.get("e.c:ec_ChangeTaxonomyPathEvt");

        for (var i = 0, j = parseInt(sourceEleIndex.dataset.index,10); i <= j; i++){
            linkString += '/' + tags[i];
        }
        //fire the event with the correct full taxonomy path.
        taxClickedEvt.setParams({
            tagPath: linkString,
            taxonomyInstanceName: cmp.get("v.taxonomyInstanceName")
        }).fire();
    }
})