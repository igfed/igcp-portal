({
	doneRendering: function(cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";
	},
	onNextStep: function(cmp, evt, hlpr) {
		var
			currentStep = cmp.get("v.currentStep");
		nextStep = currentStep += 1;
		cmp.set("v.currentStep", nextStep);
	},
	onBackStep: function(cmp, evt, hlpr) {
		var
			currentStep = cmp.get("v.currentStep");
		backStep = currentStep -= 1;

		if (backStep < 0) {
			backStep = 0;
		}

		cmp.set("v.currentStep", backStep);
	},
	onNotCompleted: function(cmp, evt, hlpr) {
		if(evt.getParam("payload").id === cmp.get("v.id")) {
			cmp.set("v.currentStep", 3);
		}
	},
	onLockedOut: function(cmp, evt, hlpr) {
		cmp.set("v.currentStep", 4);
	}
})