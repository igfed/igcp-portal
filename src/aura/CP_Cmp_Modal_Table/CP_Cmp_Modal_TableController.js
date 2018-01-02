({
	onInit : function(cmp, evt, hlpr) {
		console.info("CP_Cmp_Modal_Table: " + cmp.get("v.id"));
		console.log(cmp.get("v.data"));
	},
	onDataChange: function(cmp, evt, hlpr) {
		console.log("Data Change");
		console.log("current value: " + evt.getParam("value"));
	}
})