({
	onInit : function(cmp, evt, hlpr) {

		var services = cmp.find("CP_Services");

		services.getInvestmentsPreview();
	}
})