({
	scriptsLoaded : function(cmp, evt, hlpr) {
	    jQuery(document).ready(function($){
	    	console.log('CP_JS_Includes: external scripts loaded');
	    	
			$(document).foundation();
			
			//add console.info
			console.info = function(prop) {
				console.log("%c " + prop, "background: green; color: white; display: block;");
			}
	    });
	}
})