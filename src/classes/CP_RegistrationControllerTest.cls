@isTest
public  class CP_RegistrationControllerTest {
	
	@testSetup static void init() {

			list<Contact> contactList = new List<Contact>();

			Contact contactObj = new Contact();

			contactObj.FirstName = 'David';
			contactObj.LastName = 'Web';
			contactObj.Birthdate = Date.valueOf('1947-08-14');
			contactObj.Business_Partner_ID__c = '1234567890000001';
			contactObj.MailingPostalCode = 'M5C 1B5';
			contactObj.Portal_User_Is_Registered__c = true;
			contactObj.Portal_User_ID__c = '123-ABC-456-XYZ-789';

			contactList.add(contactObj);

			Contact contactObj2 = new Contact();
			contactObj2.FirstName = 'Damien';
			contactObj2.LastName = 'Rice';
			contactObj2.Birthdate = Date.valueOf('1947-08-15');
			contactObj2.Business_Partner_ID__c = '1234567890000002';
			contactObj2.MailingPostalCode = 'M5C 1A9';
			contactObj2.Portal_User_Is_Registered__c = false;
			
			contactList.add(contactObj2);

			insert contactList;
	}


	@isTest static void test_StepOne_ContactNotFound() {
		
		String jsonObj = '{ "clientNum" : "1010101010101010", "postalCode" : "M4H 1K2", "dob" : "1978-11-06" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Client_Number_Not_Found, result.State.Messages[0]);
	}
	

	@isTest static void test_StepOne_ContactAlreadyRegistered() {
		
		String jsonObj = '{ "clientNum" : "1234567890000001", "postalCode" : "M4H 1K2", "dob" : "1978-11-06" }';
 
		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Client_Already_Registered, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_ContactInvalidPostalCode() {
		
		String jsonObj = '{ "clientNum" : "1234567890000002", "postalCode" : "M4H 1K2", "dob" : "1947-08-15" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Postalcode_Not_Matched, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_ContactInvalidDOB() {
		
		String jsonObj = '{ "clientNum" : "1234567890000002", "postalCode" : "M5C 1A9", "dob" : "1978-11-06" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_DOB_Not_Matched, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_Success() {
		
		String jsonObj = '{ "clientNum" : "1234567890000002", "postalCode" : "M5C 1A9", "dob" : "1947-08-15" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		//Contact objContact = result.objContact;

		System.assertEquals(true, result.State.IsValid);
		//System.assertEquals('1234567890000002', objContact.Business_Partner_ID__c);
	}
}