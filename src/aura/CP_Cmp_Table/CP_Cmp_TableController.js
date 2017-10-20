({
	doInit: function(cmp, evt, hlpr) {
		if(cmp.get("v.id") === "") {
			console.warn("CP_Cmp_Table: An id is required.");
		}
	},
	onSetTable: function(cmp, evt, hlpr) {

		var 
			payload = evt.getParam("payload"),
			utils = cmp.find("CP_Utils");
		
		if(cmp.get("v.id") === payload.id) {

			hlpr.generateHeader(cmp, utils, payload.headers, function(ready){
				hlpr.generateTable(cmp, utils, payload.data, function(ready){});
			});
		}
	}
})