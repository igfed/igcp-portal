({
	setInitQuestions: function(cmp) {
		cmp.set("v.questionOneArr", cmp.get("v.allQuestionsArr"));
		cmp.set("v.questionTwoArr", cmp.get("v.allQuestionsArr"));
		cmp.set("v.questionThreeArr", cmp.get("v.allQuestionsArr"));
	},
	debounce: function(cmp, hlpr) {

		if(cmp.get("v.changeCalled") === false) {
			hlpr.filterAndSet(cmp);
			cmp.set("v.changeCalled", true);
		}

		setTimeout(function(){
			cmp.set("v.changeCalled", false);
		}, 1000);
	},
	filterAndSet: function(cmp) {

		console.log("FIlter and SRT");

		try {
			cmp.find("CP_Utils").filterArray(
				cmp.get("v.allQuestionsArr"),
				[cmp.get("v.securityQuestion2"), cmp.get("v.securityQuestion3")],
				function (arr) {
					cmp.set("v.questionOneArr", arr);
				});
		} catch (err) {
			console.error("CP_Registration_Security_Questions: filterAndSet");
			console.error(err);
		}

		try {
			cmp.find("CP_Utils").filterArray(
				cmp.get("v.allQuestionsArr"),
				[cmp.get("v.securityQuestion1"), cmp.get("v.securityQuestion3")],
				function (arr) {
					cmp.set("v.questionTwoArr", arr);
				});
		} catch (err) {
			console.error("CP_Registration_Security_Questions: filterAndSet");
			console.error(err);
		}

		try {
			cmp.find("CP_Utils").filterArray(
				cmp.get("v.allQuestionsArr"),
				[cmp.get("v.securityQuestion1"), cmp.get("v.securityQuestion2")],
				function (arr) {
					cmp.set("v.questionThreeArr", arr);
				});
		} catch (err) {
			console.error("CP_Registration_Security_Questions: filterAndSet");
			console.error(err);
		}
	}
})