({
	onInit: function (cmp, evt, helpr) {
		var isDefined = !$A.util.isUndefined(cmp.get("v.formData"));
		var services = cmp.find("CP_Services")
		
		services.getAddrPhone(
			cmp,
			function (success) {
				var provinces = ['Alberta', 'British Columbia', 'Ontario']
				var countries = ['Canada', 'United States']
				var res = JSON.parse(success.responseBody)

				if (isDefined) cmp.set("v.formData", res)
				cmp.set("v.countries", countries)
				cmp.set("v.provinces", provinces)
				console.log('[CP_Edit_Address] - onInit / getAddrPhone():success = ', res)
			},
			function (error) {
				console.log('[CP_Edit_Address] - onInit / getAddrPhone():Error = ', error)
			}
		);	
	},
	onNavigateTo: function (cmp, evt) {
		var params = evt.getParam('arguments');
		console.warn('url', params.url)
		var urlEvent = $A.get("e.force:navigateToURL");

		urlEvent.setParams({
			"url": "/profile-settings"
		});
		urlEvent.fire();
	},
	onSubmit: function (cmp, evt, hlpr) {

		var services = cmp.find("CP_Services")
		var formData = JSON.stringify(cmp.get("v.formData"))
		var responseIsValid = false
		
		services.updateAddrPhone(
			formData,
			cmp,
			function (success) {
				console.log('[CP_Edit_Address] - onSubmit / updatePhoneAddr():success = ', success)
			},
			function (error) {
				cmp.navigateTo('profile-settings')
				hlpr.navigateTo('profile-settings')
				console.log('[CP_Edit_Address] - onSubmit / updatePhoneAddr():Error = ', error)
			}
		);

		//if(responseIsValid) cmp.navigateTo('profile-settings')		
	}
})