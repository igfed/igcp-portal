public with sharing class CP_MortgageDetailController {
	
	@AuraEnabled
	public static DTO_MortgageDetail getMortgageDetailDTO(String loanNumber) {
		DTO_MortgageDetail rv = null;
		if (String.isNotBlank(loanNumber)) {
			String bpid = IGClientUtils.getClientBpid();
			if (String.isNotBlank(bpid)) {
				rv = IGClientService.getMortgageDetails(bpid, loanNumber);
			}
		} else {
			throw new AuraHandledException('The loan number can\'t be null or blank');			
		}
		return rv;
	}
}