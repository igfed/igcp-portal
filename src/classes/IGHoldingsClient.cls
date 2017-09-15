public class IGHoldingsClient extends IGRestClient {
	private static final String RESOURCE_NAME 		= 'holdings';
	
	public String bpid 			{ get; set; }
	
	public IGHoldingsClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}
	
	public IGHoldingsClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}
	
	public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + RESOURCE_NAME;
    }    

    public override Response parseResponse(String responseBody) {
    	HoldingData rv = (HoldingData)System.JSON.deserializeStrict(responseBody, HoldingData.class);
    	return rv;
    }
    
    public class HoldingData extends IGRestClient.Response {
		public Client Client;
		
		public HoldingData(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}
	}
	
	public class Client extends IGRestClient.Entities {
		public List<Holding> Holding;
	}

	public class Holding {
		public String CLIENT_BPID;
		public String CLIENT_NUMBER;
		public String ACCOUNT_NUMBER;
		public String HOLDING_NUMBER;
		public String CONSULTANT_NUMBER;
		public String COMPANY;
		public String FUND_NUMBER;
		public String PRODUCT_NAME;
		public String LOAD_TYPE;
		public String SERIES;
		public String MARKET_VALUE_CAD;
		public String BOOK_COST_CAD;
		public String GAIN_LOSS_CAD;
		public String SETTLED_UNITS;
		public String CALC_PRICE;
		public String REPORTING_DATE;
		public String AS_OF_DATE;
		public String PURCHASE_DATE;
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
	}

}