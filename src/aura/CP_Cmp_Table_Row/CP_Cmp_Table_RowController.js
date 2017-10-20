({
	doInit: function(cmp, evt, hlpr) {

		var values = cmp.get("v.values");

		for (var key in values) {

			$A.createComponent("aura:html", { "tag": "td", "body": values[key] },
				function(newCmp, status) {
					if (status === "SUCCESS") {
						var body = cmp.get("v.body");
						body.push(newCmp);
						cmp.set("v.body", body);
					} else if (status === "INCOMPLETE") {
						console.log("No response from server or client is offline.")

					} else if (status === "ERROR") {
						console.log("Error: " + errorMessage);

					}
				}
			);
		}
	}
})