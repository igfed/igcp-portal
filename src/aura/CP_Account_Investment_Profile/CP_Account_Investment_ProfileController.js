({
	onProfileChange: function(cmp, evt, hlpr) {

		cmp.set("v.profileObj", evt.getParam("value"));

		console.log(cmp.get("v.profileObj"))
	}
})