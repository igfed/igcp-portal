public class ec_APIHelper {
    public static final String RECORDTYPE_SUBSCRIPTION = Schema.SObjectType.ec_DataStore__c.RecordTypeInfosByName.get('Subscription').RecordTypeId;
    public static final String RECORDTYPE_VIEW = Schema.SObjectType.ec_DataStore__c.RecordTypeInfosByName.get('View').RecordTypeId;
    public static final String RECORDTYPE_LIKE = Schema.SObjectType.ec_DataStore__c.RecordTypeInfosByName.get('Like').RecordTypeId;
    public static final String RECORDTYPE_COMMENT = Schema.SObjectType.ec_DataStore__c.RecordTypeInfosByName.get('Comment').RecordTypeId;
    public static final String ORCHESTRACMS_API_VERSION = '4.0';
    public static final String ORCHESTRACMS_API_RUNTIME = 'Salesforce';
    public static final String ORCHESTRACMS_API_PAGEMODE = 'production';

    public static final String DEFAULT_SITE_IDENTIFIER = 'DEFAULT';
    private static Map<String, Map<String, String>> cachedSiteData = new Map<String, Map<String, String>>();


    public static Map<String, String> getSiteData() {
        return getSiteData('');
    }

    public static Map<String, String> getSiteData(String siteName) {
        return getSiteData(siteName, '');
    }

    public static Map<String, String> getSiteData(String site, String langCode) {

        if (String.isBlank(site) && cachedSiteData.containsKey(DEFAULT_SITE_IDENTIFIER)) {
            return cachedSiteData.get(DEFAULT_SITE_IDENTIFIER);
        } else if (!String.isBlank(site) && cachedSiteData.containsKey(site)) {
            return cachedSiteData.get(site);
        }

        Map<String, String> responseMap = new Map<String, String>();

        Network thisNetwork;
        if (Network.getNetworkId() == null && String.isBlank(site)) {
            thisNetwork = null;
        } else if (String.isBlank(site)) {
            thisNetwork = [SELECT Id, Name, UrlPathPrefix FROM Network WHERE Id = :Network.getNetworkId()];
        } else {
            String sn = site.replaceAll('_', ' ');
            List<Network> networks = [SELECT Id, Name, UrlPathPrefix FROM Network WHERE Name = :sn LIMIT 1];
            if (!networks.isEmpty()) {
                thisNetwork = networks[0];
            }
        }

        if (!Test.isRunningTest() && thisNetwork == null) {
            return null;
        }

        String siteName = (Test.isRunningTest() ? 'SiteName' : thisNetwork.Name.replaceAll('\\s', '_'));

        SiteBundle sb = getSiteBundle(siteName, langCode);

        // responseMap.put('networkId', thisNetwork.Id);
        responseMap.put('siteId', sb.siteId);
        responseMap.put('name', siteName);
        responseMap.put('label', sb.siteLabel);
        responseMap.put('siteUrl', sb.siteSecureUrl);
        responseMap.put('prefix', sb.sitePrefix);

        if (String.isBlank(site) && !cachedSiteData.containsKey(DEFAULT_SITE_IDENTIFIER)) {
            cachedSiteData.put(DEFAULT_SITE_IDENTIFIER, responseMap);
        } else if (!String.isBlank(site) && !cachedSiteData.containsKey(site)) {
            cachedSiteData.put(site, responseMap);
        }

        return responseMap;
    }


    public static String getRenderFromOriginId(String originId, List<String> contentLayouts, String sn, String langCode) {
        return getRenderFromOriginId(originId, contentLayouts, true, sn, langCode, false);
    }

    public static String getRenderFromOriginId(String originId, List<String> contentLayouts, Boolean isTargeted, String sn, String langCode) {
        return getRenderFromOriginId(originId, contentLayouts, isTargeted, sn, langCode, false);
    }

    public static String getRenderFromOriginId(String originId, List<String> contentLayouts, Boolean isTargeted, String sn, String langCode, Boolean trackView) {
        String siteName = ec_APIHelper.getSiteData(sn, langCode).get('name');

        RenderingAPIRequest renderingRequest = new RenderingAPIRequest();
        renderingRequest.parameters.put('renderType', 'originId');
        renderingRequest.parameters.put('order', 'alpha');
        renderingRequest.parameters.put('limit', '50');
        renderingRequest.listParameters.put('originIds', new List<String>{ originId });
        renderingRequest.listParameters.put('contentLayouts', contentLayouts);
        renderingRequest.requestFlags.put('targeted', isTargeted);

        Map<String, String> params = new Map<String, String>();
        params.put('renderingRequest', JSON.serialize(renderingRequest));
        params.put('action', 'getRenderedContent');
        params.put('service', 'OrchestraRenderingAPI');
        params.put('sname', siteName);
        params.put('apiVersion', ORCHESTRACMS_API_VERSION);
        params.put('runtime', ORCHESTRACMS_API_RUNTIME);
        params.put('page_mode', ORCHESTRACMS_API_PAGEMODE);
        params.put('ocmsLang', langCode);

        String response = cms.ServiceEndpoint.doActionApex(params);

        JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse)
                JSON.deserialize(response, JSONMessage.APIResponse.class);

        String result = '';

        if (apiResponse.isSuccess) {
            RenderResultBundle resultBundle = (RenderResultBundle)
                    JSON.deserialize(apiResponse.responseObject, RenderResultBundle.class);
            for (RenderResultBundle.RenderedContent renderedContent : resultBundle.renderings) {
                for (String rendering : renderedContent.renderMap.values()) {
                    result += rendering;
                }
            }
        }

        return result;

    }

    public static String getRenderFromOriginIds(List<String> originIds, List<String> contentLayouts, Boolean isTargeted, String sn, String langCode, String order, Integer itemLimit) {
        String siteName = ec_APIHelper.getSiteData(sn, langCode).get('name');

        RenderingAPIRequest renderingRequest = new RenderingAPIRequest();
        renderingRequest.parameters.put('renderType', 'originId');
        renderingRequest.parameters.put('order', order);
        renderingRequest.parameters.put('limit', String.valueOf(itemLimit));
        renderingRequest.listParameters.put('originIds', originIds);
        renderingRequest.listParameters.put('contentLayouts', contentLayouts);
        renderingRequest.requestFlags.put('targeted', isTargeted);

        Map<String, String> params = new Map<String, String>();
        params.put('renderingRequest', JSON.serialize(renderingRequest));
        params.put('action', 'getRenderedContent');
        params.put('service', 'OrchestraRenderingAPI');
        params.put('sname', siteName);
        params.put('apiVersion', ORCHESTRACMS_API_VERSION);
        params.put('runtime', ORCHESTRACMS_API_RUNTIME);
        params.put('page_mode', ORCHESTRACMS_API_PAGEMODE);
        params.put('ocmsLang', langCode);

        String response = cms.ServiceEndpoint.doActionApex(params);

        JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse)
                JSON.deserialize(response, JSONMessage.APIResponse.class);

        String result = '';

        if (apiResponse.isSuccess) {
            RenderResultBundle resultBundle = (RenderResultBundle)
                    JSON.deserialize(apiResponse.responseObject, RenderResultBundle.class);
            for (RenderResultBundle.RenderedContent renderedContent : resultBundle.renderings) {
                for (String rendering : renderedContent.renderMap.values()) {
                    result += rendering;
                }
            }
        }

        return result;

    }


    public static String getRenderFromContentName(String contentName, List<String> contentLayouts, String sn, String langCode) {
        return getRenderFromContentName(contentName, contentLayouts, true, sn, langCode, false);
    }

    public static String getRenderFromContentName(String contentName, List<String> contentLayouts, Boolean isTargeted, String sn, String langCode) {
        return getRenderFromContentName(contentName, contentLayouts, isTargeted, sn, langCode, false);
    }

    public static String getRenderFromContentName(String contentName, List<String> contentLayouts, Boolean isTargeted, String sn, String langCode, Boolean trackView) {
        String siteName = ec_APIHelper.getSiteData(sn, langCode).get('name');

        RenderingAPIRequest renderingRequest = new RenderingAPIRequest();
        renderingRequest.parameters.put('renderType', 'contentName');
        renderingRequest.listParameters.put('contentNames', new List<String>{ contentName });
        renderingRequest.listParameters.put('contentLayouts', contentLayouts);
        renderingRequest.requestFlags.put('targeted', isTargeted);

        Map<String, String> params = new Map<String, String>();
        params.put('renderingRequest', JSON.serialize(renderingRequest));
        params.put('action', 'getRenderedContent');
        params.put('service', 'OrchestraRenderingAPI');
        params.put('sname', siteName);
        params.put('apiVersion', ORCHESTRACMS_API_VERSION);
        params.put('runtime', ORCHESTRACMS_API_RUNTIME);
        params.put('page_mode', ORCHESTRACMS_API_PAGEMODE);
        params.put('ocmsLang', langCode);

        System.debug('****** userlang ' + UserInfo.getLanguage());
        System.debug('******* ' + params);

        String response = cms.ServiceEndpoint.doActionApex(params);
        System.debug('****** ' + response);

        JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse)
            JSON.deserialize(response, JSONMessage.APIResponse.class);

        String html = '';
        List<String> originIds = new List<String>();
        if (apiResponse.isSuccess) {
            RenderResultBundle resultBundle = (RenderResultBundle)
                JSON.deserialize(apiResponse.responseObject, RenderResultBundle.class);
            for (RenderResultBundle.RenderedContent renderedContent : resultBundle.renderings) {
                originIds.add(renderedContent.originId);
                for (String rendering : renderedContent.renderMap.values()) {
                    html += rendering;
                }
            }
        }
        System.debug(html);
        return html;
    }


    @AuraEnabled
    public static List<String> getContentsByType(String siteName, List<String> contentTypes, List<String> contentLayouts, String order, Boolean targeted, String langCode, Integer limitcount) {
        List<String> results = new List<String>();
        try {

            RenderingAPIRequest renderingRequest = new RenderingAPIRequest();
            renderingRequest.parameters.put('renderType', 'contentType');
            renderingRequest.parameters.put('order', order);
            renderingRequest.parameters.put('limit', String.valueOf(limitcount));
            renderingRequest.listParameters.put('contentTypes', contentTypes);
            renderingRequest.listParameters.put('contentLayouts', contentLayouts);
            renderingRequest.requestFlags.put('targeted', targeted);

            Map<String, String> params = new Map<String, String>();
            params.put('renderingRequest', JSON.serialize(renderingRequest));
            params.put('action', 'getRenderedContent');
            params.put('service', 'OrchestraRenderingAPI');
            params.put('sname', siteName);
            params.put('apiVersion', ORCHESTRACMS_API_VERSION);
            params.put('runtime', ORCHESTRACMS_API_RUNTIME);
            params.put('page_mode', ORCHESTRACMS_API_PAGEMODE);
            params.put('ocmsLang', langCode);

            String response = cms.ServiceEndpoint.doActionApex(params);

            JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse)
                    JSON.deserialize(response, JSONMessage.APIResponse.class);

            if (apiResponse.isSuccess) {
                RenderResultBundle resultBundle = (RenderResultBundle)
                        JSON.deserialize(apiResponse.responseObject, RenderResultBundle.class);
                for (RenderResultBundle.RenderedContent renderedContent : resultBundle.renderings) {
                    for (String rendering : renderedContent.renderMap.values()) {
                        results.add(rendering);
                    }
                }
            }
            return results;

        } catch (Exception e) {
            results.add(e.getMessage());
        }
        return results;
    }

    public static String getContentsByTypeFirstRendering(String siteName, List<String> contentTypes, List<String> contentLayouts, String order, Boolean targeted, String langCode, Integer limitcount) {
        List<String> renderings = ec_APIHelper.getContentsByType(siteName, contentTypes, contentLayouts, order, targeted, langCode, limitcount);
        if (renderings.size() > 0)
            return renderings[0];
        else
            return '';
    }

    public static RenderResultBundle getContentByTaxonomy(String siteName, String langCode, RenderingAPIRequest renderingRequest) {
        RenderResultBundle bundle = null;

        Map<String, String> params = new Map<String, String>();
        params.put('renderingRequest', JSON.serialize(renderingRequest));
        params.put('action', 'getRenderedContent');
        params.put('service', 'OrchestraRenderingAPI');
        params.put('sname', siteName);
        params.put('apiVersion', ORCHESTRACMS_API_VERSION);
        params.put('ocmsLang', langCode);
        params.put('runtime', ORCHESTRACMS_API_RUNTIME);
        params.put('page_mode', ORCHESTRACMS_API_PAGEMODE);

        String response = cms.ServiceEndpoint.doActionApex(params);

        Map<String, List<String>> tagRenderingMap = new Map<String, List<String>>();

        JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse) JSON.deserialize(response, JSONMessage.APIResponse.class);

        if (apiResponse.isSuccess) {
            bundle = (RenderResultBundle) JSON.deserialize(apiResponse.responseObject, RenderResultBundle.class);
        }

        return bundle;
    }

    public static void trackContentView(String originId, String siteName, String langCode) {
        SocialAPIRequest apiRequest = new SocialAPIRequest();
        apiRequest.listParameters.put(SocialAPIRequest.ORIGIN_IDS, new List<String>{originId});

        Map<String, String> parameters = new Map<String, String>();
        parameters.put('service', 'SocialAPI');
        parameters.put('action', SocialAPIRequest.VIEWIT);
        parameters.put('request', json.serialize(apiRequest));
        parameters.put('apiVersion', '5.0');
        parameters.put('sname', siteName);
        parameters.put('ocmsLang', langCode);

        String response = cms.ServiceEndPoint.doActionApex(parameters);
        JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse) JSON.deserialize(response, JSONMessage.APIResponse.class);
        if (!apiResponse.isSuccess) {
            throw new APIException('Error tracking content view');
        }
    }

    public static SiteBundle getSiteBundle(String siteName) {
        return getSiteBundle(siteName, '');
    }

    public static SiteBundle getSiteBundle(String siteName, String langCode) {
        Map<String, String> params = new Map<String, String>();
        params.put('action', 'getSiteInfo');
        params.put('service', 'SiteAPI');
        params.put('sname', siteName);

        SiteAPIRequest req = new SiteAPIRequest();
        req.parameters.put('siteName', siteName);
        params.put('request',JSON.serialize(req));
        params.put('ocmsLang', langCode);
        String sResponse =  cms.ServiceEndpoint.doActionApex(params);
        JSONMessage.APIResponse msg = (JSONMessage.APIResponse)JSON.deserialize(sResponse,JSONMessage.APIResponse.class);
        SiteBundle sBundle = (SiteBundle)JSON.deserialize(msg.ResponseObject, SiteBundle.class);
        return sBundle;
    }

    public static ContentTypeBundle getContentTypeByName(String contentTypeName, String siteName, String langCode) {
        List<String> contentTypeNames = new List<String>{contentTypeName};
        List<ContentTypeBundle> bundles = ec_APIHelper.getContentTypesByName(contentTypeNames, siteName, langCode);
        return bundles[0];
    }

    public static List<ContentTypeBundle> getContentTypesByName(List<String> contentTypeNames, String siteName, String langCode) {
        ContentAPIRequest apiRequest = new ContentAPIRequest();
        apiRequest.listParameters.put(ContentAPIRequest.CONTENT_TYPES, contentTypeNames);
        apiRequest.requestFlags.put('lock', false);

        Map<String, String> parameters = new Map<String, String>();
        parameters.put('service', 'ContentAPI');
        parameters.put('action', 'getContentTypesByName');
        parameters.put('contentRequest', JSON.serialize(apiRequest));
        parameters.put('sname', siteName);
        parameters.put('apiVersion', ORCHESTRACMS_API_VERSION);
        parameters.put('ocmsLang', langCode);

        String response = cms.ServiceEndPoint.doActionApex(parameters);
        JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse) JSON.deserialize(response, JSONMessage.APIResponse.class);
        return (List<ContentTypeBundle>) JSON.deserialize(apiResponse.responseObject, List<ContentTypeBundle>.class);
    }


    public static Map<String, SocialBundle> getSocialData(List<String> originIds, String siteName, String langCode) {
        SocialAPIRequest apiRequest = new SocialAPIRequest();
        apiRequest.listParameters.put(SocialAPIRequest.ORIGIN_IDS, originIds);

        Map<String, String> parameters = new Map<String, String>();
        parameters.put('service', 'SocialAPI');
        parameters.put('action', SocialAPIRequest.GET_SOCIALDATA);
        parameters.put('request', json.serialize(apiRequest));
        parameters.put('apiVersion', '5.0');
        parameters.put('sname', siteName);
        parameters.put('ocmsLang', langCode);

        String response = cms.ServiceEndPoint.doActionApex(parameters);
        JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse) JSON.deserialize(response, JSONMessage.APIResponse.class);
        return (Map<String, SocialBundle>) JSON.deserialize(apiResponse.responseObject, Map<String, SocialBundle>.class);
    }

    public static Map<String, Object> likeContent(List<String> originIds, String siteName, String langCode) {
        SocialAPIRequest apiRequest = new SocialAPIRequest();
        apiRequest.listParameters.put(SocialAPIRequest.ORIGIN_IDS, originIds);

        Map<String, String> parameters = new Map<String, String>();
        parameters.put('service', 'SocialAPI');
        parameters.put('action', SocialAPIRequest.LIKEIT);
        parameters.put('request', json.serialize(apiRequest));
        parameters.put('apiVersion', '5.0');
        parameters.put('sname', siteName);
        parameters.put('ocmsLang', langCode);

        String response = cms.ServiceEndPoint.doActionApex(parameters);
        JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse) JSON.deserialize(response, JSONMessage.APIResponse.class);

        Map<String, Object> responseObj = new Map<String, Object>();
        responseObj.put('success', apiResponse.isSuccess);
        responseObj.put('message', apiResponse.message);
        return responseObj;
    }

    public static Map<String, Object> unlikeContent(List<String> originIds, String siteName, String langCode) {
        SocialAPIRequest apiRequest = new SocialAPIRequest();
        apiRequest.listParameters.put(SocialAPIRequest.ORIGIN_IDS, originIds);

        Map<String, String> parameters = new Map<String, String>();
        parameters.put('service', 'SocialAPI');
        parameters.put('action', SocialAPIRequest.UNLIKEIT);
        parameters.put('request', json.serialize(apiRequest));
        parameters.put('apiVersion', '5.0');
        parameters.put('sname', siteName);
        parameters.put('ocmsLang', langCode);

        String response = cms.ServiceEndPoint.doActionApex(parameters);
        JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse) JSON.deserialize(response, JSONMessage.APIResponse.class);

        Map<String, Object> responseObj = new Map<String, Object>();
        responseObj.put('success', apiResponse.isSuccess);
        responseObj.put('message', apiResponse.message);
        return responseObj;
    }
}