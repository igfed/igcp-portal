({
	onDataChange: function(cmp, evt, hlpr) {
		hlpr.generateGraph(cmp.get("v.data"));
	},
	onSetGraph: function (cmp, evt, hlpr) {
		var payload = evt.getParam("payload");
		if (payload.id === cmp.get("v.id")) {
			cmp.set("v.data", payload);
		}
	}
})