@isTest
public class CP_ForgotUserNameControllerTest {
	
	//				 SETUP DATA
	/////////////////////////////////////////////////////////////////

	@testSetup static void init() {

			// Regsitered User
			Account testAccount = new Account();
			testAccount.Name='Test Account' ;
			insert testAccount;
		
			Contact contactObj = new Contact();
			contactObj.FirstName = 'David';
			contactObj.LastName = 'Web';
			contactObj.Birthdate = Date.valueOf('1947-08-14');
			contactObj.MailingPostalCode = 'M5C 1B5';
			contactObj.Portal_User_Is_Registered__c = true;
			contactObj.Business_Partner_ID__c = '111111111';
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
			fa2.Customer__c = contactObj2.ID;
			fa2.Client__c = testAccount2.Id;
			fa2.Client_Number__c = '963852741';

			insert fa2; 


	}




	//				 STEP ONE TESTS
	/////////////////////////////////////////////////////////////////

		// Fail Tests
			
			@isTest static void test_StepOne_ClientNumber_IsNull() {
		
				String jsonObj = '{ "clientNum" : null, "email" : "testuser@test.com"}';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

				System.assertEquals(false, result.State.IsValid);
				System.assertEquals(System.Label.CP_Registration_Client_Number_Is_Empty, result.State.Messages[0]);
			}

			@isTest static void test_StepOne_ClientNumber_IsEmpty() {
				
				String jsonObj = '{ "clientNum" : "", "email" : "testuser@test.com"}';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

				System.assertEquals(false, result.State.IsValid);
				System.assertEquals(System.Label.CP_Registration_Client_Number_Is_Empty, result.State.Messages[0]);
			}

			@isTest static void test_StepOne_Email_IsNull() {
		
				String jsonObj = '{ "clientNum" : "123456789", "email" : null}';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

				System.assertEquals(false, result.State.IsValid);
				System.assertEquals(System.Label.CP_Registration_Email_Is_Empty, result.State.Messages[0]);
			}

			@isTest static void test_StepOne_Email_IsEmpty() {
				
				String jsonObj = '{ "clientNum" : "123456789", "email" : ""}';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

				System.assertEquals(false, result.State.IsValid);
				System.assertEquals(System.Label.CP_Registration_Email_Is_Empty, result.State.Messages[0]);
			}


		// Success Tests
			
			
			@isTest static void test_StepOne_Success() {
				
				String jsonObj = '{ "clientNum" : "147258369", "email" : "testuser@test.com"}';

				String jsonResult = CP_ForgotUserNameController.StepOne(jsonObj);

				CP_Response result = (CP_Response) JSON.deserialize(jsonResult, CP_Response.class);

				System.assertEquals(true, result.State.IsValid);
				
			}

	//
	



	// 				Security Questions Tests
	/////////////////////////////////////////////////////////////////


	/*
	@isTest
	static void test_GetSecurityQuestions()
	{
		Test.setMock(HttpCalloutMock.class, new CP_SCIMRestClientMock_UserQuery('testUser123'));
		String jsonObj = '{ "lang" : "fr_ca" }';

		Test.startTest();
			String jsonResult = CP_ForgotUserNameController.getSecurityQuestion(jsonObj);
			
			CP_ForgotUserNameClass.SecurityQuestion result = (CP_ForgotUserNameClass.SecurityQuestion) JSON.deserialize(jsonResult, CP_RegistrationClass.SecurityQuestions.class);
		Test.stopTest();

		System.assertEquals(true, result.State.IsValid);
		//System.assertEquals(questionList.size(), result.Questions.Size());
	}

	*/
}