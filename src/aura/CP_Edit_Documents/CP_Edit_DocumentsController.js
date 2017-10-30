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

			services.getAllFinancialAssets(
				cmp,
				function (success) {
					// ToDo: on success logic
					console.info('edit_docs getAllFinancialAssets():', success)
					events.fire("CP_Evt_Modal_Open", {
						"id": "editDocument-tos"
					});
				},
				function (error) {

					var
						events = cmp.find("CP_Events"),
						services = cmp.find("CP_Services");
					console.error("CP_Edit_Documents: getAllFinancialAssets", error);

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
	},
	onAgreeChecked: function (cmp, evt, hlpr) {

		var payload = evt.getParam("payload");

		if (payload.id === "read_and_agree_checkbox") {
			cmp.set("v.acceptTOS", payload.checked);
		}
	},
})