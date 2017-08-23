@isTest
public with sharing class ec_Policy_Test {
    static testMethod void test_PolicySummary() {
        ec_PolicySummary con = new ec_PolicySummary();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(con);
        addPropertiesToFactory(factory);
        con.getHTML();
    }

    static testMethod void test_PolicyDetail() {
        ec_PolicyDetail con = new ec_PolicyDetail();
        cms.TestControllerFactory factory = new cms.TestControllerFactory(con);
        addPropertiesToFactory(factory);
        con.getHTML();
    }

    private static cms.TestControllerFactory addPropertiesToFactory(cms.TestControllerFactory factory) {
        factory.addContentProperty('policyDetailLinkString', 'policyDetailLinkString');
        factory.addContentProperty('policyDetail', 'policyDetail');
        factory.addContentProperty('policyArea', 'policyArea');
        factory.addContentProperty('policyAreaLink', 'policyAreaLink');
        factory.addContentProperty('detailContentLayout', 'detailContentLayout');
        factory.addContentProperty('policyDetailLink', 'policyDetailLink');
        factory.addContentProperty('policyType', 'policyType');
        factory.addContentProperty('contentTypeId', 'contentTypeId');
        factory.addContentProperty('logo', 'logo');
        factory.addContentProperty('title', 'title');
        factory.addContentProperty('escapedTitle', 'escapedTitle');
        factory.addContentProperty('policySummary', 'policySummary');
        factory.addContentProperty('dateEffective', 'dateEffective');
        factory.addContentProperty('dateLastReview', 'dateLastReview');
        factory.addContentProperty('dateScheduledReview', 'dateScheduledReview');
        factory.addContentProperty('supersedes', 'supersedes');
        factory.addContentProperty('approvedBy', 'approvedBy');
        factory.addContentProperty('section1Title', 'section1Title');
        factory.addContentProperty('section1Body', 'section1Body');
        factory.addContentProperty('section2Title', 'section2Title');
        factory.addContentProperty('section2Body', 'section2Body');
        factory.addContentProperty('section3Title', 'section3Title');
        factory.addContentProperty('section3Body', 'section3Body');
        factory.addContentProperty('section4Title', 'section4Title');
        factory.addContentProperty('section4Body', 'section4Body');
        factory.addContentProperty('backButton', 'backButton');
        factory.addContentProperty('renderTagPath', 'one');
        factory.addContentProperty('renderTagPath', 'two');

        factory.setOriginalPublishStartDate(DateTime.now());

        return factory;
    }
}