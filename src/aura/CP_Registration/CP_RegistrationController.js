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

		try {
			var data = {};

			data["titles"] = [
				$A.get("$Label.c.CP_Generic_Label_Investors_Group_Financial_Services"),
				$A.get("$Label.c.CP_Generic_Label_Investors_Group_Security_Inc"),
				$A.get("$Label.c.CP_Generic_Label_Mortgage"),
				$A.get("$Label.c.CP_Generic_Label_Insurance"),
				$A.get("$Label.c.CP_Generic_Label_iProfile")
			];

			data["larges"] = [{
					"url": "statement-samples/large/igfs-sample.jpg",
					"alt": "IGFS alt"
				},
				{
					"url": "statement-samples/large/igsi-sample.jpg",
					"alt": "IGSI alt"
				},
				{
					"url": "statement-samples/large/mortgage-sample.jpg",
					"alt": "Mortgage alt"
				},
				{
					"url": "statement-samples/large/insurance-sample.jpg",
					"alt": "Insurance alt"
				},
				{
					"url": "statement-samples/large/iprofile-sample.jpg",
					"alt": "iProfile alt"
				}
			];


			data["thumbs"] = [{
					"url": "statement-samples/thumbs/igfs-thumb.jpg",
					"alt": "IGFS thumb alt"
				},
				{
					"url": "statement-samples/thumbs/igsi-thumb.jpg",
					"alt": "IGSI thumb alt"
				},
				{
					"url": "statement-samples/thumbs/mortgage-thumb.jpg",
					"alt": "Mortgage thumb alt"
				},
				{
					"url": "statement-samples/thumbs/insurance-thumb.jpg",
					"alt": "Insurance thumb alt"
				},
				{
					"url": "statement-samples/thumbs/iprofile-thumb.jpg",
					"alt": "iProfile thumb alt"
				}
			];

			cmp.set("v.carouselData", data);
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
			console.log("BACK");
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