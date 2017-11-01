({
	onInit: function(cmp, evt, hlpr) {

		if(cmp.get("v.id") === "default") {
			console.error("CP_Cmp_Radio_Group2: A unique 'id' is required.");
		}

		if(cmp.get("v.form") === "default") {
			console.error("CP_Cmp_Radio_Group2: Input needs to be associated with a 'form'.");
		}
	}
})