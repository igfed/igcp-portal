({
    isScrolledIntoView: function(elem)
    {
        var docViewTop = jQuery(window).scrollTop();
        var docViewBottom = docViewTop + jQuery(window).height();
    
        var elemTop = jQuery(elem).offset().top;
        var elemBottom = elemTop + jQuery(elem).height();
        
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }, 
    onScrolling: function(cmp, hlpr){
       
        jQuery(document).ready(function(){
            jQuery(document).scroll(function(){
                console.log(hlpr.isScrolledIntoView(cmp.getElement().querySelectorAll(".igcp-footer")));
            });
        });
    }
})