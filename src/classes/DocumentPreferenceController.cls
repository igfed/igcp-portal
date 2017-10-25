public class DocumentPreferenceController {
	@AuraEnabled
	public static List<IGDocumentPreference> getFinancialAssetsToEdit(){
		//UserInfo.getUserId()
		String contactBpId = IGClientUtils.getClientBpid();
		//String contactBpId = '0003497138';
		List<DTO_AccountSummary> listToDisplay;
		List<IGDocumentPreference> docPreferenceInvestment;
		listToDisplay = new List<DTO_AccountSummary>();
		docPreferenceInvestment = new List<IGDocumentPreference>();
		listToDisplay = IGClientService.getAccountSummaries(contactBpId);
		System.debug(listToDisplay.size());
		for(DTO_AccountSummary eachDTOSummary : listToDisplay){
			System.debug('client BP id'+eachDTOSummary.clientNumber);
			
			IGDocumentPreference temp = new IGDocumentPreference();
			temp.clientBpid=eachDTOSummary.clientBpid;
			temp.clientNumber = eachDTOSummary.clientNumber;
			temp.accountTypeLabel = eachDTOSummary.accountTypeLabel;
			temp.dealerName = eachDTOSummary.dealerName;
			docPreferenceInvestment.add(temp);													
																
		}
		return docPreferenceInvestment;
		
	}
	@AuraEnabled
	public static List<Financial_Asset__c> getFinancialAssetsLoan(){
		List<Financial_Asset__c> loanFinancianAssets;
		List<Contact> contactToUse;
		Id contextContactId;

		contactToUse = new List<Contact>();
    	contactToUse = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
    	contextContactId = contactToUse.get(0).Id;


		loanFinancianAssets = new List<Financial_Asset__c>();
		loanFinancianAssets = [select Loan_Number__c from Financial_Asset__c where RecordType.Name = 'Loan Asset' AND Customer__c =: contextContactId];
		return loanFinancianAssets;
	}
	@AuraEnabled
	public static List<Financial_Asset__c> getFinancialAssetsPolicy(){
		List<Financial_Asset__c> policyFinancianAssets;
		List<Contact> contactToUse;
		Id contextContactId;

		contactToUse = new List<Contact>();
    	contactToUse = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
    	contextContactId = contactToUse.get(0).Id;


		policyFinancianAssets = new List<Financial_Asset__c>();
		policyFinancianAssets = [select Loan_Number__c from Financial_Asset__c where RecordType.Name = 'Policy Asset' AND Customer__c =: contextContactId];
		return policyFinancianAssets;
	}


}