({
	generateHeader: function(cmp, utils, payload, callback) {
		try {
			utils.createComponent(
				"CP_Cmp_Table_Header", {
					"id": cmp.get("v.id"),
					"headers": payload,
					"style": cmp.get("v.styleConfig")
				},
				cmp,
				function(ready) {
					callback(ready);
				}
			);
		} catch (err) {
			console.error(err);
		}
	},
	generateTable: function(cmp, utils, payload, callback) {
		try {

			var tableData = payload.data;

			tableData.forEach(function(row, i) {
				utils.createComponent(
					"CP_Cmp_Table_Row", {
						"data": row,
						"style": cmp.get("v.styleConfig"),
						"dataObj": JSON.stringify(payload.dataObj[i]),
						"modalId" : cmp.get("v.modalId")
					},
					cmp,
					function(ready) {}
				);
			});
		} catch (err) {
			console.error(err);
		}
	}
})