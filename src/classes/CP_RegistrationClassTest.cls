@isTest
private class CP_RegistrationClassTest {
	

	//				 SETUP DATA
	/////////////////////////////////////////////////////////////////

	@testSetup static void init() {

			list<Contact> contactList = new List<Contact>();

			Contact contactObj = new Contact();

			contactObj.FirstName = 'Jason';
			contactObj.LastName = 'Bourne';
			contactObj.Birthdate = Date.valueOf('1947-08-14');
			contactObj.Business_Partner_ID__c = '987654321';
			contactObj.MailingPostalCode = 'M5C 1B5';
			contactObj.Portal_User_Is_Registered__c = true;
			contactObj.Portal_User_ID__c = '123-ABC-456-XYZ-789';
			contactObj.Portal_User_Name__c = 'jBourne';

			contactList.add(contactObj);

			Contact contactObj2 = new Contact();
			contactObj2.FirstName = 'Damien';
			contactObj2.LastName = 'Rice';
			contactObj2.Birthdate = Date.valueOf('1947-08-15');
			contactObj2.Business_Partner_ID__c = '1234567890000002';
			contactObj2.MailingPostalCode = 'M5C 1A9';
			contactObj2.Portal_User_Is_Registered__c = false;
			
			contactList.add(contactObj2);
			// some test 

			insert contactList;
	}



	


}