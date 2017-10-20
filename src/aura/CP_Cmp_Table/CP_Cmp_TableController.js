({
	doInit: function(cmp, evt, hlpr) {
	
		var 
			utils = cmp.find("CP_Utils"),
			data = cmp.get("v.records"),
			values = cmp.get("v.values")['values'],
			componentName = "c:CP_Cmp_Table_Row";

		values.forEach(function(item, i) {

			// utils.createComponent(
			// 	componentName, 
			// 	{
			// 		"values" : item
			// 	}, 
			// 	function(ready){}
			// );
		});

	},
	onDataChange: function(cmp, evt, hlpr){
		// console.log("old value: " + evt.getParam("oldValue"));
		console.log('onChange: ', evt.getParam("value"));
		
		// cmp.set('v.data', evt.getParam('value'))

		// console.log('data on change', cmp.get("v.data"));
	}
})