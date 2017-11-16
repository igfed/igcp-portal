({
	scriptsLoaded : function(cmp, evt, hlpr) {
	    jQuery(document).ready(function($){
	    	console.log('CP_JS_Includes: external scripts loaded');
	    	
			$(document).foundation();
			
			//add console.info
			console.info = function(prop) {
				console.log("%c " + prop, "background: green; color: white; display: block;");
			}

			//add console.fancy
			console.data = function(name, objArr) {
				console.log("%c ====================", "background: green; color: white; display: block;");
				console.log("%c " + name, "background: green; color: white; display: block;");
				console.log(objArr);
				console.log("%c ====================", "background: green; color: white; display: block;");
			}
	    });
	}
})