({
	onInit: function (cmp, evt, hlpr) {
	},
	onNextStep: function (cmp, evt, hlpr) {
		var currentStep = cmp.get("v.currentStep");
		var nextStep = currentStep;
		var payloadStep = evt.getParam("payload").step;

		if (payloadStep) {
			nextStep = payloadStep;
		} else {
			nextStep = currentStep += 1;
		}
		cmp.set("v.currentStep", nextStep);
	},
	onBackStep: function (cmp, evt, hlpr) {
		cmp.find("CP_Utils").gotoLogin();
	},
	onNotCompleted: function (cmp, evt, hlpr) {
		if (evt.getParam("payload").id === cmp.get("v.id")) {
			cmp.set("v.currentStep", 4);
		}
	},
	onLockedOut: function (cmp, evt, hlpr) {
		cmp.set("v.currentStep", 5);
	}
})