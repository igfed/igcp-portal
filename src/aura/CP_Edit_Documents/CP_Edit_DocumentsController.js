({
	doneRendering: function (cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";
	},
	onSubmit: function (cmp, evt, hlpr) {
		var
			payload = evt.getParam("payload"),
			events = cmp.find("CP_Events"),
			services = cmp.find("CP_Services");

		if (payload.id === "form_submit") {

			console.log('onSubmit passed if')

			services.getAllFinancialAssets(
				cmp,
				function (success) {
					// ToDo: on success logic
					console.log('edit_docs getAllFinancialAssets():', success)
				},
				function (error) {
					console.error('edit_docs getAllFinancialAssets():', error);

					var
						events = cmp.find("CP_Events"),
						services = cmp.find("CP_Services");
					console.error("CP_Edit_Documents: updateAssets");
					

					/* services.handleServerSideError({
							"error": error,
							"id": cmp.get("v.pageId"),
							"toastId": "registration-step-3-toast-error"
						},
						function (obj) {}
					);*/
				}
			);

		}
	}
})