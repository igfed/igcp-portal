@isTest
public  class CP_RegistrationControllerTest {
	

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


	@isTest static void test_StepOne_ClientNumber_IsNull() {
		
		String jsonObj = '{ "clientNum" : null, "postalCode" : "M4H 1K2", "dob" : "1978-11-06" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Client_Number_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_ClientNumber_IsEmpty() {
		
		String jsonObj = '{ "clientNum" : "", "postalCode" : "M4H 1K2", "dob" : "1978-11-06" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Client_Number_Is_Empty, result.State.Messages[0]);
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

	@isTest static void test_StepOne_PostalCode_IsNull() {
		
		String jsonObj = '{ "clientNum" : "1234567890000002", "postalCode" : null, "dob" : "1947-08-15" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Postalcode_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_PostalCode_IsEmpty() {
		
		String jsonObj = '{ "clientNum" : "1234567890000002", "postalCode" : "", "dob" : "1947-08-15" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Postalcode_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_ContactInvalidPostalCode() {
		
		String jsonObj = '{ "clientNum" : "1234567890000002", "postalCode" : "M4H 1K2", "dob" : "1947-08-15" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Postalcode_Not_Matched, result.State.Messages[0]);
	}
	
	@isTest static void test_StepOne_DOB_IsNull() {
		
		String jsonObj = '{ "clientNum" : "1234567890000002", "postalCode" : "M5C 1A9", "dob" : null }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_DOB_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_DOB_IsEmpty() {
		
		String jsonObj = '{ "clientNum" : "1234567890000002", "postalCode" : "M5C 1A9", "dob" : "" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_DOB_Is_Empty, result.State.Messages[0]);
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
		List<String> emptyList = new List<String>();
		System.assertEquals(true, result.State.IsValid);
		System.assertEquals(emptyList, result.State.Fields);
		System.assertEquals(emptyList, result.State.Messages);
	}






	//				 STEP TWO TESTS
	/////////////////////////////////////////////////////////////////


	@isTest static void test_StepTwo_UserName_IsNull()
	{
		String jsonObj = '{ "username" : null, "password" : "password123", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_User_Name_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepTwo_UserName_IsEmpty()
	{
		String jsonObj = '{ "username" : "", "password" : "password123", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_User_Name_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepTwo_UserName_AlreadyExist()
	{
		String jsonObj = '{ "username" : "jBourne", "password" : "password123", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_User_Name_Already_Exist, result.State.Messages[0]);
	}
	
	@isTest static void test_StepTwo_Password_IsNull()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Password_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepTwo_Password_IsEmpty()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Password_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepTwo_Password_NotMatched()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "pwd123", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Confirm_Password_Not_Matched, result.State.Messages[0]);
	}


	@isTest static void test_StepTwo_Email_IsNUll()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "password123", "confirmPassword" : "password123", "email": null, "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Email_Is_empty, result.State.Messages[0]);
	}


	@isTest static void test_StepTwo_Email_IsEmpty()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "password123", "confirmPassword" : "password123", "email": "", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Email_Is_empty, result.State.Messages[0]);
	}

	@isTest static void test_StepTwo_Email_IsNotValid()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "password123", "confirmPassword" : "password123", "email": "email@testdotcome", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_RegistrationClass.RegistrationForm result = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(jsonResult, CP_RegistrationClass.RegistrationForm.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Email_Is_Invalid, result.State.Messages[0]);
	}

}