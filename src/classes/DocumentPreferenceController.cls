public class DocumentPreferenceController {
	@AuraEnabled
<<<<<<< HEAD
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
		testInvDocPref.accountTypeLabel = 'RRSP';
		testInvDocPref.dealerName = 'Investment Group Financial Services';
		listInvestmentDocs.add(testInvDocPref);

		IGDocumentPreference testInvDocPref2 = new IGDocumentPreference();
		testInvDocPref2.clientBpid = '111111';
		testInvDocPref2.clientNumber = '55555';
		testInvDocPref2.accountTypeLabel = 'RRSPVP';
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
	/*@AuraEnabled
=======
>>>>>>> b8a8fe43d1187fe7fe241397066e2593fe661b68
	public static List<IGDocumentPreference> getFinancialAssetsToEdit(){
		
		return InvestmentFinancialAsset();
		
	}
	@AuraEnabled
	public static List<IGDocumentPreferenceLoan> getFinancialAssetsLoan(){
		
		return loanFinancialAsset();
	}
	@AuraEnabled
	public static List<IGDocumentPreferencePolicy> getFinancialAssetsPolicy(){
		
		return policyFinancialAsset();
	}
	private static List<IGDocumentPreferenceLoan> loanFinancialAsset(){
		//List<Financial_Asset__c> loanFinancianAssets;
		List<IGDocumentPreferenceLoan> docPreferenceLoan;
		List<Contact> contactToUse;
		Id contextContactId;

		contactToUse = new List<Contact>();
    	contactToUse = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
    	contextContactId = contactToUse.get(0).Id;
    	//contextContactId = '0033D00000LKcwI';

    	docPreferenceLoan = new List<IGDocumentPreferenceLoan>();
		//loanFinancianAssets = new List<Financial_Asset__c>();
		//loanFinancianAssets = [select Loan_Number__c,Pref_Mortgage_Statements__c from Financial_Asset__c where RecordType.Name = 'Loan Asset' AND Customer__c =: contextContactId];
		//System.debug('SOQL '+[select Loan_Number__c,Pref_Mortgage_Statements__c from Financial_Asset__c where RecordType.Name = 'Loan Asset' AND Customer__c =: contextContactId]);
		for(Financial_Asset__c eachFA : [select Loan_Number__c,Pref_Mortgage_Statements__c from Financial_Asset__c where RecordType.Name = 'Loan Asset' AND Customer__c =: contextContactId]){
			IGDocumentPreferenceLoan temp = new IGDocumentPreferenceLoan();
			temp.loanNumber = eachFA.Loan_Number__c;
			if(eachFA.Pref_Mortgage_Statements__c == null 
				|| eachFA.Pref_Mortgage_Statements__c == ''
				|| eachFA.Pref_Mortgage_Statements__c == 'Paper' ){
				temp.mortgageStatement = false;
			}else {
				temp.mortgageStatement = true;
			}
			docPreferenceLoan.add(temp);
		}
		System.debug(docPreferenceLoan.size());
		return docPreferenceLoan;
	}

	private static List<IGDocumentPreferencePolicy> policyFinancialAsset(){
		//List<Financial_Asset__c> loanFinancianAssets;
		List<IGDocumentPreferencePolicy> docPreferencePolicy;
		List<Contact> contactToUse;
		Id contextContactId;

		contactToUse = new List<Contact>();
    	contactToUse = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
    	contextContactId = contactToUse.get(0).Id;
    	//contextContactId = '0033D00000LKcwI';

    	docPreferencePolicy = new List<IGDocumentPreferencePolicy>();
		//loanFinancianAssets = new List<Financial_Asset__c>();
		//loanFinancianAssets = [select Loan_Number__c,Pref_Mortgage_Statements__c from Financial_Asset__c where RecordType.Name = 'Loan Asset' AND Customer__c =: contextContactId];
		//System.debug('SOQL2 '+[select Policy_Number__c,Pref_Policy_Statements__c from Financial_Asset__c where RecordType.Name = 'Policy Asset' AND Customer__c =: contextContactId]);
		for(Financial_Asset__c eachFA : [select Policy_Number__c,Pref_Policy_Statements__c from Financial_Asset__c where RecordType.Name = 'Policy Asset' AND Customer__c =: contextContactId]){
			IGDocumentPreferencePolicy temp = new IGDocumentPreferencePolicy();
			temp.policyNumber = eachFA.Policy_Number__c;
			if(eachFA.Pref_Policy_Statements__c == null 
				|| eachFA.Pref_Policy_Statements__c == ''
				|| eachFA.Pref_Policy_Statements__c == 'Paper' ){
				temp.policyStatement = false;
			}else{
				temp.policyStatement = true;
			}
			docPreferencePolicy.add(temp);
		}
		System.debug(docPreferencePolicy.size());
		return docPreferencePolicy;

	}
	private static List<IGDocumentPreference> InvestmentFinancialAsset(){
		List<Financial_Asset__c> listOfFinancialAssets;
		Map<String,Financial_Asset__c> mapFinancialAssets;
		//UserInfo.getUserId()
		string contactBpId = IGClientUtils.getClientBpid();
		//String contactBpId = '0003497138';
		List<Contact> contextContactList = new List<Contact>();
		contextContactList = [select Id,Business_Partner_ID__c from Contact where Business_Partner_ID__c =: contactBpId];
		Id contextContactId = contextContactList.get(0).Id;

		listOfFinancialAssets = new List<Financial_Asset__c>([select Client_Number__c,Pref_Investment_Statements__c,Pref_Tax_Receipts__c,Pref_Trade_Confirmation__c from Financial_Asset__c where RecordType.Name = 'Investment Asset' AND Customer__c =: contextContactId]);
		mapFinancialAssets = new Map<String,Financial_Asset__c>();
		for(Financial_Asset__c eachFA :  listOfFinancialAssets){
			mapFinancialAssets.put(eachFA.Client_Number__c,eachFA);


		}
		List<DTO_AccountSummary> listToDisplay;
		List<IGDocumentPreference> docPreferenceInvestment;
		listToDisplay = new List<DTO_AccountSummary>();
		docPreferenceInvestment = new List<IGDocumentPreference>();
		listToDisplay = IGClientService.getAccountSummaries(contactBpId);
		System.debug(listToDisplay.size());
		for(DTO_AccountSummary eachDTOSummary : listToDisplay){
			
			
			IGDocumentPreference temp = new IGDocumentPreference();
			temp.clientBpid=eachDTOSummary.clientBpid;
			temp.clientNumber = eachDTOSummary.clientNumber;
			temp.accountTypeLabel = eachDTOSummary.accountTypeLabel;
			temp.dealerName = eachDTOSummary.dealerName;
			
			if(mapFinancialAssets.containsKey(eachDTOSummary.clientNumber)){
				Financial_Asset__c tempFA = new Financial_Asset__c();
				tempFA = mapFinancialAssets.get(eachDTOSummary.clientNumber);
			
				System.debug('tempFA.Pref_Tax_Receipts__c '+tempFA.Pref_Tax_Receipts__c);
				if(tempFA.Pref_Tax_Receipts__c == 'Online'){
					
					temp.prefTaxReciepts = true;
				}else {
					temp.prefTaxReciepts = false;
				}
				System.debug('tempFA.Pref_Trade_Confirmation__c '+tempFA.Pref_Trade_Confirmation__c);
				if(tempFA.Pref_Trade_Confirmation__c == 'Online'){
				
					temp.prefTradeConfirmation = true;
				}else {
					temp.prefTradeConfirmation = false;
				}
				System.debug('tempFA.Pref_Investment_Statements__c '+tempFA.Pref_Investment_Statements__c);
				if(tempFA.Pref_Investment_Statements__c == 'Online'){
					temp.prefInvestmentStatements = true;
				}else {
					temp.prefInvestmentStatements = false;
				}
				

			}
			System.debug('temp '+temp);
			docPreferenceInvestment.add(temp);													
																
		}
		System.debug(docPreferenceInvestment);
		return docPreferenceInvestment;
<<<<<<< HEAD
	}*/
=======
	}
>>>>>>> b8a8fe43d1187fe7fe241397066e2593fe661b68

}