({
	onInit: function (cmp, evt, hlpr) {

		try {
			var services = cmp.find("CP_Services");

			cmp.set("v.payload", {
				"lang": cmp.get("v.lang")
			});

			services.getSecurityQuestions(
				cmp,
				function (res) {
					cmp.set("v.allQuestionsArr", res.payload);
					hlpr.setInitQuestions(cmp);
				},
				function (error) {
					console.error("SecurityQuestions:");
					console.error(error);
				}
			);
		} catch (err) {
			console.error("CP_Registration_Security_Questions: getSecurityQuestions");
			console.error(err);
		}
	},
	onQuestionChange: function (cmp, evt, hlpr) {
		try {
			hlpr.debounce(cmp, hlpr);
		} catch (err) {
			console.error("onQuestionChange");
			console.error(err);
		}
	}
})