@isTest
public with sharing class ec_PageHelper_Test {
    static testMethod void test_pageHeader() {
        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();

        ec_APIHelper_Test.RenderResultBundleResposne rrbr = new ec_APIHelper_Test.RenderResultBundleResposne('OrchestraRenderingAPI');
        rrbr.setContentType('SampleContentType');
        rrbr.setTagPaths(new List<String>{'/PathOne/ChildOne', '/PathTwo/ChildTwo'});

        rrbr.addContentRenderings('Sample Renderings');

        rrbr.addMockResponse();

        ec_PageHeaderController.getPageHeader('en_US');

        sbr.addMockResponse();
        rrbr.addMockResponse();
        ec_PageFooterController.getPageFooter('en_US');

        sbr.addMockResponse();
        rrbr.addMockResponse();
        ec_PageHeaderLinksController.getHeaderLinks('en_US');
    }
}