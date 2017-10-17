@isTest
public  class CP_RegistrationControllerTest {
	

	//				 SETUP DATA
	/////////////////////////////////////////////////////////////////

	@testSetup static void init() {

			list<Contact> contactList = new List<Contact>();


			// Already Regsitered
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
			//fa.RecordType.DeveloperName = 'Investment_Asset';
			fa.Customer__c = contactObj.ID;
			fa.Client__c = testAccount.Id;
			fa.Client_Number__c = '147258369';

			insert fa; 


			
			// Not yet Registered 
			Account testAccount2 = new Account();
			testAccount2.Name='Test Account 2' ;
			insert testAccount2;

			Contact contactObj2 = new Contact();
			contactObj2.FirstName = 'Damien';
			contactObj2.LastName = 'Rice';
			contactObj2.Business_Partner_ID__c = '112233445566';
			contactObj2.Birthdate = Date.valueOf('1990-01-01');
			contactObj2.MailingPostalCode = 'A1B 2C3';
			contactObj2.Portal_User_Is_Registered__c = false;
			contactObj2.Accountid= testAccount2.id;

			insert contactObj2;
			
			Financial_Asset__c fa2 = new  Financial_Asset__c();
			fa2.Asset_Type__c = 'Individual';
			//fa2.RecordType.DeveloperName = 'Investment_Asset';
			fa2.Customer__c = contactObj2.ID;
			fa2.Client__c = testAccount2.Id;
			fa2.Client_Number__c = '963852741';

			insert fa2; 



			// Registration is Locked 
			Account testAccount3 = new Account();
			testAccount3.Name='Test Account 3' ;
			insert testAccount3;

			Contact contactObj3 = new Contact();
			contactObj3.FirstName = 'Test User';
			contactObj3.LastName = 'User';
			contactObj3.Birthdate = Date.valueOf('1913-11-13');
			contactObj3.MailingPostalCode = 'A1B 2C3';
			contactObj3.Portal_User_Is_Registered__c = false;
			contactObj3.Portal_Registration_Is_Locked__c = true;

			contactObj3.Accountid= testAccount3.id;

			insert contactObj3;
			
			Financial_Asset__c fa3 = new  Financial_Asset__c();
			fa3.Asset_Type__c = 'Individual';
			//fa3.RecordType.DeveloperName = 'Investment_Asset';
			fa3.Customer__c = contactObj3.ID;
			fa3.Client__c = testAccount3.Id;
			fa3.Client_Number__c = '1000000010001';

			insert fa3;


			// Is  JOINT Account and Cannot Register
			Account testAccount4 = new Account();
			testAccount4.Name='Test Account 4' ;
			insert testAccount4;

			Contact contactObj4 = new Contact();
			contactObj4.FirstName = 'Test User';
			contactObj4.LastName = 'User';
			contactObj4.Birthdate = Date.valueOf('1914-11-14');
			contactObj4.MailingPostalCode = 'A1B 2C3';
			contactObj4.Portal_User_Is_Registered__c = false;
			

			contactObj4.Accountid= testAccount4.id;

			insert contactObj4;
			
			Financial_Asset__c fa4 = new  Financial_Asset__c();
			fa4.Asset_Type__c = 'Joint';
			//fa4.RecordType.DeveloperName = 'Investment_Asset';
			fa4.Customer__c = contactObj4.ID;
			fa4.Client__c = testAccount4.Id;
			fa4.Client_Number__c = '1000000040004';

			insert fa4;


			// Is  Company Account and Cannot Register
			Account testAccount5 = new Account();
			testAccount5.Name='Test Account 5' ;
			insert testAccount5;

			Contact contactObj5 = new Contact();
			contactObj5.FirstName = 'Test User';
			contactObj5.LastName = 'User';
			contactObj5.Birthdate = Date.valueOf('1915-11-15');
			contactObj5.MailingPostalCode = 'A1B 2C3';
			contactObj5.Portal_User_Is_Registered__c = false;
			
			contactObj5.Accountid= testAccount5.id;

			insert contactObj5;
			
			Financial_Asset__c fa5 = new  Financial_Asset__c();
			fa5.Asset_Type__c = 'Company';
			//fa5.RecordType.DeveloperName = 'Investment_Asset';
			fa5.Customer__c = contactObj5.ID;
			fa5.Client__c = testAccount5.Id;
			fa5.Client_Number__c = '1000000050005';

			insert fa5;

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


	@isTest static void test_StepOne_ContactRegsitrationIsLocked() {
		
		String jsonObj = '{ "clientNum" : "1000000010001", "postalCode" : "A1B 2C3", "dob" : "1913-11-13" }';
 
		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(true, result.State.IsLocked);
		System.assertEquals(System.Label.CP_Registration_Locked_h1, result.State.Messages[0]);
	}


	@isTest static void test_StepOne_ContactIsJoint() {
		
		String jsonObj = '{ "clientNum" : "1000000040004", "postalCode" : "A1B 2C3", "dob" : "1914-11-14" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Client_is_Joint_and_Not_allowed_to_Register, result.State.Messages[0]);
	}



	@isTest static void test_StepOne_ContactIsCompany() {
		
		String jsonObj = '{ "clientNum" : "1000000050005", "postalCode" : "A1B 2C3", "dob" : "1915-11-15" }';

		String jsonResult = CP_RegistrationController.StepOne(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Client_is_Company_and_Not_allowed_to_Register, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_ContactIsDeceased() {
		
		Test.startTest();
			Contact objCon = [SELECT Id, Client_Is_Deceased__c from Contact where Business_Partner_ID__c = '112233445566' limit 1];
			if(objCon!= null)
			{
				objCon.Client_Is_Deceased__c = true;
				update objCon;
			}

			String jsonObj = '{ "clientNum" : "963852741", "postalCode" : "A1B 2C3", "dob" : "1990-01-01" }';
			String jsonResult = CP_RegistrationController.StepOne(jsonObj);
			CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);
		Test.stopTest();

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Client_is_deceased, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_ContactMailReturned() {
		Test.startTest();
			Contact objCon = [SELECT Id, Client_Returned_Mail__c from Contact where Business_Partner_ID__c = '112233445566' limit 1];
			if(objCon!= null)
			{
				objCon.Client_Returned_Mail__c = true;
				update objCon;
			}

			String jsonObj = '{ "clientNum" : "963852741", "postalCode" : "A1B 2C3", "dob" : "1990-01-01" }';
			String jsonResult = CP_RegistrationController.StepOne(jsonObj);
			CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);
		Test.stopTest();

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Client_mail_returned, result.State.Messages[0]);
	}

	@isTest static void test_StepOne_ContactHasZeroBalance() {

		Test.startTest();
			Contact objCon = [SELECT Id, Client_Zero_Balance__c from Contact where Business_Partner_ID__c = '112233445566' limit 1];
			if(objCon!= null)
			{
				objCon.Client_Zero_Balance__c = true;
				update objCon;
			}
			String jsonObj = '{ "clientNum" : "963852741", "postalCode" : "A1B 2C3", "dob" : "1990-01-01" }';
			String jsonResult = CP_RegistrationController.StepOne(jsonObj);
			CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);
		Test.stopTest();

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Client_has_zero_balance, result.State.Messages[0]);
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

	@istest static void test_StepThree_TOS_Not_Accepted()
	{
		Test.setMock(HttpCalloutMock.class, new CP_SCIMRestClientMock_UserQuery('testUser123', false));

		String jsonObj = '{ "Identity" :  {"clientNum" : "963852741", "postalCode" : "A1B 2C3", "dob" : "1990-01-01"} , "Profile": {"username" : "testUser99999", "password" : "password123", "confirmPassword" : "password123", "email": "test@test.com", "emailOptIn": true, "mobilePhone" : "647 123 4567", "securityQuestion1": "question one", "answer1": "answer one", "securityQuestion2": "question two", "answer2": "answer two", "securityQuestion3": "question three", "answer3": "answer three"}, "acceptTOS": false, "lang" : "fr_ca" }';
		
		Test.startTest();

		String jsonResult = CP_RegistrationController.StepThree(jsonObj);

		CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

		Test.stopTest();

		System.assertEquals(false, result.State.IsValid);
		System.assertEquals(System.Label.CP_Registration_Terms_Of_Service_Not_Accepted, result.State.Messages[0]);
	}


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