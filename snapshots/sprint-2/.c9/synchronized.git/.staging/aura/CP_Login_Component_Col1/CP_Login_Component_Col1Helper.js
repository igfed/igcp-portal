({
	validateInput : function(field, errMsg) {
		
		console.log(field);
		
		let val =  field.get("v.value");
		
		if(val.length === 0) {
			field.set("v.errors", [{message: errMsg}]);
		} else {
			field.set("v.errors", null);
		}
	}
})