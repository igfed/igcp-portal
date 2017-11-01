public class EmailPrefController {

    @AuraEnabled
    public static IGAllDocumentPreference getAllFinancialAssets(){
        

        return statementFinancialAsset();
        
    }
    private static IGAllDocumentPreference statementFinancialAsset(){
        List<IGDocumentPreference> listInvestmentDocs;
        List<IGDocumentPreferenceLoan> listLoanDocs;
        List<IGDocumentPreferencePolicy> listPolicyDocs;
        IGAllDocumentPreference allDocsToReturn = new IGAllDocumentPreference();
        String clientBPId = IGClientUtils.getClientBpid();

        //call the API for getting all the financial assets from the MuleSoft API
        listInvestmentDocs = new List<IGDocumentPreference>();
        listLoanDocs = new List<IGDocumentPreferenceLoan>();
        listPolicyDocs = new List<IGDocumentPreferencePolicy>();



        /*mock data to connect with UI, need to change once API is live
        @AuraEnabled public String clientBpid;
        @AuraEnabled public String clientNumber;
        @AuraEnabled public String accountTypeLabel;
        @AuraEnabled public String dealerName;

        public class IGAllDocumentPreference {
    List<IGDocumentPreference> investAssetDocuments;
    List<IGDocumentPreferenceLoan> loanAssetDocuments;
    List<IGDocumentPreferencePolicy> policyAssetDocuments;
}

        */
        IGDocumentPreference testInvDocPref = new IGDocumentPreference();
        testInvDocPref.clientBpid = '111111';
        testInvDocPref.clientNumber = '22222';
        testInvDocPref.accountTypeLabel = 'GTFSA: *0896';
        testInvDocPref.dealerName = 'Investment Group Financial Services';
        listInvestmentDocs.add(testInvDocPref);

        IGDocumentPreference testInvDocPref2 = new IGDocumentPreference();
        testInvDocPref2.clientBpid = '111111';
        testInvDocPref2.clientNumber = '55555';
        testInvDocPref2.accountTypeLabel = 'TFSA *4732, Joint RESP *4831';
        testInvDocPref2.dealerName = 'Investment Group';
        listInvestmentDocs.add(testInvDocPref2);

        IGDocumentPreferenceLoan testLoanDocPref = new IGDocumentPreferenceLoan();
        testLoanDocPref.loanNumber = '33333';
        listLoanDocs.add(testLoanDocPref);
        IGDocumentPreferenceLoan testLoanDocPref2 = new IGDocumentPreferenceLoan();
        testLoanDocPref2.loanNumber = '66666';
        listLoanDocs.add(testLoanDocPref2);

        IGDocumentPreferencePolicy testPolicyDocPref = new IGDocumentPreferencePolicy();
        testPolicyDocPref.policyNumber = '44444';
        listPolicyDocs.add(testPolicyDocPref);
        IGDocumentPreferencePolicy testPolicyDocPref2 = new IGDocumentPreferencePolicy();
        testPolicyDocPref2.policyNumber = '7777';
        listPolicyDocs.add(testPolicyDocPref2);

        allDocsToReturn.investAssetDocuments = listInvestmentDocs;
        allDocsToReturn.loanAssetDocuments = listLoanDocs;
        allDocsToReturn.policyAssetDocuments = listPolicyDocs;

        System.debug('all docs '+allDocsToReturn);

        return allDocsToReturn;




    }

	/********************************************************************************************************
	Return Type:		Void
	Function details:
	 1. Aura enabled function will be called from the lightning page with JSON response to the controller class.
	 2. Update the Financial Object with necessary changes.

	*******************************************************************************************************/
	@AuraEnabled
    public static void UpdateAssets(String payload)
    {
        if(payload !=null || payload != ''){
    	//deseriallize the response from the page to list of EmailPrefResponse object.
        	/*System.debug('user id'+IGClientUtils.getClientBpid());
        	System.debug('payload '+payload);
        	List<Financial_Asset__c> listOfFinancialAssetsToupdate;

        	//EmailPrefResponse[] listOfFinancialAsset = (EmailPrefResponse[]) JSON.deserialize(payload, List<EmailPrefResponse>.class); 
            EmailDocumentPreferences listDocumentPrefs = (EmailDocumentPreferences) JSON.deserialize(payload,EmailDocumentPreferences.class);
            System.debug('listDocumentPrefs '+listDocumentPrefs);

            listOfFinancialAssetsToupdate = new List<Financial_Asset__c>();
            listOfFinancialAssetsToupdate.addAll(processLoanRecords(listDocumentPrefs.documentPreferencesLoan,listDocumentPrefs.allDocumentPreference));
            listOfFinancialAssetsToupdate.addAll(processRecords(listDocumentPrefs.documentPreferences,listDocumentPrefs.allDocumentPreference));
            listOfFinancialAssetsToupdate.addAll(processPolicyRecords(listDocumentPrefs.documentPreferencesPolicy,listDocumentPrefs.allDocumentPreference));
            System.debug('listOfFinancialAssetsToupdate'+listOfFinancialAssetsToupdate);*/
            /* empyyyyyy
            List<EmailPrefResponse> tempTest = new List<EmailPrefResponse>();
            tempTest = listDocumentPrefs.documentPreferences;
            System.debug('list '+ tempTest);
            listOfFinancialAssetsToupdate  = processRecords(listDocumentPrefs.documentPreferences,listDocumentPrefs.allDocumentPreference);
            
             
            System.debug('to update '+listOfFinancialAssetsToupdate);
        */
        	//if(listOfFinancialAssetsToupdate.size() > 0){
        		//updateFinancialAssets(listOfFinancialAssetsToupdate);
        	//}
        }else {
            System.debug('payload empyty');

        }


    }

    /*******************************************************************************************************
    Return Type: 		List<Financial_Asset__c>
	Function details:
		1. Static method will process the Financial Assest records with field updates.
		
    *******************************************************************************************************/
    private static List<Financial_Asset__c> processRecords(EmailPrefResponse.DocumentPreferences[] listOfFinancialAssetsResp , Boolean statusAllDocuments){

        System.debug('list of Financial assets response '+listOfFinancialAssetsResp);
    	// get all the financial assets of the specific contact from the salesforce to update
    	List<Financial_Asset__c> listOfFinancialAssetsToupdate;
    	Map<String,Financial_Asset__c> mapClientNumberFA;
    	List<Contact> contactToUse;
    	Id contextContactId;
        

    	contactToUse = new List<Contact>();
    	contactToUse = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
    	contextContactId = contactToUse.get(0).Id;

    	listOfFinancialAssetsToupdate = new List<Financial_Asset__c>();


    	mapClientNumberFA = new Map<String,Financial_Asset__c>();
    	for(Financial_Asset__c eachFinancialAsset : [select Customer__r.Name,Client_Number__c,Pref_Investment_Statements__c,
    												Pref_Tax_Receipts__c,Pref_Trade_Confirmation__c from Financial_Asset__c where Customer__c =: contextContactId AND RecordType.Name = 'Investment Asset']){
    		mapClientNumberFA.put(eachFinancialAsset.Client_Number__c, eachFinancialAsset);
    	}
    	System.debug('mapClientNumberFA '+mapClientNumberFA);
    	Boolean updated;

    	for(EmailPrefResponse.DocumentPreferences eachRespObj : listOfFinancialAssetsResp){
    		updated = false;

    		Financial_Asset__c tempFinancialAsset = mapClientNumberFA.get(eachRespObj.clientNumber);
    		System.debug('tempFinancialAsset '+tempFinancialAsset);
    		System.debug('tempFinancialAsset.Pref_Investment_Statements__c '+tempFinancialAsset.Pref_Investment_Statements__c);
    		if(tempFinancialAsset.Client_Number__c == eachRespObj.clientNumber){
                if(statusAllDocuments != true){
    	    		if(eachRespObj.investmentStatements == false
    	    			&& (tempFinancialAsset.Pref_Investment_Statements__c == 'Online' || tempFinancialAsset.Pref_Investment_Statements__c == null)){
    	    			tempFinancialAsset.Pref_Investment_Statements__c = 'Paper';
    	    			updated = true;
    	    		} else if(eachRespObj.investmentStatements == true 
    	    				 && (tempFinancialAsset.Pref_Investment_Statements__c == 'Paper' || tempFinancialAsset.Pref_Investment_Statements__c == null)){
    	    			tempFinancialAsset.Pref_Investment_Statements__c = 'Online';
    	    			updated = true;
    	    		}
    	    		if(eachRespObj.taxReceipts == false 
    	    			&& (tempFinancialAsset.Pref_Tax_Receipts__c == 'Online' ||  tempFinancialAsset.Pref_Tax_Receipts__c == null)){
    	    			tempFinancialAsset.Pref_Tax_Receipts__c = 'Paper';
    	    			updated = true;
    	    		} else if(eachRespObj.taxReceipts == true 
    	    			&& (tempFinancialAsset.Pref_Tax_Receipts__c == 'Paper' || tempFinancialAsset.Pref_Tax_Receipts__c == null)){
    	    			tempFinancialAsset.Pref_Tax_Receipts__c = 'Online';
    	    			updated = true;
    	    		}
    	    		if(eachRespObj.tradeConfirmation == false 
    	    			&&  (tempFinancialAsset.Pref_Trade_Confirmation__c == 'Online' || tempFinancialAsset.Pref_Trade_Confirmation__c == null)){
    	    			tempFinancialAsset.Pref_Trade_Confirmation__c = 'Paper';
    	    			updated = true;
    	    		} else if(eachRespObj.tradeConfirmation == true 
    	    			 && (tempFinancialAsset.Pref_Trade_Confirmation__c == 'Paper' || tempFinancialAsset.Pref_Trade_Confirmation__c ==null)){
    	    			tempFinancialAsset.Pref_Trade_Confirmation__c = 'Online';
    	    			updated = true;
    	    		}
                }else if(statusAllDocuments == true){
                    tempFinancialAsset.Pref_Investment_Statements__c = 'Online';
                    tempFinancialAsset.Pref_Trade_Confirmation__c = 'Online';
                    tempFinancialAsset.Pref_Tax_Receipts__c = 'Online';
                    updated = true;

                }
	    	}
    		if(updated == true){
    			listOfFinancialAssetsToupdate.add(tempFinancialAsset);

    		}

    	}
    	return listOfFinancialAssetsToupdate;

    }
    private static List<Financial_Asset__c> processLoanRecords(EmailPrefResponse.DocumentPreferencesLoan[] listOfLoanFinancialAssetsResp , Boolean statusAllDocuments){
        List<Financial_Asset__c> listOfFinancialAssetsToupdate;
        List<Contact> contactToUse;
        Id contextContactId;
        Map<String,Financial_Asset__c> mapClientNumberFA;
        Boolean updated;
        

        contactToUse = new List<Contact>();
        contactToUse = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
        contextContactId = contactToUse.get(0).Id;

         mapClientNumberFA = new Map<String,Financial_Asset__c>();
        for(Financial_Asset__c eachFinancialAsset : [select Customer__r.Name,Loan_Number__c,Pref_Mortgage_Statements__c from Financial_Asset__c where Customer__c =: contextContactId AND RecordType.Name = 'Loan Asset']){
            mapClientNumberFA.put(eachFinancialAsset.Loan_Number__c, eachFinancialAsset);

        }
        System.debug(' mapClientNumberFA '+mapClientNumberFA);
        listOfFinancialAssetsToupdate = new List<Financial_Asset__c>();
        for(EmailPrefResponse.DocumentPreferencesLoan eachRespObj : listOfLoanFinancialAssetsResp){
            updated = false;
            System.debug('eachRespObj'+eachRespObj);
            Financial_Asset__c tempFinancialAsset = mapClientNumberFA.get(eachRespObj.loanNumber);
            if(tempFinancialAsset.Loan_Number__c == eachRespObj.loanNumber){
                if(eachRespObj.mortgageDocument == false 
                        && (tempFinancialAsset.Pref_Mortgage_Statements__c == 'Online' ||  tempFinancialAsset.Pref_Mortgage_Statements__c == null)){
                        tempFinancialAsset.Pref_Mortgage_Statements__c = 'Paper';
                        updated = true;
                } else if(eachRespObj.mortgageDocument == true 
                    && (tempFinancialAsset.Pref_Mortgage_Statements__c == 'Paper' || tempFinancialAsset.Pref_Mortgage_Statements__c == null)){
                    tempFinancialAsset.Pref_Mortgage_Statements__c = 'Online';
                    updated = true;
                }
                if(statusAllDocuments == true){
                    tempFinancialAsset.Pref_Mortgage_Statements__c = 'Online';
                    updated = true;
                }
            }
            if(updated == true){
                listOfFinancialAssetsToupdate.add(tempFinancialAsset);

            }

        }
        return listOfFinancialAssetsToupdate;
    }
     private static List<Financial_Asset__c> processPolicyRecords(EmailPrefResponse.DocumentPreferencesPolicy[] listOfPolicyFinancialAssetsResp , Boolean statusAllDocuments){
        List<Financial_Asset__c> listOfFinancialAssetsToupdate;
        List<Contact> contactToUse;
        Map<String,Financial_Asset__c> mapClientNumberFA;
        Id contextContactId;
         Boolean updated;

        

        contactToUse = new List<Contact>();
        contactToUse = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
        contextContactId = contactToUse.get(0).Id;
        mapClientNumberFA = new Map<String,Financial_Asset__c>();
        for(Financial_Asset__c eachFinancialAsset : [select Customer__r.Name,Policy_Number__c,Pref_Policy_Statements__c from Financial_Asset__c where Customer__c =: contextContactId AND RecordType.Name = 'Policy Asset']){
            mapClientNumberFA.put(eachFinancialAsset.Policy_Number__c, eachFinancialAsset);
        }
        listOfFinancialAssetsToupdate = new List<Financial_Asset__c>();
        for(EmailPrefResponse.DocumentPreferencesPolicy eachRespObj : listOfPolicyFinancialAssetsResp){
            updated = false;
            Financial_Asset__c tempFinancialAsset = mapClientNumberFA.get(eachRespObj.policyNumber);
            if(tempFinancialAsset.Policy_Number__c == eachRespObj.policyNumber){
                if(eachRespObj.policyDocument == false 
                        && (tempFinancialAsset.Pref_Policy_Statements__c == 'Online' ||  tempFinancialAsset.Pref_Policy_Statements__c == null)){
                        tempFinancialAsset.Pref_Policy_Statements__c = 'Paper';
                        updated = true;
                } else if(eachRespObj.policyDocument == true 
                    && (tempFinancialAsset.Pref_Policy_Statements__c == 'Paper' || tempFinancialAsset.Pref_Policy_Statements__c == null)){
                    tempFinancialAsset.Pref_Policy_Statements__c = 'Online';
                    updated = true;
                }
                if(statusAllDocuments == true){
                    tempFinancialAsset.Pref_Policy_Statements__c = 'Online';
                    updated = true;
                }
            }
            if(updated == true){
                listOfFinancialAssetsToupdate.add(tempFinancialAsset);

            }

        }
        return listOfFinancialAssetsToupdate;
    }


    /*******************************************************************************************************
    Return Type: 		List<Financial_Asset__c>
	Function details:
		1. voic function will update the list of Financial asset records.
		
    *******************************************************************************************************/

    private static void updateFinancialAssets(List<Financial_Asset__c> updateFA){
    	update updateFA;

    }

	
}