public with sharing class ec_TaxonomyMenuController {
    private static String API_VERSION = '3.0';
    private static String SERVICE = 'TaxonomyAPI';

    @AuraEnabled
    public static String getTaxonomies(String taxonomyName, String siteName, String langCode){
        Map<String, Object> responseMap = new Map<String,Object>();
        responseMap.put('success', false);
        
        if (String.isBlank(taxonomyName)){
            //required parameters not supplied
            String errMsg = 'taxonomyName not supplied.';
            throw new AuraHandledException('Error calling getTaxonomies.  Error: ' + errMsg);
        }

        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);
        if (siteData != null) {

            TaxonomyBundle returnBundle = new TaxonomyBundle();
            TaxonomyAPIRequest taxonomyAPIRequest = new TaxonomyAPIRequest();
            taxonomyAPIRequest.requestFlags.put('forEdit', false);

            Map<String, String>parameters = new Map <String, String >();
            parameters.put('service', SERVICE); // New API service
            parameters.put('action', 'getTaxonomies');
            parameters.put('taxonomyRequest', json.serialize(taxonomyAPIRequest));
            parameters.put('sname', siteData.get('name'));
            parameters.put('apiVersion', API_VERSION);

            //System.debug('Request parameters: ' + parameters);

            String response = cms.ServiceEndPoint.doActionApex(parameters);

            JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse) json.deserialize(response, JSONMessage.APIResponse.class);
            if (!apiResponse.isSuccess) {
                throw new AuraHandledException('Unable to get the taxonomies for the site.');
            }

            List<TaxonomyBundle> taxList = (List<TaxonomyBundle>) json.deserialize(apiResponse.responseObject, List<TaxonomyBundle>.class);

            for (TaxonomyBundle tBundle: taxList) {
                System.debug(tBundle);
                //check all languages to see if the supplied taxonomy name matches what user has supplied.
                for (String taxName : tBundle.languageMapOfTagNames.values()) {
                    if (taxName == taxonomyName) {
                        //taxMap = buildTaxonomyStructure(tBundle);
                        returnBundle = getTaxChildren(tBundle, siteName, langCode);
                    }
                }
            }

            responseMap.put('success', true);
            responseMap.put('taxonomyBundle', returnBundle);
            responseMap.put('siteData', siteData);
        } else {
            responseMap.put('errorCode', 1);
            responseMap.put('errorMessage', 'Either not in a community, or no community was found with the provided site name.');
        }
        return JSON.serialize(responseMap);
    }
    
    @AuraEnabled
    public static TaxonomyBundle getTaxChildren(TaxonomyBundle root, String siteName, String langCode) {
        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);

        System.debug('\nentry to getTaxChildren \n');
        System.debug('\nROOT: ' + root);

        if (root == null) {
            //required parameters not supplied
            String errMsg = 'root not supplied.';
            throw new AuraHandledException('Error calling getTaxChildren.  Error: ' + errMsg);
        }

        TaxonomyBundle taxBundle = new TaxonomyBundle();
        try {

            String response;
            TaxonomyAPIRequest taxonomyAPIRequest = new TaxonomyAPIRequest();
            taxonomyAPIRequest.requestFlags.put('forEdit', false);
            taxonomyAPIRequest.requestFlags.put('fullTree', true );
            taxonomyAPIRequest.bundle = root;
//            System.debug('\nroot supplied in getTaxChildren: \n' + root + '\n');
            Map<String, String>parameters = new Map <String, String >();
            parameters.put('service', SERVICE); // New API service
            parameters.put('action', 'getChildren');
            parameters.put('taxonomyRequest', json.serialize(taxonomyAPIRequest));
            parameters.put('sname', siteData.get('name'));
            parameters.put('apiVersion', API_VERSION);

            response = cms.ServiceEndPoint.doActionApex(parameters);
//            System.debug('response from doActionApex: ' + response);
            JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse) json.deserialize(response, JSONMessage.APIResponse.class);
//            System.debug('apiResponse: ' + apiResponse);

            if (!apiResponse.isSuccess) {
                throw new AuraHandledException('Unable to get the taxonomies for the site.');
            }
            taxBundle = (TaxonomyBundle) json.deserialize(apiResponse.responseObject, TaxonomyBundle.class);
//            System.debug('TaxonomyBundle: ' + taxBundle);
        } catch (APIException e) {
            throw new AuraHandledException('API Exception during getTaxChildren call.  Message: ' + e.getMessage());
            System.debug('APIException thrown: ' + e.getMessage());
            taxBundle = root;
        } catch (Exception e) {
            throw new AuraHandledException('General Exception occurred during getTaxChildren call. Message: ' + e.getMessage());
            System.debug('General Exception occurred during getTaxChildren call: ' + e.getMessage());
            taxBundle = root;
        }

        return taxBundle;
    }

    @AuraEnabled
    public static TaxonomyBundle getTaxChildrenByJSON(String rootJSON, String siteName, String langCode) {
        if (String.isBlank(rootJSON)) {
            //required parameters not supplied
            String errMsg = 'rootJSON not supplied.';
            throw new AuraHandledException('Error calling getTaxChildrenByJSON.  Error: ' + errMsg);
        }

        System.debug('\n' + rootJSON + '\n');
        TaxonomyBundle root = (TaxonomyBundle) JSON.deserialize(rootJSON, TaxonomyBundle.class);
        return getTaxChildren(root, siteName, langCode);
    }
}