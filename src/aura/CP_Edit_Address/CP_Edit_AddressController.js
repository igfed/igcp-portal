({
	onInit: function (cmp, evt, helpr) {
		var isDefined = !$A.util.isUndefined(cmp.get("v.formData"));
		var provinces = ['Alberta', 'British Columbia', 'Ontario']
		var countries = ['Canada', 'United States']
		var data = {
			address: '388 Achme St. West',
			city: 'Toronto',
			country: 'Canada',
			phone: '416-555-5555',
			postal: 'M5VTVT',
			province: 'Ontario'
		}

		if (isDefined) cmp.set("v.formData", data)

		cmp.set("v.countries", countries)
		cmp.set("v.provinces", provinces)
	},
	onSubmit: function (cmp, evt, helpr) {
		var formData = JSON.stringify(cmp.get("v.formData"))
	}
})