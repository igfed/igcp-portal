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
			console.error(err);
		}
	},
	onStartRegistration: function (cmp, evt, hlpr) {
		try {
			var
				currentStep = cmp.get("v.currentStep"),
				nextStep = currentStep += 1;
			cmp.set("v.currentStep", nextStep);
		} catch (err) {
			console.error(err);
		}
	},
	onNextStep: function (cmp, evt, hlpr) {
		try {
			var
				currentStep = cmp.get("v.currentStep"),
				nextStep = currentStep += 1;
			cmp.set("v.currentStep", nextStep);
		} catch (err) {
			console.error(err);
		}
	},
	onBackStep: function (cmp, evt, hlpr) {
		try {
			var
				currentStep = cmp.get("v.currentStep"),
				backStep = currentStep -= 1;

			if (backStep < 0) {
				backStep = 0;
			}
			cmp.set("v.currentStep", backStep);
		} catch (err) {
			console.error(err);
		}
	},
	onCancel: function (cmp, evt, hlpr) {
		try {
			console.warn("CANCEL");
			cmp.find("CP_Utils").gotoLogin();
		} catch (err) {
			console.error(err);
		}
	},
	onLockedOut: function (cmp, evt, hlpr) {
		try {
			cmp.set("v.currentStep", 5);
		} catch (err) {
			console.error(err);
		}
	},
	onNotCompleted: function (cmp, evt, hlpr) {
		try {
			if (evt.getParam("payload").id === cmp.get("v.id")) {
				cmp.set("v.currentStep", 6);
			}
		} catch (err) {
			console.error(err);
		}
	}
})