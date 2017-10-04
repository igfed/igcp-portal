({
	formatCurrency: function(rawVal, n, x, s, c) {
		/**
		 * Number.prototype.format(n, x, s, c)
		 * 
		 * @param integer n: length of decimal
		 * @param integer x: length of whole part
		 * @param mixed   s: sections delimiter
		 * @param mixed   c: decimal delimiter
		 */
		var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
			num = rawVal.toFixed(Math.max(0, ~~n));

		return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));

		//Examples
		//12345678.9.formatCurrency(2, 3, '.', ','); // "12.345.678,90"
		//123456.789.formatCurrency(4, 4, ' ', ':'); // "12 3456:7890"
		//12345678.9.formatCurrency(0, 3, '-'); // "12-345-679"
	}
})