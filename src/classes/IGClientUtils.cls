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
}