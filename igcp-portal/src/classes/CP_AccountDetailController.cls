public with sharing class CP_AccountDetailController {

	@AuraEnabled
	public static DTO_AccountDetail getAccountDetailDTO(String accountNumberEnc) {
		DTO_AccountDetail rv = null;
		if (String.isNotBlank(accountNumberEnc)) {
			String bpid = IGClientUtils.getClientBpid();
			System.debug('=====> getAccountDetailDTO - bpid: ' + bpid);
			System.debug('=====> getAccountDetailDTO - accountNumberEnc: ' + accountNumberEnc);
			if (String.isNotBlank(bpid)) {
				if (!IGClientUtils.isValidAccount(bpid, accountNumberEnc)) {
					throw new AuraHandledException('The account number is not associated with the client business partner id');
				}
				rv = IGClientService.getAccountDetails(bpid, accountNumberEnc);
				System.debug('=====> getAccountDetailDTO - rv: ' + rv);
			} else {
				throw new AuraHandledException('The client business partner id can\'t be null or blank');
			}
		} else {
			throw new AuraHandledException('The account number can\'t be null or blank');
		}
		return rv;
	}

	@AuraEnabled
	public static DTO_InvestmentProfile getInvestmentProfileDTO(String accountNumberEnc) {
		DTO_InvestmentProfile rv = null;
		if (String.isNotBlank(accountNumberEnc)) {
			String bpid = IGClientUtils.getClientBpid();
			if (String.isNotBlank(bpid)) {
				if (!IGClientUtils.isValidAccount(bpid, accountNumberEnc)) {
					throw new AuraHandledException('The account number is not associated with the client business partner id');
				}
				rv = IGClientService.getInvestmentProfileDTO(bpid, accountNumberEnc);
			} else {
				throw new AuraHandledException('The client business partner id can\'t be null or blank');
			}
		} else {
			throw new AuraHandledException('The account number can\'t be null or blank');
		}
		return rv;
	}

	@AuraEnabled
	public static List<DTO_HoldingsDetail> getHoldingsDTOList(String accountNumberEnc) {
		List<DTO_HoldingsDetail> rv = null;
		if (String.isNotBlank(accountNumberEnc)) {
			String bpid = IGClientUtils.getClientBpid();
			if (String.isNotBlank(bpid)) {
				if (!IGClientUtils.isValidAccount(bpid, accountNumberEnc)) {
					throw new AuraHandledException('The account number is not associated with the client business partner id');
				}
				rv = IGClientService.getHoldings(bpid, accountNumberEnc);
			} else {
				throw new AuraHandledException('The client business partner id can\'t be null or blank');
			}
		} else {
			throw new AuraHandledException('The account number can\'t be null or blank');
		}
		return rv;
	}

	@AuraEnabled
	public static List<DTO_TransactionsDetail> getTransactionsDTOList(String accountNumberEnc) {
		List<DTO_TransactionsDetail> rv = null;
		if (String.isNotBlank(accountNumberEnc)) {
			String bpid = IGClientUtils.getClientBpid();
			if (String.isNotBlank(bpid)) {
				if (!IGClientUtils.isValidAccount(bpid, accountNumberEnc)) {
					throw new AuraHandledException('The account number is not associated with the client business partner id');
				}
				rv = IGClientService.getTransactionsDetails(bpid, accountNumberEnc);
			} else {
				throw new AuraHandledException('The client business partner id can\'t be null or blank');
			}
		} else {
			throw new AuraHandledException('The account number can\'t be null or blank');
		}
		return rv;
	}

	@AuraEnabled
	public static List<DTO_InstructionsDetail> getInstructionsDTOList(String accountNumberEnc) {
		List<DTO_InstructionsDetail> rv = null;
		if (String.isNotBlank(accountNumberEnc)) {
			String bpid = IGClientUtils.getClientBpid();
			if (String.isNotBlank(bpid)) {
				if (!IGClientUtils.isValidAccount(bpid, accountNumberEnc)) {
					throw new AuraHandledException('The account number is not associated with the client business partner id');
				}
				rv = IGClientService.getInstructionsDetails(bpid, accountNumberEnc);
			} else {
				throw new AuraHandledException('The client business partner id can\'t be null or blank');
			}
		} else {
			throw new AuraHandledException('The account number can\'t be null or blank');
		}
		return rv;
	}

	@AuraEnabled
	public static DTO_AccountPerformance getAccountPerformance(String accountNumberEnc) {
		DTO_AccountPerformance rv = null;
		if (String.isNotBlank(accountNumberEnc)) {
			String bpid = IGClientUtils.getClientBpid();
			if (String.isNotBlank(bpid)) {
				if (!IGClientUtils.isValidAccount(bpid, accountNumberEnc)) {
					throw new AuraHandledException('The account number is not associated with the client business partner id');
				}
				rv = IGClientService.getAccountPerformance(bpid, accountNumberEnc);
			} else {
				throw new AuraHandledException('The client business partner id can\'t be null or blank');
			}
		} else {
			throw new AuraHandledException('The account number can\'t be null or blank');
		}
		return rv;
	}
}