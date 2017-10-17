public class IGTransactionsClient extends IGRestClient {
	private static final String RESOURCE_NAME 				= 'transactions';
	private static final String QRY_PARAM_ACCOUNT_NUMBER 	= 'ACCOUNT_NUMBER';

	public String bpid 			{ get; set; }
	public String accountNumber { get; set; } 

	public IGTransactionsClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}

	public IGTransactionsClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}

	public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + RESOURCE_NAME + 
    			(String.isNotBlank(accountNumber) ? ('?' + QRY_PARAM_ACCOUNT_NUMBER + '=' + accountNumber.trim()) : '');
    }

    public override Response parseResponse(String responseBody) {
    	String jsonString = responseBody.replace('"CURRENCY":', '"CURRENCY_X":');
    	TransactionsData rv = (TransactionsData)System.JSON.deserializeStrict(jsonString, TransactionsData.class);
    	return rv;
    }

    public class TransactionsData extends IGRestClient.Response {
		public Client Client;

		public TransactionsData(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}
	}

	public class Client extends IGRestClient.Entities {
		public List<Transactions> Transactions;
	}

	public class Transactions {
		public String CLIENT_BPID;
		public String CLIENT_NUMBER;
		public String ACCOUNT_NUMBER;
		public String ACCOUNT_TYPE;
		public String ACCOUNT_TYPE_LABEL;
		public String HOLDING_NUMBER;
		public String HOLDING_NAME;
		public String SOURCE_SYSTEM;
		public String TRANSACTION_DATE;
		//public String TRANSACTION_TYPE;
		//public String TRANSACTION_TYPE_LABEL;
		public String ACTIVITY;
		public String UNIT_PRICE;
		public String UNITS;
		public String NET_AMOUNT;
		public String TRANSACTION_CHARGE;
		public String TAXES;
		public String GROSS_AMOUNT;
		public String CURRENCY_X;
		public String EXCHANGE_RATE;
	}

}