public class IGInsuranceClient extends IGRestClient {
	private static final String RESOURCE_NAME 		= 'insurance';
    
    public String bpid 			{ get; set; }    
    
    public IGInsuranceClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}
	
	public IGInsuranceClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}
	
	public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + RESOURCE_NAME;
    }

    public override Response parseResponse(String responseBody) {
    	InsuranceData rv = (InsuranceData)System.JSON.deserializeStrict(responseBody, InsuranceData.class);
    	return rv;
    }
    
    public class InsuranceData extends IGRestClient.Response {
		public Client Client;
		
		public InsuranceData(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}
	}
	
	public class Client extends IGRestClient.Entities {
		public List<Insurance> Insurance;
	}

	public class Insurance {
		public String CLIENT_BPID;
		public String CLIENT_NUMBER;
		public String CONSULTANT_NUMBER;
		public String INSURANCE_TYPE;
		public String POLICY_STATUS;
		public String POLICY_TYPE;
		public String POLICY_NUMBER;
		public String CARRIER;
		public String COMPANY;
		public String INSURED;
		public String POLICY_OWNER;
		public String BENEFICIARY;
		public String ISSUE_DATE;
		public String RENEWAL_DATE;
		public String PLAN_TYPE;
		public String COVERAGE_AMOUNT;
		public String COVERAGE_CEASE_DATE;
		public String BENEFIT_AMOUNT;
		public String BENEFIT_FREQUENCY;
		public String WAITING_PERIOD;
		public String BENEFIT_PERIOD;
		public String BENEFIT_TAXABLE;
		public String OCCUPATION_CLASSIFICATION;
		public String OCCUPATION_DEFINITION;
		public String HOME_CARE;
		public String FAMILY_CARE_AMOUNT;
		public String FAMILY_CARE_FREQUENCY;
		public String PREMIUM_AMOUNT;
		public String PREMIUM_FREQUENCY;
		public String PAYER;
		public String EXPIRY_DATE;
	}

}