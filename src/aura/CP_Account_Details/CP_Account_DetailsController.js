({
	onInit: function(cmp, evt, hlpr){

		var services = cmp.find("CP_Services");

		services.getInvestmentProfile(
			"13460563",
			cmp, 
			function(success){
				cmp.set("v.investmentProfileObj", success);
				console.log(cmp.get("v.investmentProfileObj"));
			},
			function(error){
				console.error(error);
			}
		);
	},
	doneRendering: function(cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-background__tiled igcp-utils__display--block";
	}
})