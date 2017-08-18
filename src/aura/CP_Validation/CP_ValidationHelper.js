({
	isSame : function(val1, val2) {
		return val1 === val2 ? true : false;
	},
	min : function(length, param) {
		return length >= param;
	},
	max : function(length, param) {
		return length <= param;
	},
	alphanumeric : function(value) {
		return /^\w+$/i.test( value );
	}
})