({
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

		if(payload.id === "tos_agree_button") {
			var formData = JSON.stringify({
				"allDocumentPreference" : false , 
				"documentPreferences" : [{ "clientNumber" : "0987654","investmentStatements" : true, "taxReceipts" : true, "tradeConfirmation" : false },{"clientNumber" : "0987653",    "investmentStatements" : false, "taxReceipts" : true, "tradeConfirmation" : false },{ "clientNumber" : "0987652","investmentStatements" : true, "taxReceipts" : true, "tradeConfirmation" : true }],
				"documentPreferencesLoan" : [{"loanNumber" : "76568", "mortgageDocument" : true},{"loanNumber" : "7656800", "mortgageDocument" : false}],
				"documentPreferencesPolicy" : [{"policyNumber" : "7656811", "mortgageDocument" : true},{"policyNumber" : "765680022", "policyDocument" : false}]
			});

			services.updateAssets(
				formData,
				cmp,
				function (success) {
					// ToDo: on success logic
					console.log('edit_docs UpdateAssets():', success)
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