({
	onInit: function (cmp, evt, hlpr) {

		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Checkbox: A unique 'id' is required.");
		}

		if (cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Input_Checkbox: Input needs to be associated with a 'form'.");
		}
	},
	onchange: function (cmp, evt, hlpr) {
		cmp.set('v.checked', evt.target.checked)
	},
	onGetValue: function (cmp, evt, hlpr) {
		// ToDo: Deprecate. onchange will handle this. Bind checked attr to parent instead
		var
			events = cmp.find("CP_Events"),
			formId = evt.getParam("payload").formId,
			form = cmp.get("v.form");

		if (formId === form) {
			events.fire("CP_Evt_Send_Input_Value", {
				"id": cmp.get("v.id"),
				"type": cmp.get("v.type"),
				"checked": cmp.get("v.isChecked")
			});
		}
	},
	onCheck: function (cmp, evt, hlpr) {
		// ToDo: Deprecate. onchange will handle this. Bind checked attr to parent instead
		var
			checkbox = cmp.find("checkbox-input"),
			events = cmp.find("CP_Events"),
			checked = checkbox.elements[0].checked;

		if (checked === false) {
			events.fire("CP_Evt_Input_Checkbox_Checked", {
				"id": cmp.get("v.id"),
				"checked": true
			});
			
		} else {
			events.fire("CP_Evt_Input_Checkbox_Unchecked", {
				"id": cmp.get("v.id"),
				"checked": false
			});
		}
	},
	onInputFocus: function(cmp, evt, hlpr) {
		//console.info(cmp.get("v.id") + " has focus.");
	}
})