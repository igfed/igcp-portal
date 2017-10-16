@isTest
public  class CP_RegistrationControllerTest {
	

	//				 SETUP DATA
	/////////////////////////////////////////////////////////////////

	@testSetup static void init() {

			list<Contact> contactList = new List<Contact>();

			Account testAccount = new Account();
			testAccount.Name='Test Account' ;
			insert testAccount;
		
			Contact contactObj = new Contact();
			contactObj.FirstName = 'David';
			contactObj.LastName = 'Web';
			contactObj.Birthdate = Date.valueOf('1947-08-14');
			contactObj.MailingPostalCode = 'M5C 1B5';
			contactObj.Portal_User_Is_Registered__c = true;
			contactObj.Portal_User_ID__c = '123-ABC-456-XYZ-789';
			contactObj.Portal_User_Name__c = 'jBourne';
			contactObj.email = 'testuser@test.com';
			contactObj.Accountid= testAccount.id;

			insert contactObj;

			Financial_Asset__c fa = new  Financial_Asset__c();
			fa.Asset_Type__c = 'Individual';
			fa.Customer__c = contactObj.ID;
			fa.Client__c = testAccount.Id;
			fa.Client_Number__c = '147258369';

			insert fa; 


			
			Account testAccount2 = new Account();
			testAccount2.Name='Test Account 2' ;
			insert testAccount2;

			Contact contactObj2 = new Contact();
			contactObj2.FirstName = 'Damien';
			contactObj2.LastName = 'Rice';
			contactObj2.Birthdate = Date.valueOf('1990-01-01');
			contactObj2.MailingPostalCode = 'A1B 2C3';
			contactObj2.Portal_User_Is_Registered__c = false;
			contactObj2.Accountid= testAccount2.id;

			insert contactObj2;
			
			Financial_Asset__c fa2 = new  Financial_Asset__c();
			fa2.Asset_Type__c = 'Individual';
			fa2.Customer__c = contactObj2.ID;
			fa2.Client__c = testAccount2.Id;
			fa2.Client_Number__c = '963852741';

			insert fa2; 
	}





	//				 STEP ONE TESTS
	/////////////////////////////////////////////////////////////////


	@isTest static void test_StepOne_ClientNumber_IsNull() {
		
		String jsonObj = '{ "clientNum" : null, "postalCode" : "M4H 1K2", "dob" : "1978-11-06" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Client_Number_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_ClientNumber_IsEmpty() {
		
		String jsonObj = '{ "clientNum" : "", "postalCode" : "M4H 1K2", "dob" : "1978-11-06" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Client_Number_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_ContactNotFound() {
		
		String jsonObj = '{ "clientNum" : "1010101010101010", "postalCode" : "M4H 1K2", "dob" : "1978-11-06" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Error_Registration_Step_1, result.State.Messages[0]);
	}
	
	@isTest static void test_StepOne_ContactAlreadyRegistered() {
		
		String jsonObj = '{ "clientNum" : "147258369", "postalCode" : "M5C 1B5", "dob" : "1947-08-14" }';
 
		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Client_Already_Registered, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_PostalCode_IsNull() {
		
		String jsonObj = '{ "clientNum" : "1234567890000002", "postalCode" : null, "dob" : "1947-08-15" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Postalcode_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_PostalCode_IsEmpty() {
		
		String jsonObj = '{ "clientNum" : "1234567890000002", "postalCode" : "", "dob" : "1947-08-15" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Postalcode_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_ContactInvalidPostalCode() {
		
		String jsonObj = '{ "clientNum" : "963852741", "postalCode" : "1234785", "dob" : "1995-01-01" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Postalcode_Is_Invalid, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_ContactPostalCodeNotMatched() {
		
		String jsonObj = '{ "clientNum" : "963852741", "postalCode" : "M4H 1K2", "dob" : "1995-01-01" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Error_Registration_Step_1, result.State.Messages[0]);
	}
	
	@isTest static void test_StepOne_DOB_IsNull() {
		
		String jsonObj = '{ "clientNum" : "1234567890000002", "postalCode" : "M5C 1A9", "dob" : null }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_DOB_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_DOB_IsEmpty() {
		
		String jsonObj = '{ "clientNum" : "1234567890000002", "postalCode" : "M5C 1A9", "dob" : "" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_DOB_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_ContactInvalidDOB() {
		
		String jsonObj = '{ "clientNum" : "963852741", "postalCode" : "A1B 2C3", "dob" : "1978-11-06" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Error_Registration_Step_1, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_Success() {
		
		String jsonObj = '{ "clientNum" : "963852741", "postalCode" : "A1B 2C3", "dob" : "1990-01-01" }';
		
		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);
		List<String> emptyList = new List<String>();
		System.assertEquals(true, result.State.IsValid);
		System.assertEquals(emptyList, result.State.Fields);
		System.assertEquals(emptyList, result.State.Messages);
	}


	// 				Security Questions Tests
	/////////////////////////////////////////////////////////////////



	@isTest
	static void test_GetSecurityQuestions()
	{
		String jsonObj = '{ "lang" : "fr_ca" }';
		String jsonResult = CP_RegistrationController.getSecurityQuestions(jsonObj);
		
		List<Security_Question__mdt> questionList = [SELECT 
                                        Question_Eng__c,
                                        Question_Fr__c
                                        FROM Security_Question__mdt];

		CP_RegistrationClass.SecurityQuestions result = (CP_RegistrationClass.SecurityQuestions) JSON.deserialize(jsonResult, CP_RegistrationClass.SecurityQuestions.class);

		System.assertEquals(true, result.State.IsValid);
		System.assertEquals(questionList.size(), result.Questions.Size());
	}





	//				 STEP TWO TESTS
	/////////////////////////////////////////////////////////////////


	@isTest static void test_StepTwo_UserName_IsNull()
	{
		String jsonObj = '{ "username" : null, "password" : "password123", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_User_Name_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepTwo_UserName_IsEmpty()
	{
		String jsonObj = '{ "username" : "", "password" : "password123", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_User_Name_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepTwo_UserName_AlreadyExist()
	{
		String jsonObj = '{ "username" : "jBourne", "password" : "password123", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_User_Name_Already_Exist, result.State.Messages[0]);
	}

	@istest static void test_StepTwo_UserNameExistInISAM()
	{
		Test.setMock(HttpCalloutMock.class, new CP_SCIMRestClientMock_UserQuery('testUser123'));

		String jsonObj = '{ "username" : "testUser123", "password" : "password123", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';
		Test.startTest();

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		Test.stopTest();

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_User_Name_Already_Exist, result.State.Messages[0]);
	}
	
	@isTest static void test_StepTwo_Password_IsNull()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Password_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepTwo_Password_IsEmpty()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Password_Is_Empty, result.State.Messages[0]);
	}

	@isTest static void test_StepTwo_Password_NotMatched()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "pwd123", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Confirm_Password_Not_Matched, result.State.Messages[0]);
	}


	@isTest static void test_StepTwo_Email_IsNUll()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "password123", "confirmPassword" : "password123", "email": null, "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Email_Is_empty, result.State.Messages[0]);
	}


	@isTest static void test_StepTwo_Email_IsEmpty()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "password123", "confirmPassword" : "password123", "email": "", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Email_Is_empty, result.State.Messages[0]);
	}

	@isTest static void test_StepTwo_Email_IsNotValid()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "password123", "confirmPassword" : "password123", "email": "email@testdotcome", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Email_Is_Invalid, result.State.Messages[0]);
	}

	@isTest static void test_StepTwo_Email_Already_Registered()
	{
		String jsonObj = '{ "username" : "pGrass", "password" : "password123", "confirmPassword" : "password123", "email": "testuser@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Email_Is_Already_Registered, result.State.Messages[0]);
	}

	@istest static void test_StepTwo_Success()
	{
		Test.setMock(HttpCalloutMock.class, new CP_SCIMRestClientMock_UserQuery('testUser123', false));

		String jsonObj = '{ "username" : "testUser99999", "password" : "password123", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three" }';
		Test.startTest();

		String jsonResult = CP_RegistrationController.StepTwo(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		Test.stopTest();

		System.assertEquals(true, result.State.IsValid);
	}






	//				 STEP THREE TESTS
	/////////////////////////////////////////////////////////////////



	@istest static void test_StepThree_Success()
	{
		Test.setMock(HttpCalloutMock.class, new CP_SCIMRestClientMock_UserQuery('testUser123', false));

		String jsonObj = '{ "Identity" :  {"clientNum" : "963852741", "postalCode" : "A1B 2C3", "dob" : "1990-01-01"} , "Profile": {"username" : "testUser99999", "password" : "password123", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three"}, "acceptTOS": true, "lang" : "fr_ca" }';
		
		Test.startTest();

		String jsonResult = CP_RegistrationController.StepThree(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		Test.stopTest();

		System.assertEquals(true, result.State.IsValid);
	}


}