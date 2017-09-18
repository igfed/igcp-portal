public class IGInvestmentProfileClient extends IGRestClient {
	private static final String RESOURCE_NAME 		= 'investmentProfile';
	
	public String bpid 			{ get; set; }
	
	public IGInvestmentProfileClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}
	
	public IGInvestmentProfileClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}
	
	public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + RESOURCE_NAME;
    }

    public override Response parseResponse(String responseBody) {
    	InvestmentProfileData rv = (InvestmentProfileData)System.JSON.deserializeStrict(responseBody, 
    					InvestmentProfileData.class);
    	return rv;
    }
    
    public class InvestmentProfileData extends IGRestClient.Response {
		public Client Client;
		
		public InvestmentProfileData(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}
	}

	public class Client extends IGRestClient.Entities {
		public List<InvestmentProfile> InvestmentProfile;
	}
	
	public class InvestmentProfile {
		public String CLIENT_BPID;
		public String CLIENT_NUMBER;
		public String ACCOUNT_NUMBER;
		public String SOURCE_SYSTEM;
		public String INVESTMENT_PROFILE;
		public String INVESTMENT_OBJECTIVE;
		public String RISK_TOLERANCE;
		public String INVESTMENT_TIME_HORIZON;
	}

}