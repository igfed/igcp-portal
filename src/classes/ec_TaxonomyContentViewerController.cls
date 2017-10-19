public with sharing class ec_TaxonomyContentViewerController {

    @AuraEnabled
    public static String getContent(String originId, List<String> contentLayouts, Boolean isTargeted, String siteName, String langCode) {
        Map<String, Object> responseMap = new Map<String, Object>();
        responseMap.put('success', false);

        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);
        Map<String, String> hostSiteData = ec_APIHelper.getSiteData('', langCode);

        if (siteData != null) {
            if (hostSiteData == null) { // when loaded using app builder, there will be no host site.
                hostSiteData = siteData;
            }

            String html = ec_APIHelper.getRenderFromOriginId(originId, contentLayouts, isTargeted, siteName, langCode, true);

            responseMap.put('success', true);
            responseMap.put('siteData', siteData);
            responseMap.put('hostSiteData', hostSiteData);
            responseMap.put('renderings', html);
        } else {
            responseMap.put('errorCode', 1);
            responseMap.put('errorMessage', 'Either not in a community, or no community was found with the provided site name.');
        }

        return JSON.serialize(responseMap);
    }

    @AuraEnabled
    public static String getBulkLikeCounts(List<String> originIds, String siteName, String langCode) {
        return ec_TaxonomyLoaderController.getBulkLikeCounts(originIds, siteName, langCode);
    }

    @AuraEnabled
    public static String setLikeContent(String originId, String siteName, String langCode) { // method name must not match one in js controller
        return ec_TaxonomyLoaderController.setLikeContent(originId, siteName, langCode);
    }

    @AuraEnabled
    public static String setUnlikeContent(String originId, String siteName, String langCode) {
        return ec_TaxonomyLoaderController.setUnlikeContent(originId, siteName, langCode);
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
    }
}