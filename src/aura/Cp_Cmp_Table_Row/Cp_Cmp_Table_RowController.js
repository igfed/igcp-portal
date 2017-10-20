({
	onInit: function(cmp, evt, hlpr) {

		var
			data = cmp.get("v.data"),
			utils = cmp.find("CP_Utils"),
			tdClass = "igcp-table__data slds-p-vertical--x-small slds-p-horizontal--xx-small ";

		data.forEach(function(item, i) {

			if(i === (data.length - 1)) {
				tdClass += "igcp-utils__text-align--right";
			}

			utils.createComponent(
				"aura:html",
				{ 
					"tag": "td", 
					"body": item,
					"HTMLAttributes" : {
						"class" : tdClass
					}
				},
				cmp, 
				function(ready){}
			);
		});
	}
})