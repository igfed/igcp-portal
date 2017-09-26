public class IGAccountDetailClient extends IGRestClient {
	private static final String RESOURCE_NAME 		= 'accounts';
	private static final String END_POINT_DETAILS 	= 'details';
	
	public String bpid 			{ get; set; }
	public String accountNumber { get; set; }
	
	public IGAccountDetailClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}
	
	public IGAccountDetailClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}	    
	
	public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + RESOURCE_NAME + 
    			'/' + accountNumber.trim() + '/' + END_POINT_DETAILS;
    }

    public override Response parseResponse(String responseBody) {
    	AccountDetailData rv = null;
    	String jsonString = responseBody.replace('"CURRENCY":', '"CURRENCY_X":');
    	rv = (AccountDetailData)System.JSON.deserializeStrict(jsonString, AccountDetailData.class);
    	return rv;
    }
    	
	public class AccountDetailData extends IGRestClient.Response {
		public Client Client;
		
		public AccountDetailData(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}
	}

	public class Client extends IGRestClient.Entities {
		public List<AccountDetail> AccountDetails;
	}			
	
	public class AccountDetail {
		public String CLIENT_BPID;
		public String CLIENT_NUMBER;
		public String ACCOUNT_NUMBER;
		public String CONSULTANT_NUMBER;
		public String ACCOUNT_TYPE;
		public String ACCOUNT_TYPE_LABEL;
		public String REGISTRATION_TYPE;
		public String DEALER_NUMBER;
		public String DEALER_NAME;
		public String SOURCE_SYSTEM;
		public String REPORTING_DATE;
		public String AS_OF_DATE;
		public String BALANCE_DATE;
		public String PURCHASE_DATE;
		public String MARKET_VALUE_CAD;
		public String BOOK_COST_CAD;
		public String GAIN_LOSS_CAD;
		public String NET_CONTRIBUTIONS;
		public String TOTAL_CONTRIBUTED_AMOUNT;
		public String TOTAL_REDEEMED_AMOUNT;
		public String TOTAL_DISTRIBUTED_AMOUNT;
		public String TOTAL_REINVESTED_AMOUNT;
		public String NET_CONTRIBUTIONS_YTD;
		public String NET_WITHDRAWALS_YTD;
		public String NET_TRANSFERS_IN_YTD;
		public String NET_TRANSFERS_OUT_YTD;
		public String NET_CONTRIBUTIONS_INCEPTION;
		public String NET_WITHDRAWALS_INCEPTION;
		public String NET_TRANSFERS_IN_INCEPTION;
		public String NET_TRANSFERS_OUT_INCEPTION;
		public String BENEFICIARY_NAMES;
		public String IPROFILE_MODEL_NUMBER;
		public String CURRENCY_X; //has to be renamed since CURRENCY is a reserved keyword in Apex
	}	
}