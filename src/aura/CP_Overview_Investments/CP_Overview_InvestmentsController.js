({
	onInit : function(cmp, evt, hlpr) {

		var services = cmp.find("CP_Services");

		services.getInvestmentsPreview(
			cmp, 
			function(success) {
				console.log("GET INVESTMENT PREVIEW");
				console.log(success);
			}, 
			function(error) {
				console.error("GET INVESTMENT PREVIEW");
				console.error(error);
			}
		);
	}
})