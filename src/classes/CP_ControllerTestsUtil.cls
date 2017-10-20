public class CP_ControllerTestsUtil {
	public static void createCommunityUser() {
		Account portalAccount = new Account(name = 'portalAccount');
  		insert portalAccount;
  		
  		Contact portalContact = new contact(LastName = 'portalContact', AccountId = portalAccount.Id, Business_Partner_ID__c = '111111111');
  		insert portalContact;

  		List<Profile> profileList = [select Id, Name from Profile where UserType = 'CspLitePortal' and Name like 'IG%'];
  		if (!profileList.isEmpty()) {
  			Profile profile = profileList.get(0);
  			User u1 = new User( email='test.user@emaildomain.com',
            		profileid = profile.Id, 
	                UserName='test.user@emaildomain.com.portal', 
	                Alias = 'TSTUSR',
	                TimeZoneSidKey='America/New_York',
	                EmailEncodingKey='ISO-8859-1',
	                LocaleSidKey='en_US', 
	                LanguageLocaleKey='en_US',
	                ContactId = portalContact.Id,
	                FirstName = 'Genelia',
	                LastName = 'Dsouza');
  			insert u1;
  		}
	}

	public static void createCustomSettingsData() {
		X360_Data_Services__c customSettingData = new X360_Data_Services__c(Service_Named_Credential__c = 'IG_Client_Service_1_2');
		insert customSettingData;
	}
}