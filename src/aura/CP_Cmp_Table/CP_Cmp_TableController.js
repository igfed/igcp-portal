({
	onInit: function (cmp, evt, hlpr) {
		if (cmp.get("v.id") === "") {
			console.warn("CP_Cmp_Table: An id is required.");
		}
	},
	onSetTable: function (cmp, evt, hlpr) {

		var
			payload = evt.getParam("payload"),
			utils = cmp.find("CP_Utils");

		if (cmp.get("v.id") === payload.id) {

			if (payload.data.length !== 0) {
				hlpr.generateHeader(cmp, utils, payload.headers, function () {
					hlpr.generateTable(cmp, utils, payload, function () {});
				});
			}
		}
	}
})