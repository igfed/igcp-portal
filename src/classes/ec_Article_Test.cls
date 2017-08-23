@isTest
public with sharing class ec_Article_Test {
    static testMethod void test_ArictleDetail_ImageRight() {
        ec_ArticleDetail_ImageRight con = new ec_ArticleDetail_ImageRight();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(con);
        addPropertiesToFactory(factory);
        con.getHTML();
    }

    static testMethod void test_ArictlDetail_SLDSFiguree() {
        ec_ArticleDetail_SLDSFigure con = new ec_ArticleDetail_SLDSFigure();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(con);
        addPropertiesToFactory(factory);
        con.getHTML();
    }

    static testMethod void test_ArictlSummary_BigTexte() {
        ec_ArticleSummary_BigText con = new ec_ArticleSummary_BigText();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(con);
        addPropertiesToFactory(factory);
        con.getHTML();
    }

    static testMethod void test_ArictleSummary_SLDSMedia() {
        ec_ArticleSummary_SLDSMedia con = new ec_ArticleSummary_SLDSMedia();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(con);
        addPropertiesToFactory(factory);
        con.getHTML();
    }

    static testMethod void test_ArictleSummary_TextOnHover() {
        ec_ArticleSummary_TextOnHover con = new ec_ArticleSummary_TextOnHover();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(con);
        addPropertiesToFactory(factory);
        con.getHTML();
    }

    static testMethod void test_FeaturedArticleSummary_SLDSMedia() {
        ec_FeaturedArticleSummary_SLDSMedia con = new ec_FeaturedArticleSummary_SLDSMedia();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(con);
        addPropertiesToFactory(factory);
        con.getHTML();
    }


    static testMethod void test_ArictleSummaryCompact_SLDS() {
        ec_ArticleSummaryCompact_SLDS con = new ec_ArticleSummaryCompact_SLDS();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(con);
        addPropertiesToFactory(factory);
        con.getHTML();

        ec_APIHelper_Test.ContentBundleResponse cbr = new ec_APIHelper_Test.ContentBundleResponse('ContentAPI');
        cbr.addMockResponse();

        String contentId = con.contentTypeId;
    }

    private static cms.TestControllerFactory addPropertiesToFactory(cms.TestControllerFactory factory) {
        factory.addContentProperty('articleDetailLinkString', 'articleDetailLinkString');
        factory.addContentProperty('articleDetail', 'articleDetail');
        factory.addContentProperty('newsArea', 'newsArea');
        factory.addContentProperty('detailContentLayout', 'detailContentLayout');
        factory.addContentProperty('articleDetailLink', 'articleDetailLink');
        factory.addContentProperty('articleType', 'articleType');
        factory.addContentProperty('iconName', 'account');
        factory.addContentProperty('iconType', 'standard');
        factory.addContentProperty('backButton', 'backButton');
        factory.addContentProperty('ImageId', 'ImageId');
        factory.addContentProperty('LargeImageId', 'LargeImageId');
        factory.addContentProperty('AltImageText', 'AltImageText');
        factory.addContentProperty('TitleImageText', 'TitleImageText');
        factory.addContentProperty('Headline', 'Headline');
        factory.addContentProperty('SummaryContent', 'SummaryContent');
        factory.addContentProperty('htmlContent', 'htmlContent');
        factory.addContentProperty('renderTagPath', 'one');
        factory.addContentProperty('renderTagPath', 'two');

        factory.setOriginalPublishStartDate(DateTime.now());

        return factory;
    }
}