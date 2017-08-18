({
	scriptsLoaded : function(cmp, evt, hlpr) {
	    jQuery(document).ready(function($){
	    	console.log('CP_JS_Includes: external scripts loaded');
	    	
	    	//Not sure if this line is still needed, we shall see...
	    	//$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
	    	
	    	$(document).foundation();
	    });
	}
})