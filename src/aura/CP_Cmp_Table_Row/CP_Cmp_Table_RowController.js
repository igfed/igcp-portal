({
	doInit: function(cmp, evt, hlpr) {

		var
			data = cmp.get("v.data"),
			utils = cmp.find("CP_Utils");

		data.forEach(function(item, i) {
			utils.createComponent(
				"aura:html",
				{ 
					"tag": "td", 
					"body": item 
				},
				cmp, 
				function(ready){}
			);
		});
	}
})