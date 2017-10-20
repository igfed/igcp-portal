({
<<<<<<< HEAD
=======
	stringHas: function(pattern, string, callback){
		var hasVal = false;

		if(string.indexOf(pattern) !== -1) {
			hasVal = true;
		}

		callback(hasVal);
	},
>>>>>>> master
	checkType: function(obj, callback){
		callback(typeof obj);
	},
	formatCurrency: function(rawVal, decimalPos, commaPos, commaDelimeter, decimalDelimiter) {
		/**
		 * Number.prototype.format(n, x, s, c)
		 * 
		 * @param integer decimalPos: length of decimal
		 * @param integer commaPos: length of whole part
		 * @param mixed   commaDelimeter: sections delimiter
		 * @param mixed   decimalDelimiter: decimal delimiter
		 */

		//make sure we only have two decimal places
		if(typeof rawVal === "string") {
			var 
				rawValArr = rawVal.split(".");

			if(rawValArr[rawValArr.length - 1].length >= 3) {
				rawVal = Number(rawVal.slice(0, -1));
			}
		} 

		//if decimalPos is not defined, default to 2
		decimalPos = decimalPos || 2;

		var 
			re = '\\d(?=(\\d{' + (commaPos || 3) + '})+' + (decimalPos > 0 ? '\\D' : '$') + ')',
			num = rawVal.toFixed(decimalPos),
			formattedValue;

		formattedValue = (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(re, 'g'), '$&' + (commaDelimeter || ','));

		if(formattedValue.indexOf('.') === -1) {
			formattedValue += ".00";
		}

		//Examples
		//12345678.9.formatCurrency(2, 3, '.', ','); // "12.345.678,90"
		//123456.789.formatCurrency(4, 4, ' ', ':'); // "12 3456:7890"
		//12345678.9.formatCurrency(0, 3, '-'); // "12-345-679"

		return formattedValue;
	}
})