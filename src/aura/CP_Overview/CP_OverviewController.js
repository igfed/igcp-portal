({
	onInit : function(cmp, evt, hlpr) {
	
		var 
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils");

		utils.getURLParams(function(params){
			if(params.language) {
				cmp.set("v.lang", params.language);
			}
		});

		services.getClientFirstName(
			cmp,
			function(name){
				cmp.set("v.clientName", (" " + name));
			},
			function(error) {
				console.error("Overview: getClientFirstName");
				console.error(error);
			}
		);
	},
	doneRendering: function(cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-background__tiled igcp-utils__display--block";
	}
})