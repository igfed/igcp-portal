({
	doInit : function(cmp, evt, hlpr) {

		var utils = cmp.find("CP_Utils");
		utils.createComponent('CP_Registration_Start', { "parent" : cmp.get("v.parent") }, cmp);
	},
	onStepOne: function(cmp, evt, hlpr) {
		console.log('ON STEP ONE');
	}
})