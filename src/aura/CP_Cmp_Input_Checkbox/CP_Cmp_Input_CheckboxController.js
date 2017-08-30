({
	onInit: function(cmp, evt, hlpr) {
		if(cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Checkbox: A unique 'id' is required.");
		}

		if(cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Input_Checkbox: Input needs to be associated with a 'form'.")
		}

			

		console.log(cmp.find("checkbox-input"));
	},
	onGetValue: function(cmp, evt, hlpr) {

		var
			events = cmp.find('CP_Events'),
			formId = evt.getParam('payload').formId,
			form = cmp.get('v.form');		
				

		if (formId === form) {
			events.fire("CP_Evt_Send_Input_Value", {
				"id": cmp.get("v.id"),
				"type": cmp.get("v.type"),
				"checked": false
			});
		}
	},
	onCheck: function(cmp, evt, hlpr) {
		console.log('ONDANOASDONASDON');
	}
})