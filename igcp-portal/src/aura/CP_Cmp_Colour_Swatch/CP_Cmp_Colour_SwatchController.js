({
	onInit : function(cmp, evt, hlpr) {
		
		cmp.set("v.inlineStyle", ("background-color: " 
			+ cmp.get("v.color") 
			+ "; height: " 
			+ cmp.get("v.height") 
			+ "; width: " 
			+ cmp.get("v.width"))
		);
	}
})