({
	scriptsLoaded : function(component, event, helper) {
	    jQuery(document).ready(function($){
	    	console.log('Scripts loaded');
	    	
	    	$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
	    	
	    	$(document).foundation();
	    });
	}
})