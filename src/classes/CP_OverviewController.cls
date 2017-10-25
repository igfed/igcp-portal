public with sharing class CP_OverviewController {
	@AuraEnabled
	public static DTO_InvestmentsPreview getInvestmentPreviewDTOFromCache() {
		DTO_InvestmentsPreview rv;
        String bpid = CP_OverviewController.getClientBPID();
        if (String.isNotBlank(bpid)) {
        	rv = CacheManager.getInvestmentPreviewDTO(bpid);
        }
        return rv;
	}


    @AuraEnabled
    public static DTO_InvestmentsPreview getInvestmentPreviewDTO() {
        DTO_InvestmentsPreview rv;
        String bpid = CP_OverviewController.getClientBPID();
        if (String.isNotBlank(bpid)) {
            rv = IGClientService.getInvestmentsPreview(bpid);
        }
        return rv;
    }
    
    @AuraEnabled
    public static DTO_InsurancePreview getInsurancePreviewDTO() {
        DTO_InsurancePreview rv;
        String bpid = CP_OverviewController.getClientBPID();
        if (String.isNotBlank(bpid)) {
            rv = IGClientService.getInsurancePreview(bpid);
        }
        return rv;
    }

    @AuraEnabled
    public static DTO_MortgagePreview getMortgagePreviewDTO() {
        DTO_MortgagePreview rv;
        String bpid = CP_OverviewController.getClientBPID();
        if (String.isNotBlank(bpid)) {
            rv = IGClientService.getMortgagePreview(bpid);
        }
        return rv;
    }

    @AuraEnabled 
    public static DTO_AssetMixAggregate getAssetMixAggregate() {
        DTO_AssetMixAggregate rv;
        String bpid = CP_OverviewController.getClientBPID();
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
        return IGClientUtils.getClientBpid();
    }
}