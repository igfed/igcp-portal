({
	onInit : function(cmp, evt, hlpr) {
		cmp.find("CP_Services").getClientFirstName(
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