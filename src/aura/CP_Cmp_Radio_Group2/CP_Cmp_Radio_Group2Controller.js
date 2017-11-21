({
	onInit: function (cmp, evt, hlpr) {
		// logic to set default radio
		var radios = cmp.get('v.radios')

		console.log('CP_Cmp_radios init', radios)

		if (cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Radio_Group2: A unique 'id' is required.");
		}

		if (cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Radio_Group2: Input needs to be associated with a 'form'.");
		}
	},
	onChange: function (cmp, evt, hlpr) {
		var target = evt.target;
		var value = target.getAttribute("data-value");
		var radios = cmp.get('v.radios')

		radios.value = value;
		console.log('radios value: ', radios.value)
	}
})
