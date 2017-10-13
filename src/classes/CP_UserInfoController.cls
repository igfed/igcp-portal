public with sharing class CP_UserInfoController {
	
	@AuraEnabled
	public static DTO_UserInfo getUserInfoDTO() {
		DTO_UserInfo rv 	= new DTO_UserInfo();
		rv.userFirstName 	= UserInfo.getFirstName();
		rv.userFullName 	= UserInfo.getUserName();
		rv.userId 			= UserInfo.getUserId();
		List<Contact> cs 	= [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
        if(!cs.isEmpty()) {
            rv.clientBPID 	= cs.get(0).Business_Partner_ID__c;
        }
		return rv;
	}
}