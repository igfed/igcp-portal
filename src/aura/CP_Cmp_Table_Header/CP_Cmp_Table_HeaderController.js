({
	onInit : function(cmp, evt, hlpr) {
		var
			data = cmp.get("v.headers"),
			utils = cmp.find("CP_Utils"),
			thClass = "",
			style = cmp.get("v.style");

		data.forEach(function(item, i) {

			thClass = "igcp-table__header slds-p-bottom--x-small slds-p-horizontal--xx-small ";

			if(i === (data.length - 1)) {
				thClass += "igcp-utils__text-align--right ";
			}

			if(style.grid[i] !== null || style.grid[i] === undefined) {
				thClass += "slds-size_" + style.grid[i] + "-of-12 ";
			}

			if(style.textAlign[i] !== null || style.textAlign[i] !== undefined) {
				thClass += ("igcp-utils__text-align--" + style.textAlign[i] + " ");
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