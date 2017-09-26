({
	gotoLogin: function(cmp, evt, hlpr) {
		$A.get("e.force:navigateToURL").setParams({
			"url": "https://fitrp3-isam.investorsgroup.com/",
			"isredirect" : "true"
		}).fire();
	}
})