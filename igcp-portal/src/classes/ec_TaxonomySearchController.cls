global class ec_TaxonomySearchController {

    @AuraEnabled
    public static String search(String searchTerm, String contentType, String order, String contentTemplate,
            String langLocale, String allowDateFiltering, String allowTagFiltering, String categoriesVisible,
            String taxVisible, Boolean isTargeted) {

        order = 'existing';

        Map<String, String> siteData = ec_APIHelper.getSiteData('', langLocale);
        String siteName = siteData.get('name');

        ContentTypeBundle ctBundle = ec_APIHelper.getContentTypeByName(contentType, siteName, langLocale);
        List<String> contentTypesAndLayouts = new List<String>{ctBundle.contentTypeId};  // "only types are supported in this version"
        List<String> filterGroups = new List<String>{'Taxonomy', 'OriginalPublishedDate'};
        List<String> orderBy = new List<String>{'Relevance:DESC', 'OriginalPublishedDate:DESC', 'PublishedDate'};

        FilteringAPIRequest filteringRequest = new FilteringAPIRequest();
        filteringRequest.parameters.put(FilteringAPIRequest.TERM, searchTerm);
        filteringRequest.listParameters.put(FilteringAPIRequest.CONTENT_TYPES_AND_LAYOUTS, contentTypesAndLayouts);
        filteringRequest.listParameters.put(FilteringAPIRequest.FILTER_GROUPS, filterGroups);
        filteringRequest.listParameters.put(FilteringAPIRequest.ORDER_BY, orderBy);
        filteringRequest.requestFlags.put(FilteringAPIRequest.CONTENT_TYPE, false); // "limit to what is returned in ContentBundle"
        filteringRequest.requestFlags.put(FilteringAPIRequest.CONTENT_LAYOUTS, false);
        filteringRequest.requestFlags.put('targeted', isTargeted);

        Map<String, String> parameters = new Map<String, String>();
        parameters.put('sname', siteName);
        parameters.put('service', 'FilteringAPI');
        parameters.put('action', 'searchContent');
        parameters.put('runtime', ec_APIHelper.ORCHESTRACMS_API_RUNTIME);
        parameters.put('filteringRequest', JSON.serialize(filteringRequest));
        parameters.put('apiVersion', '5.0');
        parameters.put('ocmsLang', langLocale);

        String response = cms.ServiceEndPoint.doActionApex(parameters);
        JSONMessage.APIResponse resp = (JSONMessage.APIResponse) JSON.deserialize(response, JSONMessage.APIResponse.class);
        FilteringBundle ftBundle = (FilteringBundle) JSON.deserialize(resp.ResponseObject, FilteringBundle.class);

        List<Id> originIds = new List<Id>(ftBundle.contentBundles.keySet());

        String renderings = ec_APIHelper.getRenderFromOriginIds(originIds, new List<String>{contentTemplate}, false, siteName, langLocale, order, originIds.size());

        Map<String, Object> responseMap = new Map<String, Object>();
        responseMap.put('renderings', renderings);
        responseMap.put('contentBundles', ftBundle.contentBundles);
        responseMap.put('contentOrdering', ftBundle.contentOrdering);
        responseMap.put('filters', ftBundle.filters);
        responseMap.put('relevance', ftBundle.relevance);
        responseMap.put('success', true);
        responseMap.put('siteData', siteData);
        responseMap.put('hostSiteData', siteData);
        return JSON.serialize(responseMap);
    }
}