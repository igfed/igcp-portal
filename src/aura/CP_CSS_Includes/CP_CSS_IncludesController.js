({
	scriptsLoaded: function(component, event, helper) {
		jQuery(document).ready(function($) {
			console.log('CP_JS_Includes: scripts loaded');

			//Not sure if this line is still needed, we will see...
			//$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');

			$(document).foundation();
		});
	}
})