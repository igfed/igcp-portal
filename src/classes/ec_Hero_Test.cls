@isTest
public with sharing class ec_Hero_Test {
    static testMethod void test_Hero() {
        ec_Hero heroController = new ec_Hero();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(heroController);

        factory.addContentProperty('backgroundImage', 'backgroundImage');
        factory.addContentProperty('iconType', 'iconType');
        factory.addContentProperty('iconName', 'iconName');
        factory.addContentProperty('heading', 'heading');
        factory.addContentProperty('subheading', 'subheading');
        factory.addContentProperty('heroLinkAsData', 'heroLinkAsData');
        factory.addContentProperty('heroLink', 'heroLink');
        factory.addContentProperty('heightString', 'heightString');
        factory.addContentProperty('headingPosition', 'headingPosition');
        factory.addContentProperty('extraClasses', 'extraClasses');

        factory.setOriginalPublishStartDate(DateTime.now());

        heroController.getHTML();
    }
}