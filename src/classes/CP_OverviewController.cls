public with sharing class CP_OverviewController {

	@AuraEnabled
	public static DTO_InvestmentsPreview getInvestmentPreviewDTO(String bpid) {
		DTO_InvestmentsPreview rv;
		if (String.isBlank(bpid)) {
			bpid = CP_OverviewController.getClientBPID();
		}
		if (String.isNotBlank(bpid)) {
			rv = IGClientService.getInvestmentsPreview(bpid);
		}
		return rv;
	}

	@AuraEnabled
	public static DTO_InsurancePreview getInsurancePreviewDTO(String bpid) {
		DTO_InsurancePreview rv;
		if (String.isBlank(bpid)) {
			bpid = CP_OverviewController.getClientBPID();
		}
		if (String.isNotBlank(bpid)) {
			rv = IGClientService.getInsurancePreview(bpid);
		}
		return rv;
	}

	@AuraEnabled
	public static DTO_MortgagePreview getMortgagePreviewDTO(String bpid) {
		DTO_MortgagePreview rv;
		if (String.isBlank(bpid)) {
			bpid = CP_OverviewController.getClientBPID();
		}
		if (String.isNotBlank(bpid)) {
			rv = IGClientService.getMortgagePreview(bpid);
		}
		return rv;
	}

	@AuraEnabled 
	public static DTO_AssetMixAggregate getAssetMixAggregate(String bpid) {
		DTO_AssetMixAggregate rv;
		if (String.isBlank(bpid)) {
			bpid = CP_OverviewController.getClientBPID();
		}
		if (String.isNotBlank(bpid)) {
			rv = IGClientService.getAssetMixAggregate(bpid);
		}
		return rv;
	}

	@AuraEnabled
  	public static String getUserName() {
    	return UserInfo.getName();
  	}

  	@AuraEnabled
  	public static String getUserFirstName() {
  		return UserInfo.getFirstName();
  	}

	public static String getClientBPID() {
		String rv;
		List<Contact> cs = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
        if(!cs.isEmpty()) {
            rv = cs.get(0).Business_Partner_ID__c;
        }
        return rv;
	}
}