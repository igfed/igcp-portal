({
	onInit: function(cmp, evt, hlpr) {

		var
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils");

		services.getSecurityQuestions(
			cmp,
			function(res) {

				var questions = res.payload;

				questions.forEach(function(item, i) {

					utils.createComponent(
						"CP_Cmp_Input_Selector", {
							"id": ("security-" + (i + 1) + "-selector"),
							"form":  cmp.get("v.form"),
							"class": "slds-size_12-of-12 slds-large-size_9-of-12 slds-m-vertical--medium",
							"label": ("Security Question " + (i + 1) + " of " + questions.length),
							"placeholder": "Select a security question",
							"defaultOptions": questions
						},
						cmp.find("security-questions-container"),
						function(res) {
							console.log(res.component.type);
						}
					);

					utils.createComponent(
						"CP_Cmp_Input_Text", {
							"id": ("security-" + (i + 1) + "-answer"),
							"form": cmp.get("v.form"),
							"class": "slds-size_12-of-12 slds-large-size_9-of-12 slds-m-vertical--medium",
							"label": ("Answer " + (i + 1)),
							"placeholder": ""
						},
						cmp.find("security-questions-container"),
						function(res) {
							console.log(res.component.type);
						}
					);


				});
			},
			function(error) {
				console.log("SecurityQuestions: ERROR");
				console.log(error);
			}
		);
	}
})