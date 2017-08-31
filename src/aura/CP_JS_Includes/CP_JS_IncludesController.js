({
	scriptsLoaded : function(cmp, evt, hlpr) {
	    jQuery(document).ready(function($){
	    	console.log('CP_JS_Includes: external scripts loaded');
	    	
	    	$(document).foundation();
	    });
	}
})