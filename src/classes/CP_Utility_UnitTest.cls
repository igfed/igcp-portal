@isTest
private class CP_Utility_UnitTest {

//				 SETUP DATA
	/////////////////////////////////////////////////////////////////

	@testSetup static void init() {

			list<Contact> contactList = new List<Contact>();

			Contact contactObj = new Contact();

			contactObj.FirstName = 'Jason';
			contactObj.LastName = 'Bourne';
			contactObj.Birthdate = Date.valueOf('1947-08-14');
			contactObj.Business_Partner_ID__c = '7000000000000001';
			contactObj.Email = 'faheemuddin.saquib@slalom.com';
			contactObj.MailingPostalCode = 'M5C 1B5';
			contactObj.Portal_User_Is_Registered__c = true;
			contactObj.Portal_User_ID__c = '123-ABC-456-XYZ-789';
			contactObj.Portal_User_Name__c = 'jBourne';

			contactList.add(contactObj);
			insert contactList;
			
			/*
			EmailTemplate testTemplate = new EmailTemplate();
			testTemplate.name = 'Test Template';
			testTemplate.Body = 'test body';
			testTemplate.Subject = 'test subject';
			insert testTemplate;
			*/
	}



// Email 

	// Failure Tests
		@isTest static void VerifyEmailNull() {
			String email = null;
			Boolean result = CP_Utility.IsValidEmail(email);
			System.assertEquals(false, result);
		}
		@isTest static void VerifyEmailempty() {
			String email = '';
			Boolean result = CP_Utility.IsValidEmail(email);
			System.assertEquals(false, result);
		}
		@isTest static void VerifyEmailWithoutAtSign() {
			String email = 'faheematslalom.com';
			Boolean result = CP_Utility.IsValidEmail(email);
			System.assertEquals(false, result);
		}
		@isTest static void VerifyEmailWithoutDomain() {
			String email = 'faheem@slalom';
			Boolean result = CP_Utility.IsValidEmail(email);
			System.assertEquals(false, result);
		}
		@isTest static void VerifyEmailWithoutUsername() {
			String email = '@slalom.com';
			Boolean result = CP_Utility.IsValidEmail(email);
			System.assertEquals(false, result);
		}
		// Send Email Tests
		@isTest static void VerifySendTemplatedEmailWithWrongTemplate() {
			String templateApiName = 'Test_Template123'; 
			Contact conObj = [select ID from Contact where Business_Partner_ID__c = '7000000000000001'];
			ID targetObjId = conObj.Id;
			ID whatId = null; 
			try
			{
				CP_Utility.sendTemplatedEmail(templateApiName, targetObjId, whatId, null);	
			}
			Catch(Exception e)
			{
				System.assertEquals('CP_Utility.UtilException', e.getTypeName());
			}
		}
	//

	// Success Tests
		@isTest static void VerifyEmail() {
			String email = 'faheem@slalom.com';
			Boolean result = CP_Utility.IsValidEmail(email);
			System.assertEquals(true, result);
		}
	//

//



// Postal Code 

	// Failure Tests
		// Canadian Postal Code
		@isTest static void VerifyPostalCodeNull() {
			String postalCode = null;
			Boolean result = CP_Utility.IsValidPostalCode(postalCode);
			System.assertEquals(false, result);
		}
		@isTest static void VerifyPostalCodeEmpty() {
			String postalCode = '';
			Boolean result = CP_Utility.IsValidPostalCode(postalCode);
			System.assertEquals(false, result);
		}
		@isTest static void VerifyPostalCodeWithLessCharacters() {
			String postalCode = 'M4HK2';
			Boolean result = CP_Utility.IsValidPostalCode(postalCode);
			System.assertEquals(false, result);
		}
		@isTest static void VerifyPostalCodeWithMoreCharacters() {
			String postalCode = 'M4BH 1K2';
			Boolean result = CP_Utility.IsValidPostalCode(postalCode);
			System.assertEquals(false, result);
		}
		@isTest static void VerifyPostalCodeWithSpecialCharacters() {
			String postalCode = 'M4H 1$2';
			Boolean result = CP_Utility.IsValidPostalCode(postalCode);
			System.assertEquals(false, result);
		}
		// US Postal Code
		@isTest static void VerifyUSPostalCodeWithLessNumbers() {
			String postalCode = '123';
			Boolean result = CP_Utility.IsValidPostalCode(postalCode);
			System.assertEquals(false, result);
		}
		@isTest static void VerifyUSPostalCodeWithExtraNumbers() {
			String postalCode = '123456';
			Boolean result = CP_Utility.IsValidPostalCode(postalCode);
			System.assertEquals(false, result);
		}
		// Postal Code Matched
		@isTest static void VerifyPostalCodeMatchedFailedNull() {
			String postalCode1 = null;
			String postalCode2 = '12345';
			Boolean result = CP_Utility.PostalCodeMatched(postalCode1,postalCode2);
			System.assertEquals(false, result);
		}
		@isTest static void VerifyPostalCodeMatchedFailed() {
			String postalCode1 = 'M4H 1K2';
			String postalCode2 = '12345';
			Boolean result = CP_Utility.PostalCodeMatched(postalCode1,postalCode2);
			System.assertEquals(false, result);
		}

	//

	//Success Tests
		// Canadian Postal Code
		@isTest static void VerifyPostalCodeWithoutSpace() {
			String postalCode = 'M4H1K2';
			Boolean result = CP_Utility.IsValidPostalCode(postalCode);
			System.assertEquals(true, result);
		}
		@isTest static void VerifyPostalCodeWithSpace() {
			String postalCode = 'M4H 1K2';
			Boolean result = CP_Utility.IsValidPostalCode(postalCode);
			System.assertEquals(true, result);
		}
		@isTest static void VerifyPostalCodeWithDash() {
			String postalCode = 'M4H-1K2';
			Boolean result = CP_Utility.IsValidPostalCode(postalCode);
			System.assertEquals(true, result);
		}
		// US Postal Code
		@isTest static void VerifyUSPostalCode() {
			String postalCode = '12345';
			Boolean result = CP_Utility.IsValidPostalCode(postalCode);
			System.assertEquals(true, result);
		}
		// Postal Code Matched
		@isTest static void VerifyPostalCodeMatchedIgnorSpace() {
			String postalCode1 = 'M4H 1K2';
			String postalCode2 = 'M4H1K2';
			Boolean result = CP_Utility.PostalCodeMatched(postalCode1,postalCode2);
			System.assertEquals(true, result);
		}
		@isTest static void VerifyPostalCodeMatchedIgnorDash() {
			String postalCode1 = 'M4H1K2';
			String postalCode2 = 'M4H-1K2';
			Boolean result = CP_Utility.PostalCodeMatched(postalCode1,postalCode2);
			System.assertEquals(true, result);
		}
	//

// 

// Passsowrd
	// Failure tests
		@isTest static void VerifyReEnteredPasswordMatchedNull() {
			String pwd = null;
			String repwd = 'password';
			System.assertEquals(false, CP_Utility.ReEnteredPasswordMatched(pwd, repwd));
		}
		@isTest static void VerifyReEnteredPasswordMatchedEmpty() {
			String pwd = 'asdas';
			String repwd = '';
			System.assertEquals(false, CP_Utility.ReEnteredPasswordMatched(pwd, repwd));
		}
		@isTest static void VerifyReEnteredPasswordMatchedFailed() {
			String pwd = 'password123';
			String repwd = 'password';
			System.assertEquals(false, CP_Utility.ReEnteredPasswordMatched(pwd, repwd));
		}
	// Success Tests
		@isTest static void VerifyReEnteredPasswordMatchedSuccess() {
			String pwd = 'password123';
			String repwd = 'password123';
			System.assertEquals(true, CP_Utility.ReEnteredPasswordMatched(pwd, repwd));
		}


// Phone Number 

	// Failure Tests
		@isTest static void VerifyPhoneNumberInValidNull() {
			String mobilePhone = null;
			System.assertEquals(false, CP_Utility.IsValidPhoneNumber(mobilePhone));
		}
		@isTest static void VerifyPhoneNumberInValidEmpty() {
			String mobilePhone = '';
			System.assertEquals(false, CP_Utility.IsValidPhoneNumber(mobilePhone));
		}
		@isTest static void VerifyPhoneNumberInValidFormat_1() {
			String mobilePhone = '1647884529369';
			System.assertEquals(false, CP_Utility.IsValidPhoneNumber(mobilePhone));
		}
		@isTest static void VerifyPhoneNumberInValidFormat_2() {
			String mobilePhone = '+1 647 884';
			System.assertEquals(false, CP_Utility.IsValidPhoneNumber(mobilePhone));
		}

	// Success Tests
		@isTest static void VerifyPhoneNumberValidFormat_1() {
			String mobilePhone = '1(647)-884-5299';
			System.assertEquals(true, CP_Utility.IsValidPhoneNumber(mobilePhone));
		}

		@isTest static void VerifyPhoneNumberValidFormat_2() {
			String mobilePhone = '647-884-5299';
			System.assertEquals(true, CP_Utility.IsValidPhoneNumber(mobilePhone));
		}

		@isTest static void VerifyPhoneNumberValidFormat_3() {
			String mobilePhone = '647 884 5299';
			System.assertEquals(true, CP_Utility.IsValidPhoneNumber(mobilePhone));
		}

		@isTest static void VerifyPhoneNumberValidFormat_4() {
			String mobilePhone = '(647) 884-5299';
			System.assertEquals(true, CP_Utility.IsValidPhoneNumber(mobilePhone));
		}
//
	
}