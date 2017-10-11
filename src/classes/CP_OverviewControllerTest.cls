@isTest
private class CP_OverviewControllerTest {
	
	@isTest static void test_getInvestmentPreviewDTO() {
		Test.setMock(HttpCalloutMock.class, new IGAccountSummaryMockHttpResponse());
		DTO_InvestmentsPreview rv = CP_OverviewController.getInvestmentPreviewDTO('1234567890');
		System.assertNotEquals(null, rv, 'The return value should not be NULL');
		System.assertNotEquals(0, rv.previewAggregatesByType.size(), 'previewAggregatesByType must be populated');
	}

	@isTest static void test_getInsurancePreviewDTO() {
		Test.setMock(HttpCalloutMock.class, new IGInsuranceMockHttpResponse());
		DTO_InsurancePreview rv = CP_OverviewController.getInsurancePreviewDTO('1234567890');
		System.assertNotEquals(null, rv, 'The return value should not be NULL');
		System.assertNotEquals(0, rv.previewItemsList.size(), 'The previewItemsList must be populated');
	}	

	@isTest static void test_getMortgagePreviewDTO() {
		Test.setMock(HttpCalloutMock.class, new IGMortgageMockHttpResponse());
		DTO_MortgagePreview rv = CP_OverviewController.getMortgagePreviewDTO('1234567890');
		System.assertNotEquals(null, rv, 'The return value should not be NULL');
		System.assertNotEquals(0, rv.previewItemsList.size(), 'The previewItemsList must be populated');
	}
	
}