global with sharing class ec_ClassStyledMenuController {
    
    @AuraEnabled
    public static String getClassStyledMenu(String langCode, String menuType) {
        List<String> contentTypes = new List<String>();
        List<String> contentLayouts = new List<String>();
        contentLayouts.add('ClassStyledMenu');  

        if (menuType != 'footer'){
            //default to Header if value not supplied or incorrect.
            contentTypes.add('Page Header Menu');          
        } else {
            contentTypes.add('Page Footer Menu');
        }

        Map<String, String> siteData = ec_APIHelper.getSiteData();
        String siteName = siteData.get('siteName');
        String siteUrl = siteData.get('siteUrl');
        String prefix = siteData.get('prefix');

        String rendering = ec_APIHelper.getContentsByTypeFirstRendering(siteName, contentTypes, contentLayouts, 'alpha', true, langCode, 999);
        
        Map<String, String> response = new Map<String, String>();
        response.put('siteUrl', siteUrl);
        response.put('siteName', siteName);
        response.put('prefix', prefix);
        response.put('rendering', rendering);
        
        if (menuType!='footer'){
            String pageHeaderRendering = ec_PageHeaderController.getPageHeader(langCode);
            response.put('pageHeaderRendering', pageHeaderRendering);            
        } else {
            String pageFooterRendering = ec_PageFooterController.getPageFooter(langCode);
            response.put('pageFooterRendering', pageFooterRendering);              
        }
    
        
        return JSON.serialize(response); 
    }

}