({
	onInit: function(cmp, evt, hlpr) {
		if (cmp.get("v.id") === "") {
			console.warn("CP_Cmp_Loading_Icon: id is required.");
		}

		if (cmp.get("v.show") === false) {
			cmp.set("v.showHideClass", "igcp-utils__display--none");
		}

		if(cmp.get("v.hasBG") === true) {
			var loadingClass = cmp.get("v.loadingIconClass");
			console.log(loadingClass);
			loadingClass += " igcp-loading-icon__background";
			console.log(loadingClass);
			cmp.set("v.loadingIconClass", loadingClass);
		}
	},
	onShow: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");
		
		if (payload.id === cmp.get("v.id")) {
			cmp.set("v.showHideClass", "igcp-utils__display--block");
		}
	},
	onHide: function(cmp, evt, hlpr) {

		var payload = evt.getParam("payload");

		if (payload.id === cmp.get("v.id")) {
			cmp.set("v.showHideClass", "igcp-utils__display--none");
		}
	}
})