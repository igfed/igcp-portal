({
    toggleTooltip: function(cmp, evt, hlpr) {
        
        var tooltip = cmp.find(evt.getParam("id"));
        
        if($A.util.hasClass(tooltip, "igcp-utils__fade--out")) {
            //fade in
            $A.util.removeClass(tooltip, "igcp-utils__fade--out igcp-utils__display--none");
            $A.util.addClass(tooltip, "igcp-utils__fade--in igcp-utils__display--block");
        } else {
            //fade out
            //TODO - display inline block should really be removed after fade out is complete
            $A.util.removeClass(tooltip, "igcp-utils__fade--in igcp-utils__display--block");
            $A.util.addClass(tooltip, "igcp-utils__fade--out igcp-utils__display--none");
            
        }
    }
})