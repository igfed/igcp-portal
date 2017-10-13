public with sharing class EmailPrefController {

	/********************************************************************************************************
	Return Type:		Void
	Function details:
	 1. Aura enabled function will be called from the lightning page with JSON response to the controller class.
	 2. Update the Financial Object with necessary changes.

	*******************************************************************************************************/
	@AuraEnabled
    public static void UpdateAssets(String payload)
    {
    	//deseriallize the response from the page to list of EmailPrefResponse object.
    	List<Financial_Asset__c> listOfFinancialAssetsToupdate;
    	EmailPrefResponse[] listOfFinancialAsset = (EmailPrefResponse[]) JSON.deserialize(payload, List<EmailPrefResponse>.class); 
    	System.debug('List of financial assets received '+listOfFinancialAsset);
    	listOfFinancialAssetsToupdate  = processRecords(listOfFinancialAsset);
    	if(listOfFinancialAssetsToupdate.size() > 0){
    		updateFinancialAssets(listOfFinancialAssetsToupdate);
    	}


    }

    /*******************************************************************************************************
    Return Type: 		List<Financial_Asset__c>
	Function details:
		1. Static method will process the Financial Assest records with field updates.
		
    *******************************************************************************************************/
    private static List<Financial_Asset__c> processRecords(EmailPrefResponse[] listOfFinancialAssetsResp){

    	// get all the financial assets of the specific contact from the salesforce to update
    	List<Financial_Asset__c> listOfFinancialAssetsToupdate;
    	Map<String,Financial_Asset__c> mapClientNumberFA;
    	listOfFinancialAssetsToupdate = new List<Financial_Asset__c>();

    	mapClientNumberFA = new Map<String,Financial_Asset__c>();
    	for(Financial_Asset__c eachFinancialAsset : [select Customer__r.Name,Client_Number__c,Pref_Investment_Statements__c,
    												Pref_Tax_Receipts__c,Pref_Trade_Confirmation__c from Financial_Asset__c]){
    		mapClientNumberFA.put(eachFinancialAsset.Client_Number__c, eachFinancialAsset);
    	}
    	Boolean updated;

    	for(EmailPrefResponse eachRespObj : listOfFinancialAssetsResp){
    		updated = false;

    		Financial_Asset__c tempFinancialAsset = mapClientNumberFA.get(eachRespObj.clientNumber);
    		if(eachRespObj.investmentStatements == false && tempFinancialAsset.Pref_Investment_Statements__c == 'Online'){
    			tempFinancialAsset.Pref_Investment_Statements__c = 'Paper';
    			updated = true;
    		} else if(eachRespObj.investmentStatements == true && tempFinancialAsset.Pref_Investment_Statements__c == 'Paper'){
    			tempFinancialAsset.Pref_Investment_Statements__c = 'Online';
    			updated = true;
    		}
    		if(eachRespObj.taxReceipts == false && tempFinancialAsset.Pref_Tax_Receipts__c == 'Online'){
    			tempFinancialAsset.Pref_Tax_Receipts__c = 'Paper';
    			updated = true;
    		} else if(eachRespObj.taxReceipts == true && tempFinancialAsset.Pref_Tax_Receipts__c == 'Paper'){
    			tempFinancialAsset.Pref_Tax_Receipts__c = 'Online';
    			updated = true;
    		}
    		if(eachRespObj.tradeConfirmation == false && tempFinancialAsset.Pref_Trade_Confirmation__c == 'Online'){
    			tempFinancialAsset.Pref_Trade_Confirmation__c = 'Paper';
    			updated = true;
    		} else if(eachRespObj.tradeConfirmation == true && tempFinancialAsset.Pref_Trade_Confirmation__c == 'Paper'){
    			tempFinancialAsset.Pref_Trade_Confirmation__c = 'Online';
    			updated = true;
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