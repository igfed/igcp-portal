@isTest
public with sharing class ec_TaxonomyMenuController_Test {
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

        ec_TaxonomyMenuController.getTaxonomies('TaxonomyName', 'SiteName', 'Dummy Language');
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

        ec_TaxonomyMenuController.getTaxChildrenByJSON(JSON.serialize(tbr.bundle), 'SiteName', 'Dummy Language');
    }

    static testMethod void test_taxonomyExceptions() {
        try {
            ec_TaxonomyMenuController.getTaxonomies('', 'SiteName', 'Dummy Language');
        } catch (AuraHandledException e) {}

        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();

        ec_APIHelper_Test.TaxonomyBundleResponse tbr = new ec_APIHelper_Test.TaxonomyBundleResponse('TaxonomyAPI');
        tbr.addToBundles('TaxonomyName');
        tbr.setSuccess(false);
        tbr.addMockResponse();

        try {
            ec_TaxonomyMenuController.getTaxonomies('TaxonomyName', 'SiteName', 'Dummy Language');
        } catch (AuraHandledException e) {}

        try {
            ec_TaxonomyMenuController.getTaxChildrenByJSON('', 'SiteName', 'Dummy Language');
        } catch (AuraHandledException e) {}
    }
}