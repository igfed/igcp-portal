({
	onInit : function(cmp, evt, hlpr) {

		//Test BPIDs

		// 0003173610
		// 0003192111
		// 0002505866

		var 
			services = cmp.find("CP_Services"),
			bpid = "0003173610";

		services.getInvestmentsPreview(
			bpid,
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