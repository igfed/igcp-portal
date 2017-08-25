({
	onInit: function(cmp, evt, hlpr) {
		if(cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Input_Text: A unique 'id' is required.");
		}

		if(cmp.get("v.form") === "default") {
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
			var field = cmp.find("date-input");
			field.set("v.errors", []);
		}
	},
	onError: function(cmp, evt, hlpr) {

		if (cmp.get("v.id") === evt.getParam("payload").id) {
			var field = cmp.find("date-input");
			field.set("v.errors", [{ message: cmp.get("v.errorText") }]);
		}
	},
	onType: function(cmp, evt, hlpr) {

		var 
			keyCode = evt.getParams("arguments").keyCode,
			inputValue = cmp.get("v.inputValue"),
			hasBackslash = inputValue.indexOf('/') > -1 ? true : false,
			month = inputValue.slice(0,2),
			day = inputValue.slice(3, 5),
			year = inputValue.slice(6),
			newInputValue = "";	


			if(keyCode === 8) {
				//backspace
				newInputValue = inputValue.slice(0, inputValue.length);
			} else {
				newInputValue += month;

				if(inputValue.length >= 2) {
					newInputValue += '/';
				}

				if(inputValue.length >= 3) {
					newInputValue += day;
				}

				if(inputValue.length >= 5) {
					newInputValue += '/';
				}

				if(inputValue.length >= 7) {
					newInputValue += year;
				}
			}	

			cmp.set("v.inputValue", newInputValue);		
	}
})