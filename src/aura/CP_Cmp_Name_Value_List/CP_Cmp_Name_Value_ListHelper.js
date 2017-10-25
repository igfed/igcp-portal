({
	convertToSpaces: function(str) {
		return str.replace(/_/g, ' ');
	},
	generateList: function(values, cmp, container) {

		var
			utils = cmp.find("CP_Utils"),
			variant = cmp.get("v.variant"),
			componentName = "";

		if (variant === "a") {
			componentName = "CP_Cmp_Name_Value_Item_A";
		} else if (variant === "b") {
			componentName = "CP_Cmp_Name_Value_Item_B";
		} else {
			console.warn('CP_Cmp_Name_Value_List: variant ' + variant + ' unrecognized');
		}

		values.forEach(function(item, i) {

			var itemType = "";

			if (item.type) {
				itemType = item.type;
			}

			utils.createComponent(
				componentName,
				{
					"label": item.label,
					"description": item.detail,
					"type": itemType
				},
				container,
				function(ready){}
			);
		});
	},
	generateContainer: function(gridSizing, cmp, container, callback) {

		var
			utils = cmp.find("CP_Utils");
		
		if(gridSizing === "12") {
			utils.createComponent(
				"aura:html", {
					"tag": "dl",
					"body": "",
					"HTMLAttributes": {
						"class": "slds-list_horizontal slds-wrap"
					}
				},
				container,
				function(ready) {
					callback(ready);
				}
			);
		} else if(gridSizing === "6") {

			utils.createComponent(
				"aura:html", {
					"tag": "dl",
					"body": "",
					"HTMLAttributes": {
						"class": "slds-list_horizontal slds-wrap"
					}
				},
				container,
				function(ready) {
					callback(ready);
				}
			);

		}
	}
})