public class IGClientUtils {
	public static String getClientBpid() {
		String rv = '';
		List<Contact> cs = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
        if(!cs.isEmpty()) {
            rv = cs.get(0).Business_Partner_ID__c;
        }
        return rv;
	}
}