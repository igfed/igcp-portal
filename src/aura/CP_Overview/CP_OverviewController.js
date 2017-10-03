({
	onInit : function(cmp, evt, hlpr) {
	
		var 
			services = cmp.find("CP_Services");

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
	}
})