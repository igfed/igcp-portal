({
	onInit: function(cmp, evt, hlpr) {
		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Text: A unique 'id' is required.");
		}

		if (cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Input_Text: Input needs to be associated with a 'form'.")
		}
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
				"value": cmp.get("v.inputValue")
			});
		}
	},
	onValid: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === evt.getParam("payload").id) {
			var field = cmp.find("text-input");

			cmp.set("v.limitClass", "igcp-text__success igcp-utils__font-size--x-small");
			cmp.set("v.charClass", "igcp-text__success igcp-utils__font-size--x-small");

			field.set("v.errors", []);
		}
	},
	onError: function(cmp, evt, hlpr) {

		var
			payload = evt.getParam("payload"),
			errors = payload.errors,
			errorArr = [];

		if (cmp.get("v.id") === payload.id) {

			if (errors.length > 0) {

				if(errors[0].type === "isEmpty") {
					cmp.set("v.limitClass", "igcp-utils__font-size--x-small");
					cmp.set("v.charClass", "igcp-utils__font-size--x-small");
				}

				if(errors[0].type === "minLength") {
					cmp.set("v.limitClass", "igcp-text__error igcp-utils__font-size--x-small");
				} else {
					cmp.set("v.limitClass", "igcp-text__success igcp-utils__font-size--x-small");
				}

				if(errors[0].type === "isAlphanumeric" || errors[1].type === "isAlphanumeric") {
					cmp.set("v.charClass", "igcp-text__error igcp-utils__font-size--x-small");
				} else {
					cmp.set("v.charClass", "igcp-text__success igcp-utils__font-size--x-small");
				}
			}
		}
	},
	onHandleKey: function(cmp, evt, hlpr) {

		var events = cmp.find("CP_Events");
		events.fire("CP_Evt_Key", {
			"id" : cmp.get("v.id"),
			"type": cmp.get("v.type"),
			"value": cmp.get("v.inputValue")
		});
	},
	onBlur: function(cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");
		events.fire("CP_Evt_Input_Blur", {
			"id": cmp.get("v.id"),
			"type": cmp.get("v.type"),
			"value": cmp.get("v.inputValue")
		});
	}
})