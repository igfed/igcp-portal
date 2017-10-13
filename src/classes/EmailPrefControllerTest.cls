@isTest
public class EmailPrefControllerTest {
	
	@testSetup 
	static void setup(){
		List<RecordType> rtypes = [Select Name, Id From RecordType
                  where sObjectType='Contact' and isActive=true];

		Account testAccount = new Account(Name = 'Test Account');
		insert testAccount;
		Map<String,String> contactRecordTypes = new Map<String,String>{};
     	for(RecordType rt: rtypes){
       		contactRecordTypes.put(rt.Name,rt.Id);
       	}


		Contact testContact = new Contact(  RecordTypeId = contactRecordTypes.get('Customer'),
											LastName = 'testContact LastName',
											AccountId = testAccount.Id,
											Business_Partner_ID__c = '1234567890');
		insert testContact;


	}

}