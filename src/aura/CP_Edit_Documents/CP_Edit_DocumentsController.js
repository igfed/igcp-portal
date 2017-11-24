({
	onInit: function (cmp, evt, hlpr) {
		var services = cmp.find("CP_Services");

		services.getAllFinancialAssets(
			cmp,
			function (success) {
				success = JSON.parse(success)
				cmp.set('v.formData', success)
				console.log('CP_Edit_Documents onInit():', success)

			},
			function (error) {
				console.error("CP_Edit_Documents: onInit", error);
			}
		)
	},
	onChange: function (cmp, event, hlpr) {
		var oldValue = event.getParam("oldValue"),
			value = event.getParam("value"),
			formData = cmp.get("v.formData");
	},
	onComplete: function (cmp, evt, hlpr) {
		var events = cmp.find("CP_Events");

		events.fire("CP_Evt_Modal_Open", {
			"id": "editDocument-tos"
		});
	},
	onSubmit: function (cmp, evt, hlpr) {
		var
			services = cmp.find("CP_Services"),
			payload = evt.getParam("payload");

		if (payload.id === "tos_agree_button") {

			var formData = JSON.stringify(cmp.get("v.formData"));

			services.updateAssets(
				formData,
				cmp,
				function (success) {
					// ToDo: on success logic
					console.log('CP_Edit_Documents: UpdateAssets():', success)
				},
				function (error) {

					console.error("CP_Edit_Documents: UpdateAssets", error);
				}
			);
		}
	},
	onAgreeChecked: function (cmp, evt, hlpr) {

		var payload = evt.getParam("payload");

		if (payload.id === "read_and_agree_checkbox") {
			cmp.set("v.acceptTOS", payload.checked);
		}
	},
})