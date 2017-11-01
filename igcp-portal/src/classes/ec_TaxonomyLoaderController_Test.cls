@isTest
public with sharing class ec_TaxonomyLoaderController_Test {
    static testMethod void test_search() {
        List<String> tagPaths = new List<String>{'/TagOne/ChildOne', '/TagTwo/ChildTwo'};
        List<String> contentTypes = new List<String>{'Text'};
        List<String> contentLayouts = new List<String>{'SmallBlock'};

        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();
        sbr.addMockResponse();

        ec_APIHelper_Test.RenderResultBundleResposne rrbr = new ec_APIHelper_Test.RenderResultBundleResposne('OrchestraRenderingAPI');
        rrbr.setContentType('Text');
        rrbr.setTagPaths(new List<String>{'/PathOne/ChildOne', '/PathTwo/ChildTwo'});
        rrbr.addContentRenderings('Sample Renderings');

        rrbr.addMockResponse();
        ec_TaxonomyLoaderController.getContentsByTaxonomy('SiteName', tagPaths, contentTypes, contentLayouts, 'order', false, 10, 3, false, 'en_US');

        sbr.addMockResponse();
        sbr.addMockResponse();
        rrbr.addMockResponse();
        ec_TaxonomyLoaderController.getContentsByTaxonomy('SiteName', tagPaths, contentTypes, contentLayouts, 'order', false, 10, 3, true, 'en_US');
    }

    static testMethod void testLabels() {
        ec_TaxonomyLoaderController tlc = new ec_TaxonomyLoaderController();
        tlc.requiredCustomLabels();
    }

    static testMethod void testLikes() {
        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();

        ec_APIHelper_Test.SocialBundleResponse sobr = new ec_APIHelper_Test.SocialBundleResponse('SocialAPI');
        sobr.createSocialBundle();
        sobr.addMockResponse();

        ec_TaxonomyLoaderController.getBulkLikeCounts(new List<String>{ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType)}, 'Dummy Site', 'Dummy Language');
        ec_TaxonomyLoaderController.setLikeContent(ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType), 'Dummy Site', 'Dummy Language');
        ec_TaxonomyLoaderController.setUnlikeContent(ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType), 'Dummy Site', 'Dummy Language');

    }
}