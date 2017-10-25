({
	doneRendering: function (cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";
	},
	onSubmit: function (cmp, evt, hlpr) {
		var
			payload = evt.getParam("payload"),
			events = cmp.find("CP_Events");
			console.log('edit_docs onSubmit() payload:', payload)

		if (payload.id === "edit-documents") {

			services.submitForm(
				"UpdateAssets",
				cmp,
				function (evt) {
					// ToDo: on success logic
					console.log('edit_docs submitForm():', evt)
				},
				function (error) {

					var
						events = cmp.find("CP_Events"),
						services = cmp.find("CP_Services");

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