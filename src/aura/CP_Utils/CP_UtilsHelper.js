({
	formatCurrency: function(rawVal, decimalPos, commaPos, commaDelimeter, decimalDelimiter) {
		/**
		 * Number.prototype.format(n, x, s, c)
		 * 
		 * @param integer decimalPos: length of decimal
		 * @param integer commaPos: length of whole part
		 * @param mixed   commaDelimeter: sections delimiter
		 * @param mixed   decimalDelimiter: decimal delimiter
		 */
		var 
			re = '\\d(?=(\\d{' + (commaPos || 3) + '})+' + (decimalPos > 0 ? '\\D' : '$') + ')',
			num = rawVal.toFixed(Math.max(0, ~~decimalPos)),
			formattedValue;

		formattedValue = (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(re, 'g'), '$&' + (commaDelimeter || ','));

		if(formattedValue.indexOf('.') === -1) {
			formattedValue += ".00";
		} else {
			formattedValue = formattedValue;
		}

		return formattedValue;

		//Examples
		//12345678.9.formatCurrency(2, 3, '.', ','); // "12.345.678,90"
		//123456.789.formatCurrency(4, 4, ' ', ':'); // "12 3456:7890"
		//12345678.9.formatCurrency(0, 3, '-'); // "12-345-679"
	}
})