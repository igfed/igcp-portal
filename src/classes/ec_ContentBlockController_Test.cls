@isTest
public with sharing class ec_ContentBlockController_Test {
    static testMethod void test_renderForLtng() {
        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();
        sbr.addMockResponse();

        ec_APIHelper_Test.RenderResultBundleResposne rrbr = new ec_APIHelper_Test.RenderResultBundleResposne('OrchestraRenderingAPI');
        rrbr.setContentType('SampleContentType');
        rrbr.setTagPaths(new List<String>{'/PathOne/ChildOne', '/PathTwo/ChildTwo'});

        rrbr.addContentRenderings('Sample Renderings');

        rrbr.addMockResponse();

        ec_ContentBlockController.renderForLtng('contentName', 'contentLayout', false, 'siteName', 'en_US');
    }
}