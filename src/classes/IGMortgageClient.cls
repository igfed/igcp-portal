public class IGMortgageClient extends IGRestClient {
	private static final String RESOURCE_NAME 		= 'mortgages';
	
	public String bpid 			{ get; set; }    
    
    public IGMortgageClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}
	
	public IGMortgageClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}
	
	public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + RESOURCE_NAME;
    }

    public override Response parseResponse(String responseBody) {
    	MortgageData rv = (MortgageData)System.JSON.deserializeStrict(responseBody, MortgageData.class);
    	return rv;
    }
    
    public class MortgageData extends IGRestClient.Response {
		public Mortgage Mortgage;
		
		public MortgageData(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}
	}

	public class Mortgage extends IGRestClient.Entities {
		public List<Loans> Loans;
	}
    
    public class Loans {
		public String CLIENT_BPID;
		public String CONSULTANT_NUMBER;
		public String LOAN_NUM;
		public String PRODUCT;
		public String COMPANY;
		public String BRANCH_ID;
		public String BRANCH_NAME;
		public String BORROWER_NAME;
		public String COBORROWER_NAME;
		public String BORROWER_COUNT;
		public String GUARANTOR_NAME;
		public String LOAN_BALANCE;
		public String INTEREST_RATE;
		public String LAST_RENEWAL_DATE;
		public String MATURITY_DATE;
		public String PAYMENT_FREQUENCY;
		public String REMAINING_AMORTIZATION_TERM;
		public String REMAINING_TIME;
		public String PAYMENT_AMOUNT;
		public String TAX_AMOUNT;
		public String PAYMENT_AND_TAX_AMOUNT;
		public String LAST_PAYMENT_DATE;
		public String NEXT_PAYMENT_DATE;
		public String LOAN_AMOUNT;
		public String APPRAISAL_VALUE;
		public String FUNDING_DATE;
		public String ORIGINAL_AMORTIZATION_TERM;
		public String TRANSIT_NUMBER;
		public String ACCOUNT_OWNER;
		public String ACCOUNT_NUMBER;
		public String PROPERTY_ADDRESS;
		public String PROPERTY_CITY;
		public String PROPERTY_PROVINCE;
		public String PROPERTY_POSTAL_CODE;
		public String MORTGAGE_LIFE_INSURANCE;
		public String DATA_EFFECTIVE_DATE;
		public String PAID_OFF_INDICATOR;
		public String REFINANCE_INDICATOR;
		public String LOAN_CLASS_DESC;
		public String PROPERTY_TYPE_DESC;
	}

}