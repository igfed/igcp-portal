@isTest
private class CP_ForgotUserNameControllerTest {
	
	//				 SETUP DATA
	/////////////////////////////////////////////////////////////////

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
			contactObj.Portal_User_Name__c = 'jBourne';
			contactObj.email = 'david.web@test.com';

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




	//				 STEP ONE TESTS
	/////////////////////////////////////////////////////////////////

		// Fail Tests
			
			@isTest static void test_StepOne_ClientNumber_IsNull() {
		
				String jsonObj = '{ "clientNum" : null, "email" : "david.web@test.com" }';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_ForgotUserNameController.ForgotUserNameResponse result = (CP_ForgotUserNameController.ForgotUserNameResponse) JSON.deserialize(jsonResult, CP_ForgotUserNameController.ForgotUserNameResponse.class);

				System.assertEquals(false, result.State.IsValid);
				System.assertEquals(System.Label.CP_Registration_Client_Number_Is_Empty, result.State.Messages[0]);
			}
			
			@isTest static void test_StepOne_ClientNumber_IsEmpty() {
		
				String jsonObj = '{ "clientNum" : "", "email" : "david.web@test.com" }';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_ForgotUserNameController.ForgotUserNameResponse result = (CP_ForgotUserNameController.ForgotUserNameResponse) JSON.deserialize(jsonResult, CP_ForgotUserNameController.ForgotUserNameResponse.class);

				System.assertEquals(false, result.State.IsValid);
				System.assertEquals(System.Label.CP_Registration_Client_Number_Is_Empty, result.State.Messages[0]);
			}

			@isTest static void test_StepOne_Email_IsNull() {
		
				String jsonObj = '{ "clientNum" : "1234567890000001", "email" : null }';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_ForgotUserNameController.ForgotUserNameResponse result = (CP_ForgotUserNameController.ForgotUserNameResponse) JSON.deserialize(jsonResult, CP_ForgotUserNameController.ForgotUserNameResponse.class);

				System.assertEquals(false, result.State.IsValid);
				System.assertEquals(System.Label.CP_Registration_Email_Is_empty, result.State.Messages[0]);
			}
			
			@isTest static void test_StepOne_Email_IsEmpty() {
		
				String jsonObj = '{ "clientNum" : "1234567890000001", "email" : "" }';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_ForgotUserNameController.ForgotUserNameResponse result = (CP_ForgotUserNameController.ForgotUserNameResponse) JSON.deserialize(jsonResult, CP_ForgotUserNameController.ForgotUserNameResponse.class);

				System.assertEquals(false, result.State.IsValid);
				System.assertEquals(System.Label.CP_Registration_Email_Is_empty, result.State.Messages[0]);
			}

			@isTest static void test_StepOne_Email_IsInValid() {
		
				String jsonObj = '{ "clientNum" : "1234567890000001", "email" : "david.webattest.com" }';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_ForgotUserNameController.ForgotUserNameResponse result = (CP_ForgotUserNameController.ForgotUserNameResponse) JSON.deserialize(jsonResult, CP_ForgotUserNameController.ForgotUserNameResponse.class);

				System.assertEquals(false, result.State.IsValid);
				System.assertEquals(System.Label.CP_Registration_Email_Is_Invalid, result.State.Messages[0]);
			}

			@isTest static void test_StepOne_ContactNotFound_InCorrect_ClientNum() {
				
				String jsonObj = '{ "clientNum" : "1010101010101010", "email" : "david.web@test.com" }';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_ForgotUserNameController.ForgotUserNameResponse result = (CP_ForgotUserNameController.ForgotUserNameResponse) JSON.deserialize(jsonResult, CP_ForgotUserNameController.ForgotUserNameResponse.class);

				System.assertEquals(false, result.State.IsValid);
				System.assertEquals(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid, result.State.Messages[0]);
			}
			@isTest static void test_StepOne_ContactNotFound_InCorrect_Email() {
				
				String jsonObj = '{ "clientNum" : "1234567890000001", "email" : "test@test.com" }';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_ForgotUserNameController.ForgotUserNameResponse result = (CP_ForgotUserNameController.ForgotUserNameResponse) JSON.deserialize(jsonResult, CP_ForgotUserNameController.ForgotUserNameResponse.class);

				System.assertEquals(false, result.State.IsValid);
				System.assertEquals(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid, result.State.Messages[0]);
			}
			@isTest static void test_StepOne_ContactNotFound() {
				
				String jsonObj = '{ "clientNum" : "1010101010101010", "email" : "test@test.com" }';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_ForgotUserNameController.ForgotUserNameResponse result = (CP_ForgotUserNameController.ForgotUserNameResponse) JSON.deserialize(jsonResult, CP_ForgotUserNameController.ForgotUserNameResponse.class);

				System.assertEquals(false, result.State.IsValid);
				System.assertEquals(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid, result.State.Messages[0]);
			}


		// Success Tests
			
			@isTest static void test_StepOne_ContactFound() {
				
				String jsonObj = '{ "clientNum" : "1234567890000001", "email" : "david.web@test.com" }';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_ForgotUserNameController.ForgotUserNameResponse result = (CP_ForgotUserNameController.ForgotUserNameResponse) JSON.deserialize(jsonResult, CP_ForgotUserNameController.ForgotUserNameResponse.class);

				System.assertEquals(true, result.State.IsValid);
			}


}