({
	doInit : function(cmp, evt, hlpr) {
	},
	onDestroy: function(cmp, evt, hlpr) {
		cmp.destroy();
	},
	onModalOpen: function(cmp, evt, hlpr) {

		var newClass = "slds-is-fixed";
		cmp.set("v.class", newClass);
	},
	onModalClose: function(cmp, evt, hlpr) {
		
		cmp.set("v.class", "");
	}
})