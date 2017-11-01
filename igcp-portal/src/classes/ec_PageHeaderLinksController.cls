public with sharing class ec_PageHeaderLinksController {

   @AuraEnabled
    public static String getHeaderLinks(String langCode) {
        List<String> contentTypes = new List<String>();
        contentTypes.add('Page Header Link');
        List<String> contentLayouts = new List<String>();
        contentLayouts.add('LinkItem');

        Map<String, String> siteData = ec_APIHelper.getSiteData();
        Map<String, String> hostSiteData = ec_APIHelper.getSiteData();
        String siteName = siteData.get('name');

        List<String> rendering = ec_APIHelper.getContentsByType(siteName, contentTypes, contentLayouts, 'alpha', true, langCode, 999);

        Map<String, Object> responseMap = new Map<String, Object>();
        responseMap.put('siteData', siteData);
        responseMap.put('hostSiteData', hostSiteData);
        responseMap.put('rendering', rendering);

        return JSON.serialize(responseMap);
    }
}