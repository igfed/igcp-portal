@isTest
public with sharing class ec_ContentBlock_Test {
    static testMethod void test_ContentBlockList() {
        ec_ContentBlock contentBlockController = new ec_ContentBlock();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(contentBlockController);

        factory.addContentProperty('calloutHeading', 'calloutHeading');
        factory.addContentProperty('blockType', 'list');
        factory.addContentProperty('contentIds', 'contentIds');
        factory.addContentProperty('contentLayouts', 'contentLayouts');
        factory.addContentProperty('ignoreTargeting', 'ignoreTargeting');
        factory.addContentProperty('galleryImages', 'galleryImages');
        factory.addContentProperty('galleryCaptions', 'galleryCaptions');
        factory.addContentProperty('sliderTime', 'sliderTime');

        factory.setOriginalPublishStartDate(DateTime.now());

        ec_APIHelper_Test.RenderResultBundleResposne rrbr =
                new ec_APIHelper_Test.RenderResultBundleResposne('OrchestraRenderingAPI');
        rrbr.setContentType('SampleContentType');
        rrbr.addContentRenderings('Sample Renderings');

        rrbr.addMockResponse();

        contentBlockController.getHTML();
    }

    static testMethod void test_ContentBlockSlider() {
        ec_ContentBlock contentBlockController = new ec_ContentBlock();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(contentBlockController);

        factory.addContentProperty('calloutHeading', 'calloutHeading');
        factory.addContentProperty('blockType', 'slider');
        factory.addContentProperty('contentIds', 'contentIds');
        factory.addContentProperty('contentLayouts', 'contentLayouts');
        factory.addContentProperty('ignoreTargeting', 'ignoreTargeting');
        factory.addContentProperty('galleryImages', 'galleryImages');
        factory.addContentProperty('galleryCaptions', 'galleryCaptions');
        factory.addContentProperty('sliderTime', 'sliderTime');

        factory.setOriginalPublishStartDate(DateTime.now());

        ec_APIHelper_Test.RenderResultBundleResposne rrbr =
                new ec_APIHelper_Test.RenderResultBundleResposne('OrchestraRenderingAPI');
        rrbr.setContentType('SampleContentType');
        rrbr.addContentRenderings('Sample Renderings');

        rrbr.addMockResponse();

        contentBlockController.getHTML();
    }

    static testMethod void test_ContentBlockGallery() {
        ec_ContentBlock contentBlockController = new ec_ContentBlock();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(contentBlockController);

        factory.addContentProperty('calloutHeading', 'calloutHeading');
        factory.addContentProperty('blockType', 'gallery');
        factory.addContentProperty('contentIds', 'contentIds');
        factory.addContentProperty('contentLayouts', 'contentLayouts');
        factory.addContentProperty('ignoreTargeting', 'ignoreTargeting');
        factory.addContentProperty('galleryImages', '["galleryImage1", "galleryImage2"]');
        factory.addContentProperty('galleryCaptions', '["galleryCaptions1", "galleryCaptions2"]');
        factory.addContentProperty('sliderTime', 'sliderTime');

        factory.setOriginalPublishStartDate(DateTime.now());

        ec_APIHelper_Test.RenderResultBundleResposne rrbr =
                new ec_APIHelper_Test.RenderResultBundleResposne('OrchestraRenderingAPI');
        rrbr.setContentType('SampleContentType');
        rrbr.addContentRenderings('Sample Renderings');

        rrbr.addMockResponse();

        contentBlockController.getHTML();
    }
}