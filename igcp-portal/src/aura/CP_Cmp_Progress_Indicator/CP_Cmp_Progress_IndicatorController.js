({
    doInit: function(cmp, evt, hlpr) {
        var totalStepsArr = [], i;
        for (i = 0; i < cmp.get("v.totalSteps"); i++) {
           totalStepsArr.push(i + 1);
        }
        cmp.set("v.totalStepsArr", totalStepsArr);
    }
})