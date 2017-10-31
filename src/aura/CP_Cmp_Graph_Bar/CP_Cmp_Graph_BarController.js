({
	doneRendering: function (cmp, evt, hlpr) {
		cmp.set("v.renderComplete", true);
	},
	onSetGraph: function (cmp, evt, hlpr) {

		var
			payload = evt.getParam("payload"),
			utils = cmp.find("CP_Utils");

		if (payload.id === cmp.get("v.id")) {

			utils.waitFor(
				cmp,
				"v.renderComplete",
				function () {
					hlpr.generateGraph(payload);
				}
			);
		}
	}
})