public class ec_PageFooterController {

    @AuraEnabled
    public static String getPageFooter(String langCode) {
        List<String> contentTypes = new List<String>();
        contentTypes.add('Page Footer');
        List<String> contentLayouts = new List<String>();
        contentLayouts.add('Page Footer');

        Map<String, String> siteData = ec_APIHelper.getSiteData();
        String siteName = siteData.get('name');
        String siteUrl = siteData.get('siteUrl');
        
        String rendering = ec_APIHelper.getContentsByTypeFirstRendering(siteName, contentTypes, contentLayouts, 'alpha', true, langCode, 999);
        
        Map<String, String> responseMap = new Map<String, String>();
        responseMap.put('siteUrl', siteUrl);
        responseMap.put('rendering', rendering);
        
        return JSON.serialize(responseMap);
    }
}