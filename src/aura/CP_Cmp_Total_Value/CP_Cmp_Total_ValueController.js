({
	onValueChange : function (cmp, evt, hlpr) {
        if(cmp.get("v.valueReceived") === false) {
			cmp.find("CP_Events").fire("CP_Evt_Loading_Hide", { "id" : "total-value-spinner" });
			cmp.set("v.valueReceived", true);
		}
    }
})