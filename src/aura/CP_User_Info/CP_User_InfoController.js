({
	onInit : function(cmp, evt, hlpr) {

	},
	doneRendering: function(cmp, evt, hlpr){
		if(cmp.get("v.renderComplete") === false) {

			
			cmp.set("v.renderComplete", true);
		}
	}
})