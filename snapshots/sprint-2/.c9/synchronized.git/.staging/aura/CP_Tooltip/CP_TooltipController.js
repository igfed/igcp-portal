({
    toggleTooltip: function(cmp, evt, hlpr) {
        
        var tooltip = cmp.find(evt.getParam("id"));
        
        if($A.util.hasClass(tooltip, "igcp-utils__fade--out")) {
            //fade in
            $A.util.removeClass(tooltip, "igcp-utils__fade--out");
            $A.util.addClass(tooltip, "igcp-utils__fade--in");
        } else {
            //fade out
            $A.util.removeClass(tooltip, "igcp-utils__fade--in");
            $A.util.addClass(tooltip, "igcp-utils__fade--out");
        }
    }
})