public with sharing class CP_OverviewController {
	public String bpid 			{ get; private set; }
	public Boolean isPortalUser { get; private set; }

	public CP_OverviewController() {
		this.isPortalUser = false;
        List<Contact> cs = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
        if(!cs.isEmpty()) {
            this.bpid = cs.get(0).Business_Partner_ID__c;
            this.isPortalUser = true;
        }
	}

	
}