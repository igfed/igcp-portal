public with sharing class ec_SubscriptionEditorController {
    private static String API_VERSION = '3.0';
    private static String SERVICE = 'TaxonomyAPI';

    @AuraEnabled
    public static String getTaxonomies(List<String> tagPaths, String siteName, String profileIdString, Boolean showOthersSubs, String langCode) {
        Map<String, Object> responseMap = new Map<String,Object>();
        responseMap.put('success', false);

        Id profileId;
        if (profileIdString.startsWith(User.SObjectType.getDescribe().getKeyPrefix())) {
            try {
                profileId = profileIdString;
            } catch (Exception e) {}
        }

        if (showOthersSubs || profileId == UserInfo.getUserId() || String.isBlank(profileId)) {

            if (tagPaths.size() > 0) {
                Set<String> tagPathsSet = new Set<String>(tagPaths); // create a set for .contains()
                Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);
                if (siteData != null) {

                    List<TaxonomyBundle> returnBundles = new List<TaxonomyBundle>();
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
                            if (tagPathsSet.contains(taxName)) {
                                //taxMap = buildTaxonomyStructure(tBundle);
                                returnBundles.add(getTaxChildren(tBundle, siteName, langCode));
                            }
                        }
                    }

                    Boolean allowEdit = false;
                    Id userId = profileId;
                    if (profileId == UserInfo.getUserId() || String.isBlank(profileId)) {
                        allowEdit = true;
                        userId = UserInfo.getUserId();
                        responseMap.put('taxonomyBundles', returnBundles);
                    }

                    responseMap.put('success', true);
                    responseMap.put('subscriptions', ec_APIHelper.getUserSubscribedTagPaths(userId, tagPaths));
                    responseMap.put('siteData', siteData);
                    responseMap.put('allowEdit', allowEdit);
                } else {
                    responseMap.put('errorCode', 1);
                    responseMap.put('errorMessage', 'Either not in a community, or no community was found with the provided site name.');
                }
            } else {
                responseMap.put('errorCode', 2); // TODO should really figure out meaning behind errorCodes. or stop using them.
                responseMap.put('errorMessage', 'No taxonomies provided.');
            }
        } else {
            responseMap.put('success', true);
            responseMap.put('otherUser', true);
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

    /**
     * Replace user's existing subscriptions with the list of paths provided
     */
    @AuraEnabled
    public static String setSubscriptions(List<String> tagPaths, String siteName, List<String> taxonomies, String langCode) {
        Map<String, Object> responseMap = new Map<String, Object>();
        responseMap.put('success', false);

        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);
        if (siteData != null) {

            // delete user's current subscriptions. saves processing time having to query and compare against what they've submitted
            String query = 'SELECT Id FROM ec_DataStore__c WHERE RecordTypeId = \'' + ec_APIHelper.RECORDTYPE_SUBSCRIPTION + '\' AND' +
                    ' OwnerId = \'' + UserInfo.getUserId() + '\' AND Site__c = \'' + siteData.get('siteId') + '\'';
            if (taxonomies.size() > 0) {
                List<String> queryFragment = new List<String>();
                for (String path : taxonomies) {
                    queryFragment.add('Text__c LIKE \'/' + path + '%\'');
                }
                query += ' AND (' + String.join(queryFragment, ' OR ') + ')';
            }
            System.debug(query);
            List<ec_DataStore__c> existingSubscriptions = Database.query(query);
            Database.DeleteResult[] drList = Database.delete(existingSubscriptions, true);
            Boolean errorEncountered = false;
            for (Database.DeleteResult dr : drList) {
                if (!dr.isSuccess()) {
                    errorEncountered = true;
                }
            }

            if (!errorEncountered) {
                List<ec_DataStore__c> newSubscriptions = new List<ec_DataStore__c>();
                for (String path : tagPaths) {
                    if (Test.isRunningTest()) {
                        ec_DataStore__c sub = new ec_DataStore__c(
                                RecordTypeId = ec_APIHelper.RECORDTYPE_SUBSCRIPTION,
                                Text__c = path
                        );
                        newSubscriptions.add(sub);
                    } else {
                        ec_DataStore__c sub = new ec_DataStore__c(
                                RecordTypeId = ec_APIHelper.RECORDTYPE_SUBSCRIPTION,
                                Text__c = path,
                                Site__c = siteData.get('siteId')
                        );
                        newSubscriptions.add(sub);
                    }


                }
                Database.SaveResult[] srList = Database.insert(newSubscriptions);
                for (Database.SaveResult sr : srList) {
                    if (!sr.isSuccess()) {
                        errorEncountered = true;
                    }
                }

                if (!errorEncountered) {
                    User u = new User(
                        Id = UserInfo.getUserId(),
                        Customized_TaxonomyLoader__c = true
                    );
                    update u;

                    responseMap.put('success', true);
                    responseMap.put('subscriptions', tagPaths);
                } else {
                    responseMap.put('errorCode', 2); // meaningless
                    responseMap.put('errorMessage', 'Error encountered while setting your subscriptions.');
                }
            } else {
                responseMap.put('errorCode', 2); // meaningless
                responseMap.put('errorMessage', 'Error encountered while setting your subscriptions.');
            }
        } else {
            responseMap.put('errorCode', 1);
            responseMap.put('errorMessage', 'Either not in a community, or no community was found with the provided site name.');
        }

        return JSON.serialize(responseMap);
    }

    /**
     * toggle user's subscription to a single path
     */
    @AuraEnabled
    public static String subscribeToPath(String tagPath, String siteName, String langCode) {
        Boolean errorEncountered = false;
        Boolean subscribed = false;
        Map<String, Object> responseMap = new Map<String, Object>();
        responseMap.put('success', false);

        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);
        if (siteData != null) {
            List<ec_DataStore__c> subscriptions = [SELECT Id FROM ec_DataStore__c WHERE RecordTypeId = :ec_APIHelper.RECORDTYPE_SUBSCRIPTION AND
                OwnerId = :UserInfo.getUserId() AND Site__c = :siteData.get('siteId') AND Text__c = :tagPath];
            if (subscriptions.size() > 0) {
                Database.DeleteResult[] drList = Database.delete(subscriptions, true);
                for (Database.DeleteResult dr : drList) {
                    if (!dr.isSuccess()) {
                        errorEncountered = true;
                    }
                }
            } else {
                if (Test.isRunningTest()) {
                    ec_DataStore__c newSub = new ec_DataStore__c(
                            RecordTypeId = ec_APIHelper.RECORDTYPE_SUBSCRIPTION,
                            OwnerId = UserInfo.getUserId(),
                            Text__c = tagPath
                    );
                    Database.SaveResult sr = Database.insert(newSub);
                    if (!sr.isSuccess()) {
                        errorEncountered = true;
                    }
                } else {
                    ec_DataStore__c newSub = new ec_DataStore__c(
                            RecordTypeId = ec_APIHelper.RECORDTYPE_SUBSCRIPTION,
                            OwnerId = UserInfo.getUserId(),
                            Site__c = siteData.get('siteId'),
                            Text__c = tagPath
                    );
                    Database.SaveResult sr = Database.insert(newSub);
                    if (!sr.isSuccess()) {
                        errorEncountered = true;
                    }
                }
                subscribed = true;
            }

            if (!errorEncountered) {
                responseMap.put('success', true);
                responseMap.put('tagPath', tagPath);
                responseMap.put('subscribed', subscribed);
            } else {
                responseMap.put('errorCode', 2); // meaningless
                responseMap.put('errorMessage', 'Error encountered while setting your subscriptions.');
            }
        } else {
            responseMap.put('errorCode', 1);
            responseMap.put('errorMessage', 'Either not in a community, or no community was found with the provided site name.');
        }

        return JSON.serialize(responseMap);
    }

    /**
     * toggle user's subscription to a single content by origin id
     */
    @AuraEnabled
    public static String subscribeToOriginId(String originId, String siteName, String langCode) {
        Boolean errorEncountered = false;
        Map<String, Object> responseMap = new Map<String, Object>();
        responseMap.put('success', false);

        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);
        if (siteData != null) {
            List<ec_DataStore__c> subscriptions = [SELECT Id FROM ec_DataStore__c WHERE RecordTypeId = :ec_APIHelper.RECORDTYPE_SUBSCRIPTION AND
            OwnerId = :UserInfo.getUserId() AND Site__c = :siteData.get('siteId') AND Content__c = :originId];
            if (subscriptions.size() > 0) {
                Database.DeleteResult[] drList = Database.delete(subscriptions, true);
                for (Database.DeleteResult dr : drList) {
                    if (!dr.isSuccess()) {
                        errorEncountered = true;
                    }
                }
            } else {
                if (Test.isRunningTest()) {
                    ec_DataStore__c newSub = new ec_DataStore__c(
                            RecordTypeId = ec_APIHelper.RECORDTYPE_SUBSCRIPTION,
                            OwnerId = UserInfo.getUserId()
                    );
                    Database.SaveResult sr = Database.insert(newSub);
                    if (!sr.isSuccess()) {
                        errorEncountered = true;
                    }
                } else {
                    ec_DataStore__c newSub = new ec_DataStore__c(
                            RecordTypeId = ec_APIHelper.RECORDTYPE_SUBSCRIPTION,
                            OwnerId = UserInfo.getUserId(),
                            Site__c = siteData.get('siteId'),
                            Content__c = originId
                    );
                    Database.SaveResult sr = Database.insert(newSub);
                    if (!sr.isSuccess()) {
                        errorEncountered = true;
                    }
                }

            }

            if (!errorEncountered) {
                responseMap.put('success', true);
                responseMap.put('tagPath', '');
                responseMap.put('originId', originId);
            } else {
                responseMap.put('errorCode', 2); // meaningless
                responseMap.put('errorMessage', 'Error encountered while setting your subscriptions.');
            }
        } else {
            responseMap.put('errorCode', 1);
            responseMap.put('errorMessage', 'Either not in a community, or no community was found with the provided site name.');
        }

        return JSON.serialize(responseMap);
    }

    @AuraEnabled
    public static String skipOnboarding() {
        Map<String, Object> responseMap = new Map<String, Object>();
        responseMap.put('success', false);

        try {
            User u = new User(
                    Id = UserInfo.getUserId(),
                    Customized_TaxonomyLoader__c = true
            );
            update u;

            responseMap.put('success', true);
        } catch (Exception e) {
            responseMap.put('errorMessage', 'Error when updating user record');
        }

        return JSON.serialize(responseMap);
    }

    @AuraEnabled
    public static String isUserSubscribedToPath(String tagPath, String siteName, String langCode) {
        Map<String, Object> responseMap = new Map<String,Object>();
        responseMap.put('success', false);

        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);
        if (siteData != null) {

            List<ec_DataStore__c> subscriptions = [SELECT Id FROM ec_DataStore__c WHERE RecordTypeId = :ec_APIHelper.RECORDTYPE_SUBSCRIPTION AND
                OwnerId = :UserInfo.getUserId() AND Text__c = :tagPath];
            if (subscriptions.size() > 0) {
                responseMap.put('subscribed', true);
            } else {
                responseMap.put('subscribed', false);
            }
            responseMap.put('success', true);
            responseMap.put('tagPath', tagPath);

        } else {
            responseMap.put('errorCode', 1);
            responseMap.put('errorMessage', 'Either not in a community, or no community was found with the provided site name.');
        }

        return JSON.serialize(responseMap);
    }

    @AuraEnabled
    public static String isUserSubscribedToOriginId(String originId, String siteName, String langCode) {
        Map<String, Object> responseMap = new Map<String,Object>();
        responseMap.put('success', false);

        Map<String, String> siteData = ec_APIHelper.getSiteData(siteName, langCode);
        if (siteData != null) {

            List<ec_DataStore__c> subscriptions = [SELECT Id FROM ec_DataStore__c WHERE RecordTypeId = :ec_APIHelper.RECORDTYPE_SUBSCRIPTION AND
            OwnerId = :UserInfo.getUserId() AND Content__c = :originId];
            if (subscriptions.size() > 0) {
                responseMap.put('subscribed', true);
            } else {
                responseMap.put('subscribed', false);
            }
            responseMap.put('success', true);
            responseMap.put('originId', originId);
            responseMap.put('tagPath', '');

        } else {
            responseMap.put('errorCode', 1);
            responseMap.put('errorMessage', 'Either not in a community, or no community was found with the provided site name.');
        }

        return JSON.serialize(responseMap);
    }
}