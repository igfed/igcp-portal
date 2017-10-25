({
	setAttr : function(attr, val, cmp) {
		if(val) {
			cmp.set(attr, val);
		} else {
			cmp.set(attr, $A.get("$Label.c.CP_Generic_Not_Available"));
		}
	}
})