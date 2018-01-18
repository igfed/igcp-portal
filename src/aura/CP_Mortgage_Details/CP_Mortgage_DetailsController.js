({
	onInit: function (cmp, evt, hlpr) {

		//1210728500
		var
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils"),
			events = cmp.find("CP_Events");

		utils.getURLParams(function (params) {
			if (params.language) {
				cmp.set("v.lang", params.language);
			}

			if (params.loanEnc) {
				cmp.set("v.loanNumberEnc", params.loanEnc);
			} else {
				console.warn("CP_Account: No loan number passed.");
			}
		});

		services.getMortgageDetail(
			cmp.get("v.loanNumberEnc"),
			cmp,
			function (success) {
				if (success !== null) {

					console.info("MORTGAGE DETAIL");
					console.log(success);

					utils.formatPercentage(
						success.interestRate,
						function (returnedVal) {
							hlpr.setAttr("v.interestRate", returnedVal, cmp);
						},
						cmp.get("v.lang"),
						true
					);

					utils.formatToCurrency(success.loanBalance, function (returnedVal) {
						hlpr.setAttr("v.loanBalance", returnedVal, cmp);
					}, cmp.get("v.lang"));

					//ADDRESS
					cmp.set("v.addressObj", {
						"street" : success.propertyAddress,
						"city" : success.propertyCity,
						"province" : success.propertyProvince,
						"postalCode" : success.propertyPostalCode
					});

					console.info("ADDRESS");
					console.log(cmp.get("v.addressObj"));

					utils.formatToCurrency(success.paymentAmount, function (returnedVal) {
						hlpr.setAttr("v.payment", returnedVal, cmp);
					}, cmp.get("v.lang"), true);

					hlpr.setAttr("v.frequency", success.paymentFrequency, cmp);
					hlpr.setAttr("v.lastPaymentDate", success.lastPaymentDate, cmp);
					hlpr.setAttr("v.nextPaymentDate", success.nextPaymentDate, cmp);

					utils.formatToCurrency(success.loanAmount, function (returnedVal) {
						hlpr.setAttr("v.loanAmount", returnedVal, cmp);
					}, cmp.get("v.lang"), true);

					//ASK MARWAN IF HE CAN RETURN DOLLAR VALUES WITH CENTS ALWAYS ADDED
					utils.formatToCurrency(success.prePaymentPrivilege, function (returnedVal) {
						hlpr.setAttr("v.prePaymentPrivilege", returnedVal, cmp);
					}, cmp.get("v.lang"), true);

					hlpr.setAttr("v.maturityDate", success.maturityDate, cmp);
					hlpr.setAttr("v.remainingAmortization", success.remainingAmortizationTerm, cmp);
					hlpr.setAttr("v.term", success.originalAmortizationTerm, cmp);
					hlpr.setAttr("v.remainingTerm", success.remainingTime, cmp);

					events.fire(
						"CP_Evt_Set_List", {
							"id": "mortgage-list",
							"values": [{
									label: $A.get("$Label.c.CP_Mortgage_Label_Payment"),
									detail: cmp.get("v.payment")
								},
								{
									label: $A.get("$Label.c.CP_Mortgage_Label_Frequency"),
									detail: cmp.get("v.frequency")
								},
								{
									label: $A.get("$Label.c.CP_Mortgage_Label_Last_Payment_Date"),
									detail: cmp.get("v.lastPaymentDate")
								},
								{
									label: $A.get("$Label.c.CP_Mortgage_Label_Next_Payment_Date"),
									detail: cmp.get("v.nextPaymentDate")
								},
								{
									label: $A.get("$Label.c.CP_Mortgage_Label_Loan_Amount"),
									detail: cmp.get("v.loanAmount")
								},
								{
									label: $A.get("$Label.c.CP_Mortgage_Label_Pre_Payment_Privilege"),
									detail: cmp.get("v.prePaymentPrivilege")
								},
								{
									label: $A.get("$Label.c.CP_Mortgage_Label_Maturity_Date"),
									detail: cmp.get("v.maturityDate")
								},
								{
									label: $A.get("$Label.c.CP_Mortgage_Label_Remaining_Amortization"),
									detail: cmp.get("v.remainingAmortization")
								},
								{
									label: $A.get("$Label.c.CP_Mortgage_Label_Term"),
									detail: cmp.get("v.term")
								},
								{
									label: $A.get("$Label.c.CP_Mortgage_Label_Remaining_Term"),
									detail: cmp.get("v.remainingTerm")
								}
							]
						}
					);


				} else {
					console.warn("CP_Mortgage_Details: getMortgageDetail: The backend call returned a null object. Check if you are logged in as a community user.");
				}

			},
			function (error) {
				console.error("CP_Mortgage_Details");
				console.error(error);
			}
		);
	}
})