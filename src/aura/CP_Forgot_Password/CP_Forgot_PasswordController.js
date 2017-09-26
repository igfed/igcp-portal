({
	onNextStep: function(cmp, evt, hlpr) {

		var
			currentStep = cmp.get("v.currentStep");
			console.log("BEFORE: " + cmp.get("v.currentStep"));
		nextStep = currentStep += 1;
		cmp.set("v.currentStep", nextStep);

		console.log("After: " + cmp.get("v.currentStep"));
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
			cmp.set("v.currentStep", 4);
		}
	}
})