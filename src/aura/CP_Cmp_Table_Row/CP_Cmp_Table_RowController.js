({
	onInit: function(cmp, evt, hlpr) {

		var
			data = cmp.get("v.data"),
			utils = cmp.find("CP_Utils"),
			tdClass = "",
			style = cmp.get("v.style");

		data.forEach(function(item, i) {

			tdClass = "igcp-table__data slds-p-vertical--x-small slds-p-horizontal--xx-small ";

			if (i === (data.length - 1)) {
				tdClass += "igcp-utils__text-align--right";
			}

			if (style.grid[i] !== null || style.grid[i] === undefined) {
				tdClass += "slds-size_" + style.grid[i] + "-of-12 ";
			}

			if (style.textAlign[i] !== null || style.textAlign[i] !== undefined) {
				tdClass += ("igcp-utils__text-align--" + style.textAlign[i] + " ");
			}

			try {
				utils.createComponent(
					"aura:html", {
						"tag": "td",
						"body": item.toString(),
						"HTMLAttributes": {
							"class": tdClass
						}
					},
					cmp,
					function(ready) {}
				);
			} catch (err) {
				console.error("CP_Cmp_Table_Row: onInit");
				console.error(err);
			}
		});
	},
	onClick: function(cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");

		//fire data to details modal
		events.fire("CP_Evt_Set_Details", {
			"id": cmp.get("v.modalId"),
			"data": cmp.get("v.dataObj")
		});
	}
})