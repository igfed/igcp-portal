@isTest
public with sharing class ec_APIBundles_Test {
    static testMethod void test_TaxonomyBundle() {
        TaxonomyBundle taxonomyBundle = new TaxonomyBundle();
        taxonomyBundle.tagID = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);
        taxonomyBundle.tagDefinitionID = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);
        taxonomyBundle.taxonomyID = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);
        taxonomyBundle.languageMapOfPaths = new Map<String, String>{'test' => 'data'};
        taxonomyBundle.languageMapOfTagNames = new Map<String, String>{'test' => 'data'};
        taxonomyBundle.children = new List<TaxonomyBundle>();
        taxonomyBundle.depth = 7;

        Id tagID = taxonomyBundle.tagID;
        Id tagDefinitionID = taxonomyBundle.tagDefinitionID;
        Id taxonomyID = taxonomyBundle.taxonomyID;
        Map<String, String> languageMapOfPaths = taxonomyBundle.languageMapOfPaths;
        Map<String, String> languageMapOfTagNames = taxonomyBundle.languageMapOfTagNames;
        List<TaxonomyBundle> children = taxonomyBundle.children;
        Integer depth = taxonomyBundle.depth;
    }

    static testMethod void test_TaxonomyAPIRequest() {
        TaxonomyAPIRequest taxonomyAPIRequest = new TaxonomyAPIRequest();

        taxonomyAPIRequest.bundle = new TaxonomyBundle();
        taxonomyAPIRequest.contentId = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);
        taxonomyAPIRequest.categoriesToAdd = new Map<String, List<String>>();
        taxonomyAPIRequest.childrenToAdd = new List<TaxonomyBundle>();
        taxonomyAPIRequest.objectId = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);
        taxonomyAPIRequest.parameters = new Map<String, String>();
        taxonomyAPIRequest.listParameters = new Map<string, List<String>>();
        taxonomyAPIRequest.requestFlags = new Map<String, Boolean>();

        TaxonomyBundle bundle = taxonomyAPIRequest.bundle;
        String contentId = taxonomyAPIRequest.contentId;
        Map<String, List<String>> categoriesToAdd = taxonomyAPIRequest.categoriesToAdd;
        List<TaxonomyBundle> childrenToAdd = taxonomyAPIRequest.childrenToAdd;
        String objectId = taxonomyAPIRequest.objectId;
        Map<String, String> parameters = taxonomyAPIRequest.parameters;
        Map<string, List<String>> listParameters = taxonomyAPIRequest.listParameters;
        Map<String, Boolean> requestFlags = taxonomyAPIRequest.requestFlags;
    }

    static testMethod void test_TargetBundle() {
        TargetBundle targetBundle = new TargetBundle();

        targetBundle.targetName = '';
        targetBundle.description = '';
        targetBundle.targetType = '';
        targetBundle.targetKey = '';
        targetBundle.lastModifiedDate = DateTime.now();
        targetBundle.lastModifiedByName = '';

        String targetName = targetBundle.targetName;
        String description = targetBundle.description;
        String targetType = targetBundle.targetType;
        String targetKey = targetBundle.targetKey;
        String lastModifiedByName = targetBundle.lastModifiedByName;
        DateTime lastModifiedDate = targetBundle.lastModifiedDate;
    }

    static testMethod void test_SiteBundle() {
        SiteBundle siteBundle = new SiteBundle();

        siteBundle.siteId = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);
        siteBundle.siteName = '';
        siteBundle.siteLabel = '';
        siteBundle.siteUrl = '';
        siteBundle.siteSecureUrl = '';
        siteBundle.sitePrefix = '';
        siteBundle.siteDomain = '';
        siteBundle.siteSecureDomain = '';
        siteBundle.defaultLanguage = '';
        siteBundle.targetingEnabled = false;
        siteBundle.multilingualEnabled = false;
        siteBundle.approvalProcessEnabled = false;
        siteBundle.complianceEnabled = false;
        siteBundle.targets = new List<TargetBundle>();

        String siteId = siteBundle.siteId;
        String siteName = siteBundle.siteName;
        String siteLabel = siteBundle.siteLabel;
        String siteUrl = siteBundle.siteUrl;
        String siteSecureUrl = siteBundle.siteSecureUrl;
        String sitePrefix = siteBundle.sitePrefix;
        String siteDomain = siteBundle.siteDomain;
        String siteSecureDomain = siteBundle.siteSecureDomain;
        String defaultLanguage = siteBundle.defaultLanguage;
        Boolean targetingEnabled = siteBundle.targetingEnabled;
        Boolean multilingualEnabled = siteBundle.multilingualEnabled;
        Boolean approvalProcessEnabled = siteBundle.approvalProcessEnabled;
        Boolean complianceEnabled = siteBundle.complianceEnabled;
        List<TargetBundle> targets = siteBundle.targets;
    }

    static testMethod void test_SiteAPIRequest() {
        SiteAPIRequest siteAPIRequest = new SiteAPIRequest();
    }

    static testMethod void test_RenderResultBundle() {
        RenderResultBundle renderResultBundle = new RenderResultBundle();
        RenderResultBundle.RenderedContent renderedContent = new RenderResultBundle.RenderedContent();
        RenderResultBundle.RenderedPage renderedPage = new RenderResultBundle.RenderedPage();

        renderResultBundle.message = '';
        renderResultBundle.contentRemaining = false;
        renderResultBundle.renderings = new List<RenderResultBundle.RenderedContent>();
        renderResultBundle.pageRenderings = new List<RenderResultBundle.RenderedPage>();
        renderedContent.originId = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);
        renderedContent.contentId = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);
        renderedContent.message = '';
        renderedContent.contentBundle = new ContentBundle();
        renderedContent.renderMap = new Map<String, String>();
        renderedContent.tagPaths = new List<String>();
        renderedPage.rendering = '';
        renderedPage.url = '';
        renderedPage.name = '';

        String message = renderResultBundle.message;
        Boolean contentRemaining = renderResultBundle.contentRemaining;
        List<RenderResultBundle.RenderedContent> renderings = renderResultBundle.renderings;
        List<RenderResultBundle.RenderedPage> pageRenderings = renderResultBundle.pageRenderings;
        String originId = renderedContent.originId;
        String contentId = renderedContent.contentId;
        message = renderedContent.message;
        ContentBundle contentBundle = renderedContent.contentBundle;
        Map<String, String> renderMap = renderedContent.renderMap;
        List<String> tagPaths = renderedContent.tagPaths;
        String rendering = renderedPage.rendering;
        String url = renderedPage.url;
        String name = renderedPage.name;
    }

    static testMethod void test_FilterItem() {
        FilterItem filterItem = new FilterItem();
        filterItem.filterType = '';
        filterItem.name = '';
        filterItem.count = 3;
        filterItem.filter = '';
        filterItem.originIds = new Set<Id>{ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType)};
        filterItem.filterType = '';
        filterItem.name = '';
        filterItem.count = 3;
        filterItem.children = new List<FilterItem>();
    }

    static testMethod void test_FilteringAPIRequest() {
        FilteringAPIRequest filteringAPIRequest = new FilteringAPIRequest();
    }

    static testMethod void test_ContentTypeBundle() {
        ContentTypeBundle contentTypeBundle = new ContentTypeBundle();
        contentTypeBundle.contentTypeId = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);
        contentTypeBundle.type = '';
        contentTypeBundle.name = '';
        contentTypeBundle.label = '';
    }

    static testMethod void test_ContentLayoutBundle() {
        ContentLayoutBundle contentLayoutBundle = new ContentLayoutBundle();
        contentLayoutBundle.label = '';
        contentLayoutBundle.name = '';
        contentLayoutBundle.layoutAttributes = new Map<String, List<AttributeBundle.ContentAttribute>>();
        contentLayoutBundle.contentLayoutId = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);
    }

    static testMethod void test_ContentBundle() {
        ContentBundle contentBundle = new ContentBundle();
        contentBundle.contentId = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);
        contentBundle.originId = ec_APIHelper_Test.getFakeId(cms__Content__c.SObjectType);
        contentBundle.siteName = '';
        contentBundle.siteId = '';
        contentBundle.excludeFromSearch = false;
        contentBundle.publishedStartDate = DateTime.now();
        contentBundle.publishedEndDate = DateTime.now();
        contentBundle.lockedBy = '';
        contentBundle.lockedDate = DateTime.now();
        contentBundle.createdBy = '';
        contentBundle.lastModifiedBy = '';
        contentBundle.createdDate = DateTime.now();
        contentBundle.lastModifiedDate = DateTime.now();
        contentBundle.versionsAndRevisions = new List<ContentBundle.Version>();
        contentBundle.version = 3.0;
        contentBundle.revision = 3.0;
        contentBundle.readonly = false;
        contentBundle.published = false;
        contentBundle.sentForApproval = false;
        contentBundle.expired = false;
        contentBundle.locked = false;
        contentBundle.lockedByMe = false;
        contentBundle.allowEdit = false;
        contentBundle.allowPublish = false;
        contentBundle.allowSendForApproval = false;
        contentBundle.allowClone = false;
        contentBundle.allowExpire = false;
        contentBundle.allowDelete = false;
        contentBundle.allowVersioning = false;
        contentBundle.allowRevisioning = false;
        contentBundle.allowTarget = false;
        contentBundle.languageStatuses = new Map<String, ContentBundle.ContentLanguageStatus>();
        contentBundle.contentType = new ContentTypeBundle();
        contentBundle.contentAttributes = new Map<String, List<AttributeBundle.ContentAttribute>>();
        contentBundle.contentMetaAttributes = new Map<String, AttributeBundle.ContentMetaAttribute>();
        contentBundle.contentLayouts = new Map<String, ContentLayoutBundle>() ;
        contentBundle.taxonomyTagPaths = new List<TaxonomyBundle>() ;
        contentBundle.contentTargets = new List<TargetBundle>() ;

        ContentBundle.Version cVersion = new ContentBundle.Version();
        cVersion.version = 3.0;
        cVersion.revision = 3.0;
        cVersion.publishedStartDate = DateTime.now();
        cVersion.publishedEndDate = DateTime.now();
        cVersion.published = false;
        cVersion.expired = false;
        cVersion.sentForApproval = false;

        ContentBundle.ContentLanguageStatus contentLanguageStatus = new ContentBundle.ContentLanguageStatus();
        contentLanguageStatus.isAddedToContent = false;
        contentLanguageStatus.canTranslate = false;
        contentLanguageStatus.isTranslated = false;
        contentLanguageStatus.isActive = false;
        contentLanguageStatus.languageCode = '';
    }

    static testMethod void test_AttributeBundle() {
        AttributeBundle.ContentMetaAttribute cmattr = new AttributeBundle.ContentMetaAttribute();
        cmattr.metaContentName = '';
        cmattr.metaContentTitle = '';
        cmattr.metaContentDescription = '';
        cmattr.languageCode = '';
        cmattr.simple = true;

        AttributeBundle.ContentAttribute cattr = new AttributeBundle.ContentAttribute();
        cattr.name = '';
        cattr.value = '';
        cattr.valueType = '';
        cattr.languageCode = '';
        cattr.simple = true;
    }

    static testMethod void test_ContentAPIRequest() {
        ContentAPIRequest car = new ContentAPIRequest();
        ContentBundle cb = car.bundle;
    }

}