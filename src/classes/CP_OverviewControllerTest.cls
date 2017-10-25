@isTest
private class CP_OverviewControllerTest {
	@testSetup static void init() {
		CP_ControllerTestsUtil.createCustomSettingsData();
		CP_ControllerTestsUtil.createCommunityUser();
	}
    
    @isTest static void test_getInvestmentPreviewDTO() {
        User aUser = [select Id, UserName from User where email = 'test.user@emaildomain.com'];
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new IGAccountSummaryMockHttpResponse());
       	System.runAs(aUser) {
       		DTO_InvestmentsPreview rv = CP_OverviewController.getInvestmentPreviewDTO();	
       		System.assertNotEquals(null, rv, 'The return value should not be NULL');
	        System.assertNotEquals(0, rv.previewAggregatesByType.size(), 'previewAggregatesByType must be populated');
       	}
       	Test.stopTest();
    }
    
    @isTest static void test_getInsurancePreviewDTO() {
    	User aUser = [select Id, UserName from User where email = 'test.user@emaildomain.com'];
    	Test.startTest();
        Test.setMock(HttpCalloutMock.class, new IGInsuranceMockHttpResponse());
        System.runAs(aUser) {
        	DTO_InsurancePreview rv = CP_OverviewController.getInsurancePreviewDTO();	
	        System.assertNotEquals(null, rv, 'The return value should not be NULL');
    	    System.assertNotEquals(0, rv.previewItemsList.size(), 'The previewItemsList must be populated');
        }
		Test.stopTest();     
    }   

    @isTest static void test_getMortgagePreviewDTO() {
    	User aUser = [select Id, UserName from User where email = 'test.user@emaildomain.com'];
    	Test.startTest();
        Test.setMock(HttpCalloutMock.class, new IGMortgageMockHttpResponse());
        System.runAs(aUser) {
	        DTO_MortgagePreview rv = CP_OverviewController.getMortgagePreviewDTO();
	        System.assertNotEquals(null, rv, 'The return value should not be NULL');
	        System.assertNotEquals(0, rv.previewItemsList.size(), 'The previewItemsList must be populated');        	
        }
        Test.stopTest();
    }
}