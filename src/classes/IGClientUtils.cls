public class IGClientUtils {
	public static String getClientBpid() {
		String rv = '';
		List<Contact> cs = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
        if(!cs.isEmpty()) {
            rv = cs.get(0).Business_Partner_ID__c;
        }
        return rv;
	}

	public static Boolean isValidAccount(String bpid, String accountNumber) {
		Boolean rv = false;
		if (String.isNotBlank(bpid) && String.isNotBlank(accountNumber)) {
			DTO_InvestmentsPreview dto = CacheManager.getInvestmentPreviewDTO(bpid);
			if (dto != null) {
				for (String accNum : dto.accountNumbers) {
					if (accountNumber == accNum) {
						rv = true;
						break;
					}
				}
			}
		} 
		return rv;
	}

	public static Boolean UserNameExist(String userName)
    {
    	// First check salesforce records to see if UserName exists
        List<contact> contactList = [select ID, Portal_User_Name__c from Contact where Portal_User_Name__c = : userName];

        if(contactList.isEmpty())
        {
        	// If UserName not found then check if it exists in ISAM
            CP_SCIMRestClient restClient = new CP_SCIMRestClient();
            return restClient.UserNameExist(userName);
        }
        return true;
	}


	public static Boolean EmailAlreadyRegistered(String bpid, String email)
    {
        List<Contact> contactList = [SELECT Business_Partner_ID__c, Email FROM Contact WHERE Business_Partner_ID__c != :bpid AND Email = :email];
		return contactList.isEmpty() ? false : true;
    }

    public static Contact getContactByBPID(String bpid)
    {
    	List<Contact> objConList = [SELECT ID, FirstName, LastName, Email, Birthdate, Phone, MailingPostalCode,
		                                Business_Partner_ID__c,Preferred_Language__c, 
		                                Client_Is_Deceased__c, Client_Returned_Mail__c, Client_Zero_Balance__c, 
		                                Portal_Registration_Eligible__c, Portal_User_Is_Registered__c, 
		                                Portal_Action_Failure_Count__c, Portal_Registration_Is_Locked__c,
		                                Portal_User_Consent_Obtained__c, Portal_User_Consent_Date__c,
										Portal_User_ID__c, Portal_User_Name__c
		                        	FROM Contact 
		                        	WHERE Business_Partner_ID__c =: bpid];
         if(objConList.isEmpty())
         	return null;
         else
         	return objConList[0];
    }

    public static Contact getContactByUserName(String userName)
    {
    	List<Contact> objConList = [SELECT ID, FirstName, LastName, Email, Birthdate, Phone, MailingPostalCode,
		                                Business_Partner_ID__c,Preferred_Language__c, 
		                                Client_Is_Deceased__c, Client_Returned_Mail__c, Client_Zero_Balance__c, 
		                                Portal_Registration_Eligible__c, Portal_User_Is_Registered__c, 
		                                Portal_Action_Failure_Count__c, Portal_Registration_Is_Locked__c,
		                                Portal_User_Consent_Obtained__c, Portal_User_Consent_Date__c,
										Portal_User_ID__c, Portal_User_Name__c
		                        	FROM Contact 
		                        	WHERE Portal_User_Name__c =: userName];
		if(objConList.isEmpty())
         	return null;
         else
         	return objConList[0];
    }

    public static String generateHash(String input) {
    	String rv = null;
    	if (String.isNotBlank(input)) {
	    	Blob targetBlob = Blob.valueOf(input);
			Blob hash = Crypto.generateDigest('MD5', targetBlob);
			String theString = EncodingUtil.convertToHex(hash);
			rv = theString;
			//rv = EncodingUtil.urlEncode(theString, 'UTF-8');
    	}
    	return rv;
    }

    public static String generateRandomString(Integer len) {
	    final String chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
	    String randStr = '';
	    while (randStr.length() < len) {
	       Integer idx = Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length());
	       randStr += chars.substring(idx, idx+1);
	    }
	    return randStr; 
	}

}