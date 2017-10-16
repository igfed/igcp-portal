@isTest
public class EmailPrefControllerTest {
	
	@testSetup 
	static void setup(){
	 	Profile pf = [SELECT Id FROM Profile WHERE Name = 'System Administrator'];
		UserRole ur = new UserRole(Name = 'CEO');
        insert ur;
        User tuser = new User(  firstname = 'testFname',
                                lastName = 'testLName',                                
                                Email = 'testStandardUser@example.com',
						        Username = 'testUser000@example.com' + System.currentTimeMillis(),
                                EmailEncodingKey = 'ISO-8859-1',
                                Alias = 'alias',
                                TimeZoneSidKey = 'America/Los_Angeles',
                                LocaleSidKey = 'en_US',
                                LanguageLocaleKey = 'en_US',
                                ProfileId = pf.Id,
                                UserRoleId = ur.Id);
		
		List<RecordType> contactRecordTypes = [Select Name, Id From RecordType
                  where sObjectType='Contact' and isActive=true];

                  System.debug('contact record types '+contactRecordTypes);

		Account testAccount = new Account(Name = 'Test Account');
		System.runAs(tuser){
			insert testAccount;
		}
		Map<String,String> contactRecordTypeMap = new Map<String,String>();
     	for(RecordType rt: contactRecordTypes){
       		contactRecordTypeMap.put(rt.Name,rt.Id);
       	}
       	System.debug('contact record type map '+contactRecordTypeMap);


		Contact testContact = new Contact(  RecordTypeId = contactRecordTypeMap.get('Customer'),
											LastName = 'testContact LastName',
											AccountId = testAccount.Id,
											Business_Partner_ID__c = '1234567890');
		System.runAs(tuser){
			insert testContact;
		}
		System.debug('inserted contacts '+testContact);

		
		//System.debug('Role '+r);

		

		List<RecordType> financialAssetsRecordTypes = [Select Name, Id From RecordType
                  where sObjectType='Financial_Asset__c' and isActive=true];
                  System.debug('FA record types '+financialAssetsRecordTypes);

         System.debug('Financial asset record type '+financialAssetsRecordTypes);

        Map<String,String> financialAssetsRecordTypeMap = new Map<String,String>();
     	for(RecordType rt: financialAssetsRecordTypes){
       		financialAssetsRecordTypeMap.put(rt.Name,rt.Id);
       	}
       	System.debug('finanacial asset record type map '+financialAssetsRecordTypeMap);
       

        Financial_Asset__c testFA1 = new Financial_Asset__c(RecordTypeId = financialAssetsRecordTypeMap.get('Investment Asset'),
        													Client_Number__c = '0987654',
        													Customer__c = testContact.Id,
        													Client__c = testAccount.Id,
        													Asset_Type__c = 'Individual');
        System.debug('to insert test FA 1 '+testFA1);
        System.runAs(tuser){
	        insert testFA1;
	    }
        System.debug('inserted financial assets '+testFA1);



	}
	@isTest 
	static void testEmailPrefController() {
		/*
		public String clientNumber;
	public Boolean investmentStatements;
	public Boolean taxReceipts;
	public Boolean tradeConfirmation;
		*/
		User testUser = new User(
						     ProfileId = [SELECT Id FROM Profile WHERE Name = 'IG Customer Community User'].Id,
						     LastName = 'testPortalLastName',
						     Email = 'testPortalUser@example.com',
						     Username = 'testPortalUser000@example.com' + System.currentTimeMillis(),
						     CompanyName = 'TEST',
						     Title = 'title',
						     Alias = 'alias',
						     TimeZoneSidKey = 'America/Los_Angeles',
						     EmailEncodingKey = 'UTF-8',
						     LanguageLocaleKey = 'en_US',
						     LocaleSidKey = 'en_US',
						     ContactId = [select Id from Contact where LastName = 'testContact LastName'].Id
						    						    
						);
		
		System.debug('user info '+testUser);
		String jsonObj = '[{ "clientNumber" : "0987654",	"investmentStatements" : true, "taxReceipts" : true, "tradeConfirmation" : false }]';
		
		System.runAs(testUser){
	   		EmailPrefController.UpdateAssets(jsonObj);
	   	}
	   Financial_Asset__c assertFAObj = new Financial_Asset__c();
	   assertFAObj = [select Client_Number__c,Pref_Trade_Confirmation__c,Pref_Tax_Receipts__c,Pref_Investment_Statements__c from Financial_Asset__c LIMIT 1];
	   System.debug('test updated assets '+assertFAObj.Client_Number__c+' - '+assertFAObj.Pref_Investment_Statements__c + ' - '+assertFAObj.Pref_Tax_Receipts__c +' - '+assertFAObj.Pref_Trade_Confirmation__c);
	}

}