@isTest
public with sharing class ec_Subscribeable_Test {
    static testMethod void test_Subscribeable() {
        ec_APIHelper_Test.SiteBundleResposne sbr = new ec_APIHelper_Test.SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = ec_APIHelper_Test.getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();
        ec_Subscribeable subController = new ec_Subscribeable();

        cms.TestControllerFactory factory = new cms.TestControllerFactory(subController);
        factory.addContentProperty('iconName', 'testIconName');
        factory.addContentProperty('iconType', 'iconType');
        factory.addContentProperty('iconName', 'iconName');
        factory.addContentProperty('cliId', 'cliId');

        factory.setOriginalPublishStartDate(DateTime.now());

        subController.getHTML();
        subController.lightningIconMarkup('testing', 'testing');

        String testIconType = subController.iconType;
        String testIconName = subController.iconName;
        String testCLIId = subController.cliId;
    }
}