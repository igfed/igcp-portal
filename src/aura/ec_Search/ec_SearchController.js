({
    scriptLoad: function(cmp, event, helper) {
        helper.doInit(cmp, event, helper);
    },

    orderFilter : function (cmp, event, helper) {
        helper.orderFilter(cmp, event, helper);
    },

    handleFiltering: function (cmp, event, helper) {
        helper.handleFiltering(cmp, event, helper, cmp.get('v.numResults'));
    },

    changeOperator: function(cmp, event, helper) {
        cmp.set('v.filterOperator', cmp.find('filterOperatorSelect').get('v.value'));
        helper.handleFiltering(cmp, event, helper, cmp.get('v.numResults'));
    },

    loadMore: function (cmp, event, helper) {
        var numResultsShowing = cmp.get('v.numResultsShowing'),
            numResultsToShow = numResultsShowing + cmp.get('v.numResults');     // this addition is premature: we may not have that many more results

        cmp.set('v.numResultsShowing', numResultsToShow);
        helper.handleFiltering(cmp, event, helper, numResultsToShow);
    }
})