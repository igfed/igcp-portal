@isTest
public with sharing class ec_TaxonomySearchController_Test {
    static testMethod void test_search() {
        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();
        sbr.addMockResponse();

        ec_APIHelper_Test.ContentTypeBundleResponse cbr = new ec_APIHelper_Test.ContentTypeBundleResponse('ContentAPI');
        cbr.addMockResponse();

        ec_APIHelper_Test.FilteringAPIResponse far = new ec_APIHelper_Test.FilteringAPIResponse('FilteringAPI');
        far.addMockResponse();

        ec_TaxonomySearchController.search('searchTerm', 'contentType', 'order', 'contentTemplate', 'en_US', 'true',
                'allowTagFiltering', 'categoriesVisible', 'taxVisible', false);
    }
}