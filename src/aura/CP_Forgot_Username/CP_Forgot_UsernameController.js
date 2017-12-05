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
			cmp.set("v.currentStep", 3);
		}
	},
	onLockedOut: function (cmp, evt, hlpr) {
		cmp.set("v.currentStep", 4);
	}
})