({
	onInit: function (cmp, evt, hlpr) {

		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Checkbox: A unique 'id' is required.");
		}
	},
	onChange: function (cmp, evt, hlpr) {
		try {
			var
				checked = evt.target.checked,
				events = cmp.find("CP_Events");

			cmp.set('v.checked', checked);
			
			events.fire("CP_Evt_Input_Checkbox", {
				"id": cmp.get("v.id"),
				"checked": checked
			});
		} catch (err) {
			console.error("CP_Cmp_Input: onChange");
			console.error(err);
		}
	},
	onGetValue: function (cmp, evt, hlpr) {
		cmp.find("CP_Events").fire("CP_Evt_Send_Input_Value", {
			"id": cmp.get("v.id"),
			"type": "checkbox",
			"checked": cmp.get("v.checked")
		});
	}
})