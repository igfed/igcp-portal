({
	onInit: function (cmp, evt, hlpr) {
		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Text: A unique 'id' is required.");
		}

		if (cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Input_Text: Input needs to be associated with a 'form'.")
		}
	},
	onGetValue: function (cmp, evt, hlpr) {

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
	onValid: function (cmp, evt, hlpr) {

		if (cmp.get("v.id") === evt.getParam("payload").id) {

			hlpr.setValidStyle(cmp);

			var field = cmp.find("date-input");
			field.set("v.errors", []);
		}
	},
	onError: function (cmp, evt, hlpr) {

		var
			payload = evt.getParam("payload"),
			errors = payload.errors,
			errorArr = [];

		if (cmp.get("v.id") === payload.id) {

			if (errors.length > 0) {

				hlpr.setErrorStyle(cmp);

				errors.forEach(function (item, i) {
					errorArr.push({
						message: item.msg
					});
				});
			}

			var field = cmp.find("date-input");
			field.set("v.errors", errorArr);
		}
	},
	onType: function (cmp, evt, hlpr) {
		try {
			new Cleave('.igcp-input__date', {
				date: true,
				datePattern: ['m', 'd', 'Y']
			});
		} catch(err) {

			console.error(err)
		}
	},
	onBlur: function (cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");
		events.fire("CP_Evt_Input_Blur", {
			"id": cmp.get("v.id"),
			"type": cmp.get("v.type"),
			"value": cmp.get("v.inputValue")
		});
	},
	onFocus: function (cmp, evt, hlpr) {
		//console.info(cmp.get("v.id") + " has focus.");
		cmp.find('CP_Events').fire("CP_Evt_Input_Focus", {
			"id": cmp.get("v.id")
		});
	},
	onInputFocus: function(cmp, evt, hlpr) {
		//console.info(cmp.get("v.id") + " has focus.");
	},
	onLabelClick: function (cmp, evt, hlpr) {
		try {
			cmp.find("date-input").getElement().focus();
		} catch (err) {
			console.error(err);
		}
	}
})