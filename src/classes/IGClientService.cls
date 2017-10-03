public class IGClientService {
	public static List<DTO_AccountSummary> getAccountSummaries(String clientBpid) {
		List<DTO_AccountSummary> rv = new List<DTO_AccountSummary>();
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('AccountSummary', 'IG_Client_Service');
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
					summaryDTO.gainLossCad, summaryDTO.dealerName);
			rv.addPreviewItem(item);
		}
		return rv;
	}

	public static DTO_InsurancePreview getInsurancePreview(String clientBpid) {
		DTO_InsurancePreview rv = new DTO_InsurancePreview();
		List<DTO_InsuranceDetail> insDetailDTOList = getInsuranceDetails(clientBpid);
		for (DTO_InsuranceDetail insDTO : insDetailDTOList) {
			DTO_InsurancePreviewItem item = new DTO_InsurancePreviewItem(insDTO.insuranceType, insDTO.policyType, insDTO.policyNumber, 
					insDTO.company, Double.valueOf(insDTO.coverageAmount));
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

	public static List<DTO_AccountDetail> getAccountDetails(String clientBpid) {
		List<DTO_AccountDetail> rv = new List<DTO_AccountDetail>();
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('AccountDetails', 'IG_Client_Service');
		if (client != null) {
		    IGAccountDetailClient theClient = (IGAccountDetailClient)client;
		    theClient.bpid = clientBpid;
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
		            	for (IGAccountDetailClient.AccountDetail acctDetail : data.Client.AccountDetails) {
		            		rv.add(new DTO_AccountDetail(acctDetail));
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
		IGRestClient client = IGRestClientFactory.getIGRestClient('Insurance', 'IG_Client_Service');
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
		IGRestClient client = IGRestClientFactory.getIGRestClient('Mortgage', 'IG_Client_Service');
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

	public static List<DTO_AssetMixDetail> getAssetMixDetails(String clientBpid) {
		List<DTO_AssetMixDetail> rv = new List<DTO_AssetMixDetail>();
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('AssetMix', 'IG_Client_Service');
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

	public static List<DTO_TransactionsDetail> getTransactionsDetails(String clientBpid) {
		List<DTO_TransactionsDetail> rv = new List<DTO_TransactionsDetail>();
		if (String.isBlank(clientBpid)) {
			throw new IGClientServiceException('The client bpid can\'t be null or empty');
		}
		IGRestClient client = IGRestClientFactory.getIGRestClient('Transactions', 'IG_Client_Service');
		if (client != null) {
			IGTransactionsClient theClient = (IGTransactionsClient)client;
			theClient.bpid = clientBpid;
			IGRestClient.Response res = theClient.getServiceData();
		    System.debug('=====> getTransactionsDetails.res: ' + res);
		    if (res != null) {
		    	
		    }
		}
		return rv;
	}

	public class IGClientServiceException extends Exception {

	}
}