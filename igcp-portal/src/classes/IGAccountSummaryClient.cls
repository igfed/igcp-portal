public with sharing class IGAccountSummaryClient extends IGRestClient {
	private static final String RESOURCE_NAME = 'accountSummary';
	
	public String bpid { get; set; }
	
	public IGAccountSummaryClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}
	
	public IGAccountSummaryClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}
	
	public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + RESOURCE_NAME;
    }

    public override Response parseResponse(String responseBody) {
    	AccountData rv = (AccountData)System.JSON.deserializeStrict(responseBody, AccountData.class);
    	return rv;
    }
    
    public class AccountData extends IGRestClient.Response {
    	public Client Client;    
    	
    	public AccountData(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}	    	
    }
    
    public class Client extends IGRestClient.Entities {
		public List<AccountSummary> AccountSummaries;
	}
    
    public class AccountSummary {
    	public String CLIENT_BPID;
    	public String CLIENT_NUMBER;
    	public String ACCOUNT_NUMBER;
    	public String ACCOUNT_TYPE;
    	public String ACCOUNT_TYPE_LABEL;
    	public String CONSULTANT_NUMBER;
    	public String DEALER_NUMBER;
    	public String DEALER_NAME;
    	public String SOURCE_SYSTEM;
    	public String REGISTRATION_TYPE;
    	public Double MARKET_VALUE_CAD;
    	public Double BOOK_COST_CAD;
    	public Double GAIN_LOSS_CAD;
    	public Date   REPORTING_DATE;
    	public Date   AS_OF_DATE;
    }
	    
}