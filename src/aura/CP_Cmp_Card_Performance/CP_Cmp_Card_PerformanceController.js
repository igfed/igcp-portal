({
	onInit : function(cmp, evt, hlpr) {
		if(cmp.get("v.id") === "") {
			console.warn("CP_Cmp_Card_Performance: An id is required.");
		}
	}
})