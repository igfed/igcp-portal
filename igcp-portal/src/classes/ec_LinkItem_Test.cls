@isTest
public with sharing class ec_LinkItem_Test {
    static testMethod void test_LinkItem() {
        ec_LinkItem linkController = new ec_LinkItem();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(linkController);

        factory.addContentProperty('linkText', 'linkText');
        factory.addContentProperty('linkDest', 'linkDest');
        factory.addContentProperty('iconOverride', 'iconOverride');
        factory.addContentProperty('iconType', 'iconType');
        factory.addContentProperty('iconName', 'iconName');
        factory.addContentProperty('iconAltText', 'iconAltText');
        factory.addContentProperty('iconTitleText', 'iconTitleText');

        factory.setOriginalPublishStartDate(DateTime.now());

        linkController.getHTML();
    }

    static testMethod void test_LinkItemBlankIcon() {
        ec_LinkItem linkController = new ec_LinkItem();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(linkController);

        factory.addContentProperty('linkText', 'linkText');
        factory.addContentProperty('linkDest', 'linkDest');
        factory.addContentProperty('iconOverride', '');
        factory.addContentProperty('iconType', 'iconType');
        factory.addContentProperty('iconName', '');
        factory.addContentProperty('iconAltText', 'iconAltText');
        factory.addContentProperty('iconTitleText', 'iconTitleText');

        factory.setOriginalPublishStartDate(DateTime.now());

        linkController.getHTML();
        String getSafeStringFromProperty = linkController.getSafeStringFromProperty('iconType', 'test');
    }
}