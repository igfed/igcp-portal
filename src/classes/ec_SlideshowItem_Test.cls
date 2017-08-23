@isTest
public with sharing class ec_SlideshowItem_Test {
    static testMethod void test_SlideshowItem() {
        ec_SlideshowItem slideShowController = new ec_SlideshowItem();

        cms.TestControllerFactory factory = new cms.TestControllerFactory(slideShowController);
        factory.addContentProperty('headingText', 'headingText');
        factory.addContentProperty('summaryText', 'summaryText');
        factory.addContentProperty('linkDestAsData', 'linkDestAsData');
        factory.addContentProperty('image', 'image');
        factory.addContentProperty('iconType', 'iconType');
        factory.addContentProperty('iconName', 'iconName');
        factory.addContentProperty('imageAltText', 'imageAltText');
        factory.addContentProperty('imageTitleText', 'imageTitleText');
        factory.addContentProperty('linkDes', 'linkDes');

        factory.setOriginalPublishStartDate(DateTime.now());

        slideShowController.getHTML();
        String imageAlt = slideShowController.imageAltText;
        String imageTitle = slideShowController.imageTitleText;
        Boolean isPublished = slideShowController.getPublished();
    }
}