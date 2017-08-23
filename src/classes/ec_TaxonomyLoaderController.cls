public with sharing class ec_TaxonomyLoaderController {

    private static final String RECORDTYPE_LIKE = Schema.SObjectType.ec_DataStore__c.RecordTypeInfosByName.get('Like').RecordTypeId;
    private static final String RECORDTYPE_TAXREAD = Schema.SOBjectType.ec_DataStore__c.RecordTypeInfosByName.get('TaxonomyRead').RecordTypeId;

    @AuraEnabled
    public static String getContentsByTaxonomy(String siteName, List<String> tagPaths, List<String> contentTypes, List<String> contentLayouts, String order, Boolean isTargeted, Integer limitCount, Integer depth, Boolean isMyNews, String langLocale) {
        return ec_TaxonomyLoaderController.getContentsByTaxonomy(siteName, tagPaths, contentTypes, contentLayouts, order, isTargeted, limitCount, depth, isMyNews, langLocale, false);
    }


    @AuraEnabled
    public static String getContentsByTaxonomy(String siteName, List<String> tagPaths, List<String> contentTypes, List<String> contentLayouts, String order, Boolean isTargeted, Integer limitCount, Integer depth, Boolean isMyNews, String langLocale, Boolean loadSubscriptions) {
        Map<String, Object> responseMap = new Map<String, Object>();
        responseMap.put('success', false);

        List<String> tags = tagPaths.get(0).split('/');
        // load user's subscriptions only if param is true, and we're at the root taxonomy node
        if (loadSubscriptions && tags.size() == 2) {
            String taxonomyRoot = tags.get(1);
            Set<String> subscriptions = ec_APIHelper.getUserSubscribedTagPaths();
            tagPaths = new List<String>(subscriptions);
            tagPaths.add('/' + taxonomyRoot + '/' + Label.ec_DefaultSubscriptionCategory);
            depth = 1;
        }

        DateTime now = System.now();
        User me = [SELECT Last_Read_News__c, Customized_TaxonomyLoader__c FROM User WHERE Id = :UserInfo.getUserId()];
        DateTime lastReadNews = me.Last_Read_News__c;
        Boolean hasCustomized = me.Customized_TaxonomyLoader__c;
        if (null != isMyNews && true == isMyNews) {
            me.Last_Read_News__c = now;
            update me;
        }

        // you'd think this would be superfluous... an integer is an integer, right?
        // seems (at the time of writing) that integers passed from a lightning component are actually decimals, and
        // apex does not like that when you go to use them.
        limitCount = Integer.valueOf(limitCount);
        depth = Integer.valueOf(depth);

        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langLocale);
        Map<String, String> hostSiteData = ec_APIHelper.getSiteData('', langLocale);

        if (siteData != null) {
            if (hostSiteData == null) { // when loaded using app builder, there will be no host site.
                hostSiteData = siteData;
            }

            if (!hasCustomized && loadSubscriptions) {
                // taxonomyloader is configured to load subscriptions but this user has not been through the customization process
                responseMap.put('success', true);
                responseMap.put('siteData', siteData);
                responseMap.put('hostSiteData', hostSiteData);
                responseMap.put('doOnboarding', true);
            } else {

                List<List<String>> contentLayoutsList = new List<List<String>>();
                for (Integer i = 0; i < depth; i++) {
                    contentLayoutsList.add(contentLayouts);
                }

            RenderingAPIRequest renderingRequest = new RenderingAPIRequest();
            renderingRequest.parameters.put('renderType', 'taxonomy');
            renderingRequest.parameters.put('order', order.toLowerCase());
            renderingRequest.parameters.put('limit', String.valueof(limitCount));
            renderingRequest.listParameters.put('contentTypes', contentTypes);
            renderingRequest.listParameters.put('tagPaths', tagPaths);
            renderingRequest.requestFlags.put('targeted', isTargeted);
            renderingRequest.layoutsForTaxonomy = contentLayoutsList;

            RenderResultBundle resultBundle = ec_APIHelper.getContentByTaxonomy(siteData.get('name'), langLocale, renderingRequest);

                List<String> results = new List<String>();
            Boolean hasContentRemaining = false;

            if (resultBundle != null) {
                for (RenderResultBundle.RenderedContent renderedContent : resultBundle.renderings) {
                    for (String rendering : renderedContent.renderMap.values()) {
                        results.add(rendering);
                    }
                }

                hasContentRemaining = resultBundle.contentRemaining;
            }


                responseMap.put('success', true);
                responseMap.put('siteData', siteData);
                responseMap.put('hostSiteData', hostSiteData);
                responseMap.put('renderings', results);
            responseMap.put('loadMore', hasContentRemaining);
                responseMap.put('doOnboarding', false);

                if (lastReadNews != null) {
                    responseMap.put('lastRead', lastReadNews.getTime());
                }
            }
        } else {
            responseMap.put('errorCode', 1);
            responseMap.put('errorMessage', 'Either not in a community, or no community was found with the provided site name.');
        }
        
        return JSON.serialize(responseMap);
    }

    @AuraEnabled
    public static String getBulkLikeCounts(List<String> originIds, String siteName, String langCode) {
        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);
        Map<String, SocialBundle> socialData = ec_APIHelper.getSocialData(originIds, siteData.get('name'), langCode);

        Map<String, Object> responseMap = new Map<String, Object>();
        responseMap.put('success', true);
        responseMap.put('socialData', socialData);
        return JSON.serialize(responseMap);
    }

    @AuraEnabled
    public static String setLikeContent(String originId, String siteName, String langCode) { // method name must not match one in js controller
        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);
        Map<String, Object> responseObj = ec_APIHelper.likeContent(new List<String>{originId}, siteData.get('name'), langCode);
        responseObj.put('id', originId);

        return JSON.serialize(responseObj);
    }

    @AuraEnabled
    public static String setUnlikeContent(String originId, String siteName, String langCode) {
        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);
        Map<String, Object> responseObj = ec_APIHelper.unlikeContent(new List<String>{originId}, siteData.get('name'), langCode);
        responseObj.put('id', originId);

        return JSON.serialize(responseObj);
    }


    /* Lightning does not seem to create dependancies on custom labels when referenced in client side code
       referencing them here to ensure they follow along during deploy and/or packaging
     */
    @TestVisible
    private void requiredCustomLabels() {
        String required = '';
        required = Label.ec_TaxonomyLoader_Days_Ago;
        required = Label.ec_TaxonomyLoader_Day_Ago;
        required = Label.ec_TaxonomyLoader_Hours_Ago;
        required = Label.ec_TaxonomyLoader_Hour_Ago;
        required = Label.ec_TaxonomyLoader_Minutes_ago;
        required = Label.ec_TaxonomyLoader_Minute_Ago;
        required = Label.ec_TaxonomyLoader_Months_Ago;
        required = Label.ec_TaxonomyLoader_Month_Ago;
        required = Label.ec_TaxonomyLoader_Seconds_Ago;
        required = Label.ec_TaxonomyLoader_Second_Ago;
        required = Label.ec_TaxonomyLoader_Years_Ago;
        required = Label.ec_TaxonomyLoader_Year_Ago;
        required = Label.ec_TaxonomyLoader_Like;
        required = Label.ec_TaxonomyLoader_Unlike;
    }
}