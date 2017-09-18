public class IGAccountPerformanceClient extends IGRestClient {
    private static final String RESOURCE_NAME 		= 'accountPerformance';
    
    public String bpid 			{ get; set; }
    
    public IGAccountPerformanceClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}
	
	public IGAccountPerformanceClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}
	
	public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + RESOURCE_NAME;
    }

    public override Response parseResponse(String responseBody) {
    	AccountPerformanceData rv = (AccountPerformanceData)System.JSON.deserializeStrict(responseBody, 
    			AccountPerformanceData.class);
    	return rv;
    }
    
    public class AccountPerformanceData extends IGRestClient.Response {
		public Client Client;
		
		public AccountPerformanceData(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}
	}

	public class Client extends IGRestClient.Entities {
		public List<AccountPerformance> AccountPerformance;
	}

	public class AccountPerformance {
		public String CLIENT_BPID;
		public String CLIENT_NUMBER;
		public String ACCOUNT_NUMBER;
		public String OPENING_VALUE_YTD;
		public String CLOSING_VALUE_YTD;
		public String STARTING_YTD;
		public String OPENING_VALUE_1YR;
		public String CLOSING_VALUE_1YR;
		public String STARTING_1YR;
		public String OPENING_VALUE_3YR;
		public String CLOSING_VALUE_3YR;
		public String STARTING_3YR;
		public String OPENING_VALUE_5YR;
		public String CLOSING_VALUE_5YR;
		public String STARTING_5YR;
		public String OPENING_VALUE_INCEPTION;
		public String CLOSING_VALUE_INCEPTION;
		public String STARTING_INCEPTION;
	}
}