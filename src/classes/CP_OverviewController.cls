public with sharing class CP_OverviewController {
	/*
	@AuraEnabled
	public static DTO_InvestmentsPreview getInvestmentPreviewDTO() {
		DTO_InvestmentsPreview rv;
		String bpid = CP_OverviewController.getClientBPID();
		if (String.isNotBlank(bpid)) {
			rv = IGClientService.getInvestmentsPreview(bpid);
		}
		return rv;
	}
	*/
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
	/*
	@AuraEnabled
	public static DTO_InsurancePreview getInsurancePreviewDTO() {
		DTO_InsurancePreview rv;
		String bpid = CP_OverviewController.getClientBPID();
		if (String.isNotBlank(bpid)) {
			rv = IGClientService.getInsurancePreview(bpid);
		}
		return rv;
	}
	*/
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
	/*
	@AuraEnabled
	public static DTO_MortgagePreview getMortgagePreviewDTO() {
		DTO_MortgagePreview rv;
		String bpid = CP_OverviewController.getClientBPID();
		if (String.isNotBlank(bpid)) {
			rv = IGClientService.getMortgagePreview(bpid);
		}
		return rv;
	}
	*/
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

	public static String getClientBPID() {
		String rv;
		List<Contact> cs = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
        if(!cs.isEmpty()) {
            rv = cs.get(0).Business_Partner_ID__c;
        }
        return rv;
	}
}