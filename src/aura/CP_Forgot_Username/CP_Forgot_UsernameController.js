({
	onInit: function (cmp, evt, hlpr) {

		try {
			var utils = cmp.find("CP_Utils");

			utils.getURLParams(function (urlParams) {
				if (urlParams.language) {
					cmp.set("v.lang", urlParams.language);
				} else {
					cmp.set("v.lang", "en_CA");
				}
			});
		} catch (err) {
			console.warn(err);
		}
	},
	onNextStep: function (cmp, evt, hlpr) {
		var currentStep = cmp.get("v.currentStep");
		var nextStep = currentStep;
		var payloadStep = evt.getParam("payload").step;

		console.log('current Step', currentStep)

		if (payloadStep) {
			nextStep = payloadStep;
		} else {
			nextStep = currentStep += 1;
		}
		console.log('nextStep', nextStep);
		cmp.set("v.currentStep", nextStep);
	},
	onBackStep: function (cmp, evt, hlpr) {
		cmp.find("CP_Utils").gotoLogin();
	},
	onNotCompleted: function (cmp, evt, hlpr) {
		if (evt.getParam("payload").id === cmp.get("v.id")) {
			cmp.set("v.currentStep", 3);
		}
	},
	onLockedOut: function (cmp, evt, hlpr) {
		cmp.set("v.currentStep", 4);
	}
})