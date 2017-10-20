({
	generateHeader: function(cmp, utils, data, callback) {
		try {
			utils.createComponent(
				"CP_Cmp_Table_Header", 
				{
					"id": cmp.get("v.id"),
					"headers": data
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
	generateTable: function(cmp, utils, data, callback) {
		try {
			data.forEach(function(row, i){
				utils.createComponent(
					"CP_Cmp_Table_Row",
					{
						"data" : row
					},
					cmp,
					function(ready){}
				);
			});
		} catch(err) {

		}
	}
})