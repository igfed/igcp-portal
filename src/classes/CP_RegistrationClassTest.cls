@isTest
private class CP_RegistrationClassTest {
	

// Postal Code 

	@isTest static void VerifyPostalCodeWithoutSpace() {
		
		CP_RegistrationClass.UserIdentity uid = New CP_RegistrationClass.UserIdentity();
		uid.postalCode = 'M4H1K2';
		Boolean result = uid.IsValidPostalCode();

		System.assertEquals(true, result);
	}
	
	@isTest static void VerifyPostalCodeWithSpace() {
		
		CP_RegistrationClass.UserIdentity uid = New CP_RegistrationClass.UserIdentity();
		uid.postalCode = 'M4H 1K2';
		Boolean result = uid.IsValidPostalCode();

		System.assertEquals(true, result);
	}
	
	@isTest static void VerifyPostalCodeWithDash() {
		
		CP_RegistrationClass.UserIdentity uid = New CP_RegistrationClass.UserIdentity();
		uid.postalCode = 'M4H-1K2';
		Boolean result = uid.IsValidPostalCode();

		System.assertEquals(true, result);
	}


	// Fail Tests


	@isTest static void VerifyPostalCodeWithLessCharacters() {
		
		CP_RegistrationClass.UserIdentity uid = New CP_RegistrationClass.UserIdentity();
		uid.postalCode = 'M4HK2';
		Boolean result = uid.IsValidPostalCode();

		System.assertEquals(false, result);
	}


	@isTest static void VerifyPostalCodeWithMoreCharacters() {
		
		CP_RegistrationClass.UserIdentity uid = New CP_RegistrationClass.UserIdentity();
		uid.postalCode = 'M4BH 1K2';
		Boolean result = uid.IsValidPostalCode();

		System.assertEquals(false, result);
	}


	@isTest static void VerifyPostalCodeWithSpecialCharacters() {
		
		CP_RegistrationClass.UserIdentity uid = New CP_RegistrationClass.UserIdentity();
		uid.postalCode = 'M4H 1$2';
		Boolean result = uid.IsValidPostalCode();

		System.assertEquals(false, result);
	}

// 




// Phone Number 

	// Failed
		@isTest static void VerifyPhoneNumberInValidFormat_1() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '16478845299';
			System.assertEquals(false, uProfile.IsValidPhoneNumber());
		}
		@isTest static void VerifyPhoneNumberInValidFormat_2() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '+1 647 884 5299';
			System.assertEquals(false, uProfile.IsValidPhoneNumber());
		}
		@isTest static void VerifyPhoneNumberInValidFormat_3() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '6478845299';
			System.assertEquals(false, uProfile.IsValidPhoneNumber());
		}
		@isTest static void VerifyPhoneNumberInValidFormat_4() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '1 647 884 5299';
			System.assertEquals(false, uProfile.IsValidPhoneNumber());
		}
		@isTest static void VerifyPhoneNumberInValidFormat_5() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '1-647-884-5299';
			System.assertEquals(false, uProfile.IsValidPhoneNumber());
		}


	// Success
		@isTest static void VerifyPhoneNumberValidFormat_1() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '1(647)-884-5299';
			System.assertEquals(true, uProfile.IsValidPhoneNumber());
		}

		@isTest static void VerifyPhoneNumberValidFormat_2() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '647-884-5299';
			System.assertEquals(true, uProfile.IsValidPhoneNumber());
		}

		@isTest static void VerifyPhoneNumberValidFormat_3() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '647 884 5299';
			System.assertEquals(true, uProfile.IsValidPhoneNumber());
		}

		@isTest static void VerifyPhoneNumberValidFormat_4() {
			CP_RegistrationClass.UserProfile uProfile = New CP_RegistrationClass.UserProfile();
			uProfile.mobilePhone = '(647) 884-5299';
			System.assertEquals(true, uProfile.IsValidPhoneNumber());
		}
//


}