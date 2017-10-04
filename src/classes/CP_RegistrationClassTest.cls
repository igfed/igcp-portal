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



// Postal Code 

	@isTest static void VerifyPostalCodeWithoutSpace() {
		
		CP_RegistrationClass.UserIdentity uid = New CP_RegistrationClass.UserIdentity();
		uid.postalCode = 'M4H1K2';
		Boolean result = CP_Utility.IsValidPostalCode(uid.postalCode);

		System.assertEquals(true, result);
	}
	
	@isTest static void VerifyPostalCodeWithSpace() {
		
		CP_RegistrationClass.UserIdentity uid = New CP_RegistrationClass.UserIdentity();
		uid.postalCode = 'M4H 1K2';
		Boolean result = CP_Utility.IsValidPostalCode(uid.postalCode);

		System.assertEquals(true, result);
	}
	
	@isTest static void VerifyPostalCodeWithDash() {
		
		CP_RegistrationClass.UserIdentity uid = New CP_RegistrationClass.UserIdentity();
		uid.postalCode = 'M4H-1K2';
		Boolean result = CP_Utility.IsValidPostalCode(uid.postalCode);

		System.assertEquals(true, result);
	}


	// Fail Tests


	@isTest static void VerifyPostalCodeWithLessCharacters() {
		
		CP_RegistrationClass.UserIdentity uid = New CP_RegistrationClass.UserIdentity();
		uid.postalCode = 'M4HK2';
		Boolean result = CP_Utility.IsValidPostalCode(uid.postalCode);

		System.assertEquals(false, result);
	}


	@isTest static void VerifyPostalCodeWithMoreCharacters() {
		
		CP_RegistrationClass.UserIdentity uid = New CP_RegistrationClass.UserIdentity();
		uid.postalCode = 'M4BH 1K2';
		Boolean result = CP_Utility.IsValidPostalCode(uid.postalCode);

		System.assertEquals(false, result);
	}


	@isTest static void VerifyPostalCodeWithSpecialCharacters() {
		
		CP_RegistrationClass.UserIdentity uid = New CP_RegistrationClass.UserIdentity();
		uid.postalCode = 'M4H 1$2';
		Boolean result = CP_Utility.IsValidPostalCode(uid.postalCode);

		System.assertEquals(false, result);
	}

// 




// Phone Number 

	// Failed
		@isTest static void VerifyPhoneNumberInValidFormat_1() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '16478845299';
			System.assertEquals(false, CP_Utility.IsValidPhoneNumber(uProfile.mobilePhone));
		}
		@isTest static void VerifyPhoneNumberInValidFormat_2() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '+1 647 884 5299';
			System.assertEquals(false, CP_Utility.IsValidPhoneNumber(uProfile.mobilePhone));
		}
		@isTest static void VerifyPhoneNumberInValidFormat_3() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '6478845299';
			System.assertEquals(false, CP_Utility.IsValidPhoneNumber(uProfile.mobilePhone));
		}
		@isTest static void VerifyPhoneNumberInValidFormat_4() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '1 647 884 5299';
			System.assertEquals(false, CP_Utility.IsValidPhoneNumber(uProfile.mobilePhone));
		}
		@isTest static void VerifyPhoneNumberInValidFormat_5() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '1-647-884-5299';
			System.assertEquals(false, CP_Utility.IsValidPhoneNumber(uProfile.mobilePhone));
		}


	// Success
		@isTest static void VerifyPhoneNumberValidFormat_1() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '1(647)-884-5299';
			System.assertEquals(true, CP_Utility.IsValidPhoneNumber(uProfile.mobilePhone));
		}

		@isTest static void VerifyPhoneNumberValidFormat_2() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '647-884-5299';
			System.assertEquals(true, CP_Utility.IsValidPhoneNumber(uProfile.mobilePhone));
		}

		@isTest static void VerifyPhoneNumberValidFormat_3() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '647 884 5299';
			System.assertEquals(true, CP_Utility.IsValidPhoneNumber(uProfile.mobilePhone));
		}

		@isTest static void VerifyPhoneNumberValidFormat_4() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '(647) 884-5299';
			System.assertEquals(true, CP_Utility.IsValidPhoneNumber(uProfile.mobilePhone));
		}
//



	


}