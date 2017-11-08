({
	onInit: function (cmp, evt, hlpr) {
		var utils = cmp.find("CP_Utils");

		utils.getURLParams(function (urlParams) {
			if (urlParams.language) {
				cmp.set("v.lang", urlParams.language);
			} else {
				cmp.set("v.lang", "en_CA");
			}
		});
	},
	doneRendering: function (cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";
	},
	onStartRegistration: function (cmp, evt, hlpr) {
		var
			currentStep = cmp.get("v.currentStep"),
			nextStep = currentStep += 1;
		cmp.set("v.currentStep", nextStep);
	},
	onNextStep: function (cmp, evt, hlpr) {
		var
			currentStep = cmp.get("v.currentStep"),
			nextStep = currentStep += 1;
		cmp.set("v.currentStep", nextStep);
	},
	onBackStep: function (cmp, evt, hlpr) {

		var
			utils = cmp.find("CP_Utils"),
			payload = evt.getParam("payload"),
			currentStep = cmp.get("v.currentStep");

		if (payload.id === "registration-step-1" || payload.id === "registration-step-2") {
			// utils.gotoLogin();
		} else {

			var backStep = currentStep -= 1;

			if (backStep < 0) {
				backStep = 0;
			}

			cmp.set("v.currentStep", backStep);

		}
	},
	onLockedOut: function (cmp, evt, hlpr) {
		cmp.set("v.currentStep", 5);
	},
	onNotCompleted: function (cmp, evt, hlpr) {
<<<<<<< HEAD

=======
>>>>>>> origin
		if (evt.getParam("payload").id === cmp.get("v.id")) {
			cmp.set("v.currentStep", 6);
		}
	}
})