({
	doneRendering: function(cmp, evt, hlpr) {

		console.log("DONE RENDERING");

		var utils = cmp.find("CP_Utils");

		utils.getURLParams(function(urlParams){
			console.log("PARAMS");
			console.log(urlParams);
		});
	},
	onStartRegistration: function(cmp, evt, hlpr) {
		var
			currentStep = cmp.get("v.currentStep");
		nextStep = currentStep += 1;
		cmp.set("v.currentStep", nextStep);
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
	onLockedOut: function(cmp, evt, hlpr) {
		cmp.set("v.currentStep", 5);
	},
	onNotCompleted: function(cmp, evt, hlpr) {

		if(evt.getParam("payload").id === cmp.get("v.id")) {
			cmp.set("v.currentStep", 6);
		}
	}
})