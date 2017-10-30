({
	onInit: function (cmp, evt, hlpr) {

		var
			accountNumber = "180030728",
			services = cmp.find("CP_Services"),
			utils = cmp.find("CP_Utils"),
			events = cmp.find("CP_Events");

		utils.getURLParams(function (params) {
			if (params.language) {
				cmp.set("v.lang", params.language);
			}
		});

		services.getTransactions(
			accountNumber,
			cmp,
			function (success) {
				console.log("*******");
				console.log("Get Transactions");
				console.log(success);
				console.log("*******");

				if (success !== null) {

					var 
						transactionsArr = success,
						dataArr = [],
						dataObjArr = [];

					transactionsArr.forEach(function(item, i) {
						dataArr.push([]);
						dataObjArr.push(item);
					});

					if(dataArr.length === 0) {
						dataArr = [
							["April 13, 2017", "Buy", "TFS*1234", "IG Mackenzie Canadian Equity Growth", "14.56 x 7.03", "102.38"],
							["April 13, 2017", "Income Reinvested", "TFS*1234", "IG Mackenzie Canadian Equity Growth", "14.56 x 7.03", "102.38"],
							["April 13, 2017", "Buy", "TFS*1234", "IG Mackenzie Canadian Equity Growth", "14.56 x 7.03", "102.38"],
							["April 13, 2017", "Buy", "TFS*1234", "IG Mackenzie Canadian Equity Growth", "14.56 x 7.03", "102.38"]
						]
					}

					events.fire(
						"CP_Evt_Set_Table", {
							"id": "transactions-table",
							"headers": [
								$A.get("$Label.c.CP_Generic_Label_Date"),
								$A.get("$Label.c.CP_Generic_Label_Activity"),
								$A.get("$Label.c.CP_Generic_Label_Accounts"),
								$A.get("$Label.c.CP_Generic_Label_Holdings"),
								$A.get("$Label.c.CP_Generic_Label_Unit_Price"),
								$A.get("$Label.c.CP_Generic_Label_Total")
							],
							"data": dataArr,
							"dataObj": dataObjArr
						}
					);
				} else {
					console.warn("CP_Activity: getTransactions: The backend call returned a null object. Check if you are logged in as a community user.");
				}
			},
			function (error) {
				console.error("Transactions");
				console.error(error);
			}
		);

		services.getInstructions(
			accountNumber,
			cmp,
			function (success) {
				console.log("*******");
				console.log("Get Instructions");
				console.log(success);
				console.log("*******");

				if (success !== null) {

					var 
						transactionsArr = success,
						dataArr = [],
						dataObjArr = [];

					transactionsArr.forEach(function(item, i) {
						dataArr.push([]);
						dataObjArr.push(item);
					});

					if(dataArr.length === 0) {
						dataArr = [
							["April 13, 2017", "Buy", "TFS*1234", "IG Mackenzie Canadian Equity Growth", "14.56 x 7.03", "102.38"],
							["April 13, 2017", "Income Reinvested", "TFS*1234", "IG Mackenzie Canadian Equity Growth", "14.56 x 7.03", "102.38"],
							["April 13, 2017", "Buy", "TFS*1234", "IG Mackenzie Canadian Equity Growth", "14.56 x 7.03", "102.38"],
							["April 13, 2017", "Buy", "TFS*1234", "IG Mackenzie Canadian Equity Growth", "14.56 x 7.03", "102.38"]
						]
					}

					events.fire(
						"CP_Evt_Set_Table", {
							"id": "instructions-table",
							"headers": [
								$A.get("$Label.c.CP_Generic_Label_Date"),
								$A.get("$Label.c.CP_Generic_Label_Activity"),
								$A.get("$Label.c.CP_Generic_Label_Accounts"),
								$A.get("$Label.c.CP_Generic_Label_Holdings"),
								$A.get("$Label.c.CP_Generic_Label_Unit_Price"),
								$A.get("$Label.c.CP_Generic_Label_Total")
							],
							"data": dataArr,
							"dataObj": dataObjArr
						}
					);
				} else {
					console.warn("CP_Activity: getInstructions: The backend call returned a null object. Check if you are logged in as a community user.");
				}
			},
			function (error) {
				console.error("Instructions");
				console.error(error);
			}
		);
	},
	doneRendering: function (cmp, evt, hlpr) {
		var body = document.querySelector("body");
		body.className = "igcp-background__tiled igcp-utils__display--block";
	}
})