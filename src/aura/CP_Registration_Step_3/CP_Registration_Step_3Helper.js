({
	showLoading: function(cmp) {
		cmp.find("CP_Events").fire("CP_Evt_Loading_Show", {
			"id" : "registration-step-3-spinner"
		});
	}, 
	hideLoading: function(cmp) {
		cmp.find("CP_Events").fire("CP_Evt_Loading_Hide", {
			"id" : "registration-step-3-spinner"
		});
	}
})