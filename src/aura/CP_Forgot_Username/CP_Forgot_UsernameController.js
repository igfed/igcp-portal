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
	doneRendering: function (cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-utils__display--block";
	},
	onNextStep: function (cmp, evt, hlpr) {
		var
			currentStep = cmp.get("v.currentStep"),
			nextStep = currentStep += 1;
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