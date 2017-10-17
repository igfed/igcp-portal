public class IGInstructionsClient extends IGRestClient {
	private static final String RESOURCE_NAME 				= 'instructions';
	private static final String QRY_PARAM_ACCOUNT_NUMBER 	= 'ACCOUNT_NUMBER';

	public String bpid 			{ get; set; }
	public String accountNumber { get; set; } 

	public IGInstructionsClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}

	public IGInstructionsClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}

	public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + RESOURCE_NAME + 
    			(String.isNotBlank(accountNumber) ? ('?' + QRY_PARAM_ACCOUNT_NUMBER + '=' + accountNumber.trim()) : '');
    }

    public override Response parseResponse(String responseBody) {
    	InstructionsData rv = (InstructionsData)System.JSON.deserializeStrict(responseBody, InstructionsData.class);
    	return rv;
    }

    public class InstructionsData extends IGRestClient.Response {
		public Client Client;

		public InstructionsData(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}
	}

	public class Client extends IGRestClient.Entities {
		public List<Instructions> Instructions;
	}

	public class Instructions {
		public String CLIENT_BPID;
		public String CLIENT_NUMBER;
		public String ACCOUNT_NUMBER;
		public String ACCOUNT_TYPE;
		public String ACCOUNT_TYPE_LABEL;
		public String HOLDING_NUMBER;
		public String HOLDING_NAME;
		public String INSTRUCTION_TYPE;
		public String INSTRUCTION_TYPE_LABEL;
		public String FREQUENCY;
		public String NET_AMOUNT_CAD;
		public String GROSS_AMOUNT_CAD;
		public String NEXT_TRANSACTION_DATE;
		public String START_DATE;
		public String END_DATE;
	}
}