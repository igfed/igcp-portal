public class IGCustomerDetailsClient extends IGRestClient {
	public String bpid 			{ get; set; }
	public String resourceName 	{ get; set; }
	
	public IGCustomerDetailsClient(String namedCredentialsName, IGRestClient.Language lang, 
			String bpid, String resourceName) {
		super(namedCredentialsName, lang);
		this.bpid = bpid;
		this.resourceName = resourceName;
	}
	
	public IGCustomerDetailsClient(String namedCredentialsName, String bpid, String resourceName) {
		this(namedCredentialsName, null, bpid, resourceName);
	}
	
	public IGCustomerDetailsClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}
	
	public IGCustomerDetailsClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}
	
    public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + resourceName.trim() + 
    			'/details?' + + this.langQueryString;
    }

	public override Response parseResponse(String responseBody) {
		ClientData rv = (ClientData)JSON.deserialize(responseBody, ClientData.class);
		return rv;
	}
    
    public class ClientData extends IGRestClient.Response {
    	public Mortgages mortgages 		{get; set;}
        public Accounts accounts 		{get; set;}
        public Insurances insurances 	{get; set;}
    	
        public ClientData() {
        	success = true;
        	code = 200;
        	accounts = new Accounts();
        	mortgages = new Mortgages();
        	insurances = new Insurances();
        }
    }
    
    public class Accounts extends IGRestClient.Entities {
        public Accounts(){data=new list<Account>();}
        public Account[] data {get; set;}
    }

    public class Mortgages extends IGRestClient.Entities {
        public Mortgages(){data=new list<Mortgage>();}
        public Mortgage[] data {get; set;}
    }

    public class Insurances extends IGRestClient.Entities {
        public Insurances(){data=new list<Insurance>();}
        public Insurance[] data {get; set;}
    }
    public class Mortgage {
        public string product {get; set;}
        public string propertyPostalCode {get; set;}
        public string consultantNumber {get; set;}
        public string borrowerName {get; set;}
        public string propertyTypeDesc {get; set;}
        public double paymentAmount {get; set;}
        public double taxAmount {get; set;}
        public string dataEffectiveDate {get; set;}
        public string mortgageLifeInsurance {get; set;}
        public string lastPaymentDate {get; set;}
        public string paidOffIndicator {get; set;}
        public string paymentFrequency {get; set;}
        public string guarantorName {get; set;}
        public integer remainingTime {get; set;}
        public string company {get; set;}
        public string transitNumber {get; set;}
        public integer borrowerCount {get; set;}
        public string branchName {get; set;}
        public double loanBalance {get; set;}
        public string coborrowerName {get; set;}
        public string maturityDate {get; set;}
        public string loanNum {get; set;}
        public string propertyCity {get; set;}
        public integer remainingAmortizationTerm {get; set;}
        public string refinanceIndicator {get; set;}
        public string propertyProvince {get; set;}
        public string fundingDate {get; set;}
        public string propertyAddress {get; set;}
        public string accountOwner {get; set;}
        public integer originalAmortizationTerm {get; set;}
        public string loanClassDesc {get; set;}
        public string accountNumber {get; set;}
        public string lastRenewalDate {get; set;}
        public double appraisalValue {get; set;}
        public string nextPaymentDate {get; set;}
        public double loanAmount {get; set;}
        public string clientBpNumber {get; set;}
        public integer branchId {get; set;}
        public double paymentAndTaxAmount {get; set;}
        public double interestRate {get; set;}
    }

    public class Account {
          public string consultantNumber {get; set;}
          public string accountNo {get; set;}
          public string owner {get; set;}
          public string beneficiary {get; set;}
          public string instructionData {get; set;}
          public string riderData {get; set;}
          public string company {get; set;}
          public string annuitant {get; set;}
          public string positionData {get; set;}
          public string reportingDate {get; set;}
          public string contractData {get; set;}
          public string accountType {get; set;}
          public string assetType {get; set;}
          public string clientBpNumber {get; set;}
          public string libData {get; set;}
          public string registrationType {get; set;}
          public string rdspData {get; set;}
          public double marketValueCad {get; set;}
    }

    public class Insurance {
          public double premiumAmount {get; set;}
          public string insuranceType {get; set;}
          public string consultantNumber {get; set;}
          public string premiumFrequency {get; set;}
          public string insured {get; set;}
          public string coverageCeaseDate {get; set;}
          public string riderDetails {get; set;}
          public string benefitTaxable {get; set;}
          public string riders {get; set;}
          public string company {get; set;}
          public string issueDate {get; set;}
          public string policyOwner {get; set;}
          public string occupationClassification {get; set;}
          public double familyCareAmount {get; set;}
          public string renewalDate {get; set;}
          public string homeCare {get; set;}
          public string expiryDate {get; set;}
          public double coverageAmount {get; set;}
          public string policyNumber {get; set;}
          public string beneficiary {get; set;}
          public string waitingPeriod {get; set;}
          public string policyStatus {get; set;}
          public string policyType {get; set;}
          public string familyCareFrequency {get; set;}
          public string planType {get; set;}
          public string occupationDefinition {get; set;}
          public string benefitFrequency {get; set;}
          public double benefitAmount {get; set;}
          public string clientBpNumber {get; set;}
          public string carrier {get; set;}
          public string payer {get; set;}
          public string benefitPeriod {get; set;}
    }
}