({
	onInit: function (cmp, evt, hlpr) {
		var services = cmp.find("CP_Services"),
			filters = ['Last 4 quarters', '2012'],
			filter = filters[1];

		// Todo: Remove Seeds
		var investmentStatements = [{
            statementDate: 'Dec 31, 2016',
            statementName: 'Investors Group Financial Services Investment Statement (Year End)',
			clientNumber: '100-156-1',
			docID: 'safsfdsd'
		},
		{
            statementDate: 'Nov 28, 2016',
            statementName: 'Investors Group Financial Services Investment Statement (Quarterly)',
			clientNumber: '123-432-1',
			docID: 'safsfdsd'
		},
		{
            statementDate: 'June 30, 2016',
            statementName: 'Investors Group Financial Services Investment Statement (Quarterly)',
			clientNumber: '123-432-1',
			docID: 'safsfdsd'
		}]
		
		// cmp.set("v.investmentStatements", investmentStatements);
		
		services.getOnlineStatementListFilter(
			filter,
			cmp,
			function (success) {
				cmp.set("v.investmentStatements", success);
				console.log('[CP_Statement] - onInit / getOnlineStatementListFilter():success = ', success)
			},
			function (error) {
				console.error("[CP_Statement] - onInit / getOnlineStatementListFilter():error = ", error);
			}
		);
	},
	switchTabs: function (cmp, evt, hlpr) {

	}
})