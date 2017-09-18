public class IGRestClientFactory {
	private static final String CUSTOMER_DETAILS 	= 'CustomerDetails';
	private static final String ACCOUNT_SUMMARY  	= 'AccountSummary';
	private static final String ACCOUNT_DETAILS  	= 'AccountDetails';
	private static final String ACCOUNT_PERFORMANCE = 'AccountPerformance';
	private static final String INSURANCE			= 'Insurance';
	private static final String MORTGAGE			= 'Mortgage';
	private static final String HOLDINGS			= 'Holdings';
	private static final String INVESTMENT_PROFILE	= 'InvestmentProfile';
	
    public static IGRestClient getIGRestClient(String clientType, String namedCredentialsName, 
    		IGRestClient.Language lang) {
    	IGRestClient rv = null;
    	if (String.isBlank(clientType)) {
    		throw new IGRestClientFactoryException('You must specify the client type.');
    	} else if (String.isBlank(namedCredentialsName)) {
    		throw new IGRestClientFactoryException('You must specify the named credential.');
    	}
    	
    	if (CUSTOMER_DETAILS == clientType) {
    		rv = new IGCustomerDetailsClient(namedCredentialsName, lang);
    	} else if (ACCOUNT_SUMMARY == clientType) {
    		rv = new IGAccountSummaryClient(namedCredentialsName, lang);
    	} else if (ACCOUNT_DETAILS == clientType) {
    		rv = new IGAccountDetailClient(namedCredentialsName, lang);
    	} else if (ACCOUNT_PERFORMANCE == clientType) {
    		rv = new IGAccountPerformanceClient(namedCredentialsName, lang);
    	} else if (INSURANCE == clientType) {
    		rv = new IGInsuranceClient(namedCredentialsName, lang);
    	} else if (MORTGAGE == clientType) {
    		rv = new IGMortgageClient(namedCredentialsName, lang);
    	} else if (HOLDINGS == clientType) {
    		rv = new IGHoldingsClient(namedCredentialsName, lang);
    	} else if (INVESTMENT_PROFILE == clientType) {
    		rv = new IGInvestmentProfileClient(namedCredentialsName, lang);
    	}
    	//add more REST client types here when needed...	
    	
    	return rv;			
    }
    
    public static IGRestClient getIGRestClient(String clientType, String namedCredentialsName) {
    	return IGRestClientFactory.getIGRestClient(clientType, namedCredentialsName, null);
    }
    
    public class IGRestClientFactoryException extends Exception {}
}