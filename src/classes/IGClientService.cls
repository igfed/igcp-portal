public class IGClientService {
	private static final String WEBSERVICE_NAMED_CREDENTIAL = X360_Data_Services__c.getOrgDefaults().Service_Named_Credential__c;

	public static List<DTO_AccountSummary> getAccountSummaries(String clientBpid) {
		List<DTO_AccountSummary> rv = new List<DTO_AccountSummary>();
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('AccountSummary', WEBSERVICE_NAMED_CREDENTIAL);
		if (client != null) {
		    IGAccountSummaryClient theClient = (IGAccountSummaryClient)client;
		    theClient.bpid = clientBpid;
		    IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getAccountSummaries.res: ' + res);
		    if (res != null) {
		        if (!res.success) {
		            System.debug('=====> getAccountSummaries.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		            throw new IGClientServiceException('Service call failed: ' + res.success + ', ' + res.code + ', ' + res.error);
		        } else {
		            IGAccountSummaryClient.AccountData data = (IGAccountSummaryClient.AccountData)res;
		            System.debug('=====> getAccountSummaries.data: ' + data);
		            if (data.Client != null && data.Client.AccountSummaries != null && !data.Client.AccountSummaries.isEmpty()) {
		            	for (IGAccountSummaryClient.AccountSummary acctSumm : data.Client.AccountSummaries) {
		            		rv.add(new DTO_AccountSummary(acctSumm));
		            	}
		            }
		        } 
		    }
		}
		return rv;
	}

	public static DTO_InvestmentsPreview getInvestmentsPreview(String clientBpid) {
		DTO_InvestmentsPreview rv = new DTO_InvestmentsPreview();
		List<DTO_AccountSummary> acctSummaryDTOList = IGClientService.getAccountSummaries(clientBpid);
		for (DTO_AccountSummary summaryDTO : acctSummaryDTOList) {
			DTO_InvestmentsPreviewItem item = new DTO_InvestmentsPreviewItem(summaryDTO.accountNumber, summaryDTO.marketValueCad, 
					summaryDTO.gainLossCad, summaryDTO.dealerName, summaryDTO.registrationType);
			if (String.isNotBlank(summaryDTO.accountTypeLabel)) {
				item.accountName = summaryDTO.accountTypeLabel + ' - ' + summaryDTO.accountNumber;
			}
			rv.addPreviewItem(item);
		}
		return rv;
	}

	public static DTO_InsurancePreview getInsurancePreview(String clientBpid) {
		DTO_InsurancePreview rv = new DTO_InsurancePreview();
		List<DTO_InsuranceDetail> insDetailDTOList = getInsuranceDetails(clientBpid);
		for (DTO_InsuranceDetail insDTO : insDetailDTOList) {
			DTO_InsurancePreviewItem item = new DTO_InsurancePreviewItem(insDTO.insuranceType, insDTO.policyType, insDTO.policyNumber, 
					insDTO.company, String.isNotBlank(insDTO.coverageAmount) ? Double.valueOf(insDTO.coverageAmount) : null);
			rv.addPreviewItem(item);
		}
		return rv;
	}

	public static DTO_MortgagePreview getMortgagePreview(String clientBpid) {
		DTO_MortgagePreview rv = new DTO_MortgagePreview();
		List<DTO_MortgageDetail> mtgDetailDTOList = getMortgageDetails(clientBpid);
		for (DTO_MortgageDetail mtgDTO : mtgDetailDTOList) {
			DTO_MortgagePreviewItem item = new DTO_MortgagePreviewItem(mtgDTO.product, mtgDTO.loanNum, mtgDTO.branchId, 
					Double.valueOf(mtgDTO.interestRate), Double.valueOf(mtgDTO.loanBalance));
			rv.addPreviewItem(item);
		}
		return rv;
	}

	public static DTO_AccountDetail getAccountDetails(String clientBpid, String accountNumberEnc) {
		DTO_AccountDetail rv = null;
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		String accNumber = IGClientUtils.getAccountNumberFromEnc(accountNumberEnc);
		if (String.isBlank(accNumber)) {
			throw new IGClientServiceException('Account number not found');	
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('AccountDetails', WEBSERVICE_NAMED_CREDENTIAL);
		if (client != null) {
		    IGAccountDetailClient theClient = (IGAccountDetailClient)client;
		    theClient.bpid = clientBpid;
		    theClient.accountNumber = accNumber;
		    IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getAccountDetails.res: ' + res);
		    if (res != null) {
		        if (!res.success) {
		            System.debug('=====> getAccountDetails.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		            throw new IGClientServiceException('Service call failed: ' + res.success + ', ' + res.code + ', ' + res.error);
		        } else {
		            IGAccountDetailClient.AccountDetailData data = (IGAccountDetailClient.AccountDetailData)res;
		            System.debug('=====> getAccountDetails.data: ' + data);
		            if (data.Client != null && data.Client.AccountDetails != null && !data.Client.AccountDetails.isEmpty()) {
		            	if (data.Client.AccountDetails.size() == 1) {
		            		rv = new DTO_AccountDetail(data.Client.AccountDetails.get(0));
		            	} else {
			            	for (IGAccountDetailClient.AccountDetail acctDetail : data.Client.AccountDetails) {
			            		if (accNumber == acctDetail.ACCOUNT_NUMBER) {
			            			rv = new DTO_AccountDetail(acctDetail);
			            			break;
			            		}
			            	}
		            	}
		            }
		        } 
		    }
		}
		return rv;
	}

	public static DTO_InvestmentProfile getInvestmentProfileDTO(String clientBpid, String accountNumberEnc) {
		DTO_InvestmentProfile rv = null;
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client business partner id can\'t be null or blank');
		}
		String accNumber = IGClientUtils.getAccountNumberFromEnc(accountNumberEnc);
		if (String.isBlank(accNumber)) {
			throw new IGClientServiceException('Account number bot found');	
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('InvestmentProfile', WEBSERVICE_NAMED_CREDENTIAL);
		if (client != null) {
			IGInvestmentProfileClient theClient = (IGInvestmentProfileClient)client;
			theClient.bpid = clientBpid;
			theClient.accountNumber = accNumber;
			IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getAccountDetails.res: ' + res);
		    if (res != null) {
		    	if (!res.success) {
		            System.debug('=====> getInvestmentProfileDTO.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		            throw new IGClientServiceException('Service call failed: ' + res.success + ', ' + res.code + ', ' + res.error);
		        } else {
		        	IGInvestmentProfileClient.InvestmentProfileData data = (IGInvestmentProfileClient.InvestmentProfileData)res;
		        	System.debug('=====> getInvestmentProfileDTO.data: ' + data);
		        	if (data.Client != null && data.Client.InvestmentProfiles != null && !data.Client.InvestmentProfiles.isEmpty()) {
		        		if (data.Client.InvestmentProfiles.size() == 1) {
		        			rv = new DTO_InvestmentProfile(data.Client.InvestmentProfiles.get(0));
		        		} else {
		        			for (IGInvestmentProfileClient.InvestmentProfile profile : data.Client.InvestmentProfiles) {
		        				if (accNumber == profile.ACCOUNT_NUMBER) {
		        					rv = new DTO_InvestmentProfile(profile);	
		        					break;
		        				}
		        			}
		        		}
		        	}
		        }
		    }
		}
		return rv;
	}

	public static List<DTO_HoldingsDetail> getHoldings(String clientBpid, String accountNumberEnc) {
		List<DTO_HoldingsDetail> rv = new List<DTO_HoldingsDetail>();
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client business partner id can\'t be null or blank');
		}
		String accNumber = IGClientUtils.getAccountNumberFromEnc(accountNumberEnc);
		if (String.isBlank(accNumber)) {
			throw new IGClientServiceException('Account number bot found');	
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('Holdings', WEBSERVICE_NAMED_CREDENTIAL);
		if (client != null) {
			IGHoldingsClient theClient = (IGHoldingsClient)client;
			theClient.bpid = clientBpid;
			theClient.accountNumber = accNumber;
			IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getHoldingsDetailDTO.res: ' + res);
		    if (res != null) {
		    	if (!res.success) {
		            System.debug('=====> getHoldingsDetailDTO.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		            throw new IGClientServiceException('Service call failed: ' + res.success + ', ' + res.code + ', ' + res.error);
		        } else {
		        	IGHoldingsClient.HoldingData data = (IGHoldingsClient.HoldingData)res;
		        	System.debug('=====> getHoldingsDetailDTO.data: ' + data);
		        	if (data.Client != null && data.Client.Holdings != null && !data.Client.Holdings.isEmpty()) {
	        			for (IGHoldingsClient.Holding holding : data.Client.Holdings) {
	        				if (accNumber == holding.ACCOUNT_NUMBER) {
	        					rv.add(new DTO_HoldingsDetail(holding));
	        				}
	        			}
		        	}
		        }
		    }
		}
		return rv;
	}

	public static List<DTO_InsuranceDetail> getInsuranceDetails(String clientBpid) {
		List<DTO_InsuranceDetail> rv = new List<DTO_InsuranceDetail>();
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('Insurance', WEBSERVICE_NAMED_CREDENTIAL);
		if (client != null) {
		    IGInsuranceClient theClient = (IGInsuranceClient)client;
		    theClient.bpid = clientBpid;
		    IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getInsuranceDetails.res: ' + res);
		    if (res != null) {
		        if (!res.success) {
		            System.debug('=====> getInsuranceDetails.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		            throw new IGClientServiceException('Service call failed: ' + res.success + ', ' + res.code + ', ' + res.error);
		        } else {
		            IGInsuranceClient.InsuranceData data = (IGInsuranceClient.InsuranceData)res;
		            System.debug('=====> getInsuranceDetails.data: ' + data);
		            if (data.Client != null && data.Client.InsurancePolicies != null && !data.Client.InsurancePolicies.isEmpty()) {
		            	for (IGInsuranceClient.Insurance insurance : data.Client.InsurancePolicies) {
		            		rv.add(new DTO_InsuranceDetail(insurance));
		            	}
		            }
		        } 
		    }
		}
		return rv;
	}

	public static List<DTO_MortgageDetail> getMortgageDetails(String clientBpid) {
		List<DTO_MortgageDetail> rv = new List<DTO_MortgageDetail>();
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('Mortgage', WEBSERVICE_NAMED_CREDENTIAL);
		if (client != null) {
		    IGMortgageClient theClient = (IGMortgageClient)client;
		    theClient.bpid = clientBpid;
		    IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getMortgageDetails.res: ' + res);
		    if (res != null) {
		        if (!res.success) {
		            System.debug('=====> getMortgageDetails.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		            throw new IGClientServiceException('Service call failed: ' + res.success + ', ' + res.code + ', ' + res.error);
		        } else {
		            IGMortgageClient.MortgageData data = (IGMortgageClient.MortgageData)res;
		            System.debug('=====> getMortgageDetails.data: ' + data);
		            if (data.Client != null && data.Client.Loans != null && !data.Client.Loans.isEmpty()) {
		            	for (IGMortgageClient.Loans loan : data.Client.Loans) {
		            		rv.add(new DTO_MortgageDetail(loan));
		            	}
		            }
		        } 
		    }
		}
		return rv;
	}

	public static DTO_MortgageDetail getMortgageDetails(String clientBpid, String loanNumber) {
		DTO_MortgageDetail rv = null;
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		if (String.isBlank(loanNumber)) {
			throw new IGClientServiceException('The loan number can\'t be null or empty');	
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('Mortgage', WEBSERVICE_NAMED_CREDENTIAL);
		if (client != null) {
			IGMortgageClient theClient = (IGMortgageClient)client;
			theClient.bpid = clientBpid;
			theClient.loanNumber = loanNumber;
			IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getMortgageDetails.res: ' + res);
		    if (res != null) {
		    	if (!res.success) {
		    		System.debug('=====> getMortgageDetails.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		            throw new IGClientServiceException('Service call failed: ' + res.success + ', ' + res.code + ', ' + res.error);
	            } else {
					IGMortgageClient.MortgageData data = (IGMortgageClient.MortgageData)res;
		            System.debug('=====> getMortgageDetails.data: ' + data);
		            if (data.Client != null && data.Client.Loans != null && !data.Client.Loans.isEmpty()) {
		            	if (data.Client.Loans.size() == 1) {
		            		rv = new DTO_MortgageDetail(data.Client.Loans.get(0));
		            	} else {
		            		for (IGMortgageClient.Loans loan : data.Client.Loans) {
		            			if (loanNumber == loan.LOAN_NUM) {
		            				rv = new DTO_MortgageDetail(loan);
		            				break;
		            			}
		            		}
		            	}
		            }		            	
	            }
		    }
		}
		return rv;
	}

	public static List<DTO_AssetMixDetail> getAssetMixDetails(String clientBpid) {
		List<DTO_AssetMixDetail> rv = new List<DTO_AssetMixDetail>();
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('AssetMix', WEBSERVICE_NAMED_CREDENTIAL);
		if (client != null) {
			IGAssetMixClient theClient = (IGAssetMixClient)client;
			theClient.bpid = clientBpid;
			IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getAssetMixDetails.res: ' + res);
		    if (res != null) {
		    	if (!res.success) {
		    		System.debug('=====> getMortgageDetails.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		            throw new IGClientServiceException('Service call failed: ' + res.success + ', ' + res.code + ', ' + res.error);
	            } else {
	            	IGAssetMixClient.AssetMixData data = (IGAssetMixClient.AssetMixData)res;
	            	System.debug('=====> getAssetMixDetails.data: ' + data);
	            	if (data.Client != null && data.Client.AssetMixes != null && !data.Client.AssetMixes.isEmpty()) {
	            		for (IGAssetMixClient.AssetMixes assetMix : data.Client.AssetMixes) {
	            			rv.add(new DTO_AssetMixDetail(assetMix));
	            		}
	            	}
	            }
		    }
		}
		return rv;
	}

	public static DTO_AssetMixAggregate getAssetMixAggregate(String clientBpid) {
		DTO_AssetMixAggregate rv = null;
		if (String.isNotBlank(clientBpid)) {
			rv = new DTO_AssetMixAggregate(clientBpid);
			List<DTO_AssetMixDetail> assetMixDetailsList = IGClientService.getAssetMixDetails(clientBpid);
			if (assetMixDetailsList != null && !assetMixDetailsList.isEmpty()) {
				for (DTO_AssetMixDetail detail : assetMixDetailsList) {
					rv.addAssetMixDetail(detail);
				}
			}
		}
		return rv;
	}

	public static List<DTO_TransactionsDetail> getTransactionsDetails(String clientBpid, String accountNumberEnc) {
		List<DTO_TransactionsDetail> rv = new List<DTO_TransactionsDetail>();
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		String accNumber = IGClientUtils.getAccountNumberFromEnc(accountNumberEnc);
		if (String.isBlank(accNumber)) {
			throw new IGClientServiceException('Account number bot found');	
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('Transactions', WEBSERVICE_NAMED_CREDENTIAL);
		if (client != null) {
			IGTransactionsClient theClient = (IGTransactionsClient)client;
			theClient.bpid = clientBpid;
			theClient.accountNumber = accNumber;
			IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getTransactionsDetails.res: ' + res);
		    if (res != null) {
		    	if (!res.success) {
		    		System.debug('=====> getTransactionsDetails.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		            throw new IGClientServiceException('Service call failed: ' + res.success + ', ' + res.code + ', ' + res.error);
	            } else {
	            	IGTransactionsClient.TransactionsData data = (IGTransactionsClient.TransactionsData)res;
	            	System.debug('=====> getTransactionsDetails.data: ' + data);
	            	if (data.Client != null && data.Client.Transactions != null && data.Client.Transactions.isEmpty()) {
	            		for (IGTransactionsClient.Transactions txn : data.Client.Transactions) {
	            			rv.add(new DTO_TransactionsDetail(txn));
	            		}
	            	}
	            }
		    }
		}
		return rv;
	}

	public static List<DTO_InstructionsDetail> getInstructionsDetails(String clientBpid, String accountNumberEnc) {
		List<DTO_InstructionsDetail> rv = new List<DTO_InstructionsDetail>();
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		String accNumber = IGClientUtils.getAccountNumberFromEnc(accountNumberEnc);
		if (String.isBlank(accNumber)) {
			throw new IGClientServiceException('Account number bot found');	
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('Instructions', WEBSERVICE_NAMED_CREDENTIAL);
		if (client != null) {
			IGInstructionsClient theClient = (IGInstructionsClient)client;
			theClient.bpid = clientBpid;
			theClient.accountNumber = accNumber;
			IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getInstructionsDetails.res: ' + res);
		    if (res != null) {
		    	if (!res.success) {
		    		System.debug('=====> getInstructionsDetails.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		            throw new IGClientServiceException('Service call failed: ' + res.success + ', ' + res.code + ', ' + res.error);
	            } else {
	            	IGInstructionsClient.InstructionsData data = (IGInstructionsClient.InstructionsData)res;
	            	System.debug('=====> getInstructionsDetails.data: ' + data);
	            	if (data.Client != null && data.Client.Instructions != null && !data.Client.Instructions.isEmpty()) {
	            		for (IGInstructionsClient.Instructions inst : data.Client.Instructions) {
	            			rv.add(new DTO_InstructionsDetail(inst));
	            		}
	            	}
	            }
		    }
		}
		return rv;
	}

	public static DTO_AccountPerformance getAccountPerformance(String clientBpid, String accountNumberEnc) {
		DTO_AccountPerformance rv = null;
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		String accNumber = IGClientUtils.getAccountNumberFromEnc(accountNumberEnc);
		if (String.isBlank(accNumber)) {
			throw new IGClientServiceException('Account number bot found');	
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('AccountPerformance', WEBSERVICE_NAMED_CREDENTIAL);
		if (client != null) {
			IGAccountPerformanceClient theClient = (IGAccountPerformanceClient)client;
			theClient.bpid = clientBpid;
			theClient.accountNumber = accNumber;
			IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getAccountPerformance.res: ' + res);
		    if (res != null) {
		    	if (!res.success) {
		    		System.debug('=====> getAccountPerformance.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		            throw new IGClientServiceException('Service call failed: ' + res.success + ', ' + res.code + ', ' + res.error);
	            } else {
	            	IGAccountPerformanceClient.AccountPerformanceData data = (IGAccountPerformanceClient.AccountPerformanceData)res;
	            	System.debug('=====> getAccountPerformance.data: ' + data);
	            	if (data.Client != null && data.Client.AccountPerformances != null && !data.Client.AccountPerformances.isEmpty()) {
	            		for (IGAccountPerformanceClient.AccountPerformance perf : data.Client.AccountPerformances) {
	            			if (accNumber == perf.ACCOUNT_NUMBER) {
	            				rv = new DTO_AccountPerformance(perf);
	            				break;
	            			}
	            		}
	            	}
	            }
		    }
		}
		return rv;
	}

	public static List<DTO_ClientRegistration> getClientRegistrations(String dateOfBirth, String postalCode, String identityNumber) {
		List<DTO_ClientRegistration> rv = new List<DTO_ClientRegistration>();
		if (String.isBlank(dateOfBirth)) {
			throw new IGClientServiceException('The client date of birth can\'t be null or empty');
		}
		if (String.isBlank(postalCode)) {
			throw new IGClientServiceException('The client postal code can\'t be null or empty');	
		}
		if (String.isBlank(identityNumber)) {
			throw new IGClientServiceException('The client identity number can\'t be null or empty');	
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('ClientRegistration', WEBSERVICE_NAMED_CREDENTIAL);
		if (client != null) {
			IGClientRegistrationClient theClient = (IGClientRegistrationClient)client;
			theClient.dateOfBirth 	 = dateOfBirth.trim();
			theClient.postalCode 	 = postalCode.remove(' ').trim();
			theClient.identityNumber = identityNumber.trim();
			IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getClientRegistrations.res: ' + res);
		    if (res != null) {
		    	if (!res.success) {
		    		System.debug('=====> getClientRegistrations.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		            throw new IGClientServiceException('Service call failed: ' + res.success + ', ' + res.code + ', ' + res.error);
	            } else {
	            	IGClientRegistrationClient.ClientRegistrationData data = (IGClientRegistrationClient.ClientRegistrationData)res;
	            	System.debug('=====> getClientRegistrations.data: ' + data);
	            	if (data.client != null && data.client.registrationMatches != null && !data.client.registrationMatches.isEmpty()) {
	            		for (IGClientRegistrationClient.RegistrationMatches aMatch : data.client.registrationMatches) {
	            			rv.add(new DTO_ClientRegistration(aMatch));
	            		}
	            	}
	            }
		    }
		}
		return rv;
	}

	public class IGClientServiceException extends Exception {

	}
}