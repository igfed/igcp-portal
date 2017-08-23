@isTest
public with sharing class ec_SubscriptionEditorController_Test {

    static testMethod void test_getTaxonomies() {
        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();

        ec_APIHelper_Test.TaxonomyBundleResponse tbr = new ec_APIHelper_Test.TaxonomyBundleResponse('TaxonomyAPI');
        tbr.addToBundles('TaxonomyName');
        tbr.addMockResponse();

        tbr = new ec_APIHelper_Test.TaxonomyBundleResponse('TaxonomyAPI');
        tbr.setBundle('TaxonomyName');
        tbr.addMockResponse();

        ec_SubscriptionEditorController.getTaxonomies(new List<String>{'/Taxonomy/Path'}, 'SiteName', '', true, 'Dummy Language');
    }

    static testMethod void test_getChildren() {
        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();

        ec_APIHelper_Test.TaxonomyBundleResponse tbr = new ec_APIHelper_Test.TaxonomyBundleResponse('TaxonomyAPI');
        tbr.setBundle('TaxonomyName');
        tbr.addMockResponse();
        tbr.addMockResponse();

        ec_SubscriptionEditorController.getTaxChildren(tbr.bundle, 'SiteName', 'Dummy Language');
        ec_SubscriptionEditorController.getTaxChildrenByJSON(JSON.serialize(tbr.bundle), 'SiteName', 'Dummy Language');
    }

    static testMethod void test_setSubscriptions() {
        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();

        ec_SubscriptionEditorController.setSubscriptions(new List<String>{'/Taxonomy/Path/Dummy/Child'}, 'SiteName', new List<String>{'/Taxonomy/Path/Dummy'}, 'Dummy Language');
    }

    static testMethod void test_subscribeToPath() {
        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();

        ec_SubscriptionEditorController.subscribeToPath('/Taxonomy/Path/Dummy/Child', 'SiteName', 'Dummy Language');
    }

    static testMethod void test_subscribeToOriginId() {
        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();

        ec_SubscriptionEditorController.subscribeToOriginId('Dummy Id', 'SiteName', 'Dummy Language');
    }

    static testMethod void test_skipOnboarding() {
        ec_SubscriptionEditorController.skipOnboarding();
    }

    static testMethod void test_isUserSubscribedToPath() {
        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();

        ec_SubscriptionEditorController.isUserSubscribedToPath('/Taxonomy/Path/Dummy', 'SiteName', 'Dummy Language');
    }

    static testMethod void test_isUserSubscribedToOriginId() {
        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();

        ec_SubscriptionEditorController.isUserSubscribedToOriginId('Dummy Id', 'SiteName', 'Dummy Language');
    }
    
}