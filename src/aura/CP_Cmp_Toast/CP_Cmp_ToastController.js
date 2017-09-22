({
	doneRendering : function(cmp, evt, hlpr) {

		var type = cmp.get("v.type");

		if(type === "success") {
			cmp.set("v.notifyTheme", "slds-theme_success");
		} else if(type === "warning") {
			cmp.set("v.notifyTheme", "slds-theme_warning");
		} else if(type === "error") {
			cmp.set("v.notifyTheme", "slds-theme_error");
		}
	},
	onSuccess: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");

		if(payload.id === cmp.get("v.id")) {
			//Show Success
			cmp.set("v.message", payload.message);
			cmp.set("v.show", "igcp-utils__display--block");
		} else {
			cmp.set("v.message", "");
			cmp.set("v.show", "igcp-utils__display--none");
		}
	},
	onWarning: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");

		if(payload.id === cmp.get("v.id")) {
			//Show Warning
			cmp.set("v.message", payload.message);
			cmp.set("v.show", "igcp-utils__display--block");
		} else {
			cmp.set("v.message", "");
			cmp.set("v.show", "igcp-utils__display--none");
		}
	},
	onError: function(cmp, evt, hlpr) {
		var payload = evt.getParam("payload");

		if(payload.id === cmp.get("v.id")) {
			//Show Error
			cmp.set("v.message", payload.message);
			cmp.set("v.show", "igcp-utils__display--block");
		} else {
			cmp.set("v.message", "");
			cmp.set("v.show", "igcp-utils__display--none");
		}
	}
})