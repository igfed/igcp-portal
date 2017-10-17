public with sharing class CP_AccountDetailController {

	@AuraEnabled
	public static DTO_AccountDetail getAccountDetailDTO(String accountNumber) {
		DTO_AccountDetail rv = null;
		if (String.isNotBlank(accountNumber)) {
			String bpid = IGClientUtils.getClientBpid();
			if (String.isNotBlank(bpid)) {
				rv = IGClientService.getAccountDetails(bpid, accountNumber);
			} else {
				throw new AuraHandledException('The client business partnet id can\'t be null or blank');
			}
		} else {
			throw new AuraHandledException('The account number can\'t be null or blank');
		}
		return rv;
	}

	@AuraEnabled
	public static DTO_InvestmentProfile getInvestmentProfileDTO(String accountNumber) {
		DTO_InvestmentProfile rv = null;
		if (String.isNotBlank(accountNumber)) {
			String bpid = IGClientUtils.getClientBpid();
			if (String.isNotBlank(bpid)) {
				rv = IGClientService.getInvestmentProfileDTO(bpid, accountNumber);
			} else {
				throw new AuraHandledException('The client business partnet id can\'t be null or blank');
			}
		} else {
			throw new AuraHandledException('The account number can\'t be null or blank');
		}
		return rv;
	}

	@AuraEnabled
	public static List<DTO_HoldingsDetail> getHoldingsDTOList(String accountNumber) {
		List<DTO_HoldingsDetail> rv = null;
		if (String.isNotBlank(accountNumber)) {
			String bpid = IGClientUtils.getClientBpid();
			if (String.isNotBlank(bpid)) {
				rv = IGClientService.getHoldings(bpid, accountNumber);
			} else {
				throw new AuraHandledException('The client business partnet id can\'t be null or blank');
			}
		} else {
			throw new AuraHandledException('The account number can\'t be null or blank');
		}
		return rv;
	}
}