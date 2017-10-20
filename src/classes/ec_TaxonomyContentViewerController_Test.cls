@isTest
public with sharing class ec_TaxonomyContentViewerController_Test {
    static testMethod void test_getContent() {
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
        rrbr.addContentRenderings('Sample Renderings');
        rrbr.addMockResponse();

        ec_APIHelper_Test.SocialBundleResponse sobr = new ec_APIHelper_Test.SocialBundleResponse('SocialAPI');
        sobr.createSocialBundle();
        sobr.addMockResponse();

        String fakeId = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);

        ec_TaxonomyContentViewerController.getContent(fakeId, new List<String>{'SmallBlock'}, false, 'SiteName', 'en_US');
    }

    static testMethod void test_labels() {
        ec_TaxonomyContentViewerController tcvc = new ec_TaxonomyContentViewerController();
        tcvc.requiredCustomLabels();
    }
}