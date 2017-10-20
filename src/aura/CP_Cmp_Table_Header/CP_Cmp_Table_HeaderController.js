({
	onInit : function(cmp, evt, hlpr) {
		var
			data = cmp.get("v.headers"),
			utils = cmp.find("CP_Utils"),
			thClass = "igcp-table__header slds-p-bottom--x-small slds-p-horizontal--xx-small ";

		data.forEach(function(item, i) {

			if(i === (data.length - 1)) {
				thClass += "igcp-utils__text-align--right";
			}

			utils.createComponent(
				"aura:html",
				{ 
					"tag": "th", 
					"body": item,
					"HTMLAttributes" : {
						"class" : thClass
					}
				},
				cmp, 
				function(ready){}
			);
		});
	}
})