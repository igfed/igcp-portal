public class IGTransactionsClient extends IGRestClient {
	private static final String RESOURCE_NAME 		= 'transactions';

	public String bpid 			{ get; set; } 

	public IGTransactionsClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}

	public IGTransactionsClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}

	public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + RESOURCE_NAME;
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
		public String 	CLIENT_BPID;
		public String 	CLIENT_NUMBER;
		public String 	ACCOUNT_NUMBER;
		public String 	ACCOUNT_TYPE;
		public String 	ACCOUNT_TYPE_LABEL;
		public String 	HOLDING_NUMBER;
		public String 	HOLDING_NAME;
		public String 	SOURCE_SYSTEM;
		public String 	TRANSACTION_DATE;
		public String 	ACTIVITY;
		public Double 	UNIT_PRICE;
		public Integer 	UNITS;
		public Double 	NET_AMOUNT;
		public Double 	TRANSACTION_CHARGE;
		public Double 	TAXES;
		public Double 	GROSS_AMOUNT;
		public String 	CURRENCY_X; //has to be renamed since CURRENCY is a reserved keyword in Apex
		public Double 	EXCHANGE_RATE;
	}

}