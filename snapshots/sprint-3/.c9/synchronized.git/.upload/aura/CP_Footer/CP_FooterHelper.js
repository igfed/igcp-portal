({
    isScrolledIntoView: function(elem)
    {
        var docViewTop = jQuery(window).scrollTop();
        var docViewBottom = docViewTop + jQuery(window).height();
    
        var elemTop = jQuery(elem).offset().top;
        var elemBottom = elemTop + jQuery(elem).height();
        
        return (docViewBottom >= elemTop);
    }, 
    onScrolling: function(cmp, hlpr, cb){
      
      //Apparently helpers cannot fire events
      //Must be done either on the controller or the renderer
        
        jQuery(document).ready(function(){
            var scrollDebounce = hlpr.debounce(function() {
            	
            	if(hlpr.isScrolledIntoView(cmp.find('igcp-footer').getElement())) {
                    cb({
                      "isVisible": true
                    });
		 
            	} else {
                    cb({
                      "isVisible": false
                    });
            	}
            	
            }, 100);
            
            
          document.addEventListener('scroll', $A.getCallback(scrollDebounce));
            
        });
    },
    debounce: function (func, wait, immediate) {
    	var timeout;
    	return function() {
    		var context = this, args = arguments;
    		var later = function() {
    			timeout = null;
    			if (!immediate) func.apply(context, args);
    		};
    		var callNow = immediate && !timeout;
    		clearTimeout(timeout);
    		timeout = setTimeout(later, wait);
    		if (callNow) func.apply(context, args);
    	};
    },
    throttle: function(func, wait, options) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      if (!options) options = {};
      var later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
      return function() {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    }
})