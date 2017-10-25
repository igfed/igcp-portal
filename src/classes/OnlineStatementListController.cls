public class OnlineStatementListController {
	
	@Auraenabled
	public static List<DTO_OnlineStatement> getOnlineStatementList(){
		List<Contact> contactToUse;
		List<DTO_OnlineStatement> rv = null;
		contactToUse = new List<Contact>();
		Id contextContactId;
        
    	contactToUse = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
    	System.debug(contactToUse);
    	contextContactId = '0033D00000LKcwIQAT';//contactToUse.get(0).Id;
    	IGOnlineStatementsList onlineStatementClient = new IGOnlineStatementsList();
    	rv = onlineStatementClient.getListOfStatements(contextContactId);
    	System.debug('rv '+rv);
		return rv;
	} 
}