public class ec_ContentBlockController {
    
    @AuraEnabled
    public static String renderForLtng(String contentName, String contentLayout, Boolean isTargeted, String siteName, String langCode) {
        Map<String, Object> responseMap = new Map<String, Object>();
        responseMap.put('success', false);

        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);
        Map<String, String> hostSiteData = ec_APIHelper.getSiteData('', langCode);

        if (siteData != null) {
            if (hostSiteData == null) { // when loaded using app builder, there will be no host site.
                hostSiteData = siteData;
            }

            List<String> contentLayouts = new List<String>();
            contentLayouts.add(contentLayout);
            String html = ec_APIHelper.getRenderFromContentName(contentName, contentLayouts, isTargeted, siteName, langCode);

            responseMap.put('success', true);
            responseMap.put('markup', html);
            responseMap.put('siteData', siteData);
            responseMap.put('hostSiteData', hostSiteData);
        } else {
            responseMap.put('errorCode', 1);
            responseMap.put('errorMessage', 'Either not in a community, or no community was found with the provided site name.');
        }

        return JSON.serialize(responseMap);
    }

}