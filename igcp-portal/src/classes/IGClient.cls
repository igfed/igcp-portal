public class IGClient {
    public class IGClientException extends Exception {}

    private static string HTTP_HEADER_CORR  = 'correlationid';
    private static string HTTP_HEADER_ACPT  = 'Accept';
    private static string HTTP_QUERY_LANG   = 'lang';
    private static String kHexChars = '0123456789abcdefABCDEF';

    public enum Language {ENGLISH, FRENCH}

    private string namedCredentialsName;
    private string langQueryString;

    public IGClient(string namedCredentialsName){
        this(namedCredentialsName, Language.ENGLISH);
    }

    public IGClient(string namedCredentialsName, Language lang){
        this.namedCredentialsName = namedCredentialsName;
        if(Language.FRENCH==lang){
            this.langQueryString = HTTP_QUERY_LANG + '=fr';
        }
        else {
            this.langQueryString = HTTP_QUERY_LANG + '=en';
        }
    }

    public Response getCustomerAccountDetails(String bpid){
        return getCustomerDetails(bpid, 'accounts');
    }

    public Response getCustomerMortgageDetails(String bpid){
        return getCustomerDetails(bpid, 'mortgages');
    }

    public Response getCustomerInsuranceDetails(String bpid){
        return getCustomerDetails(bpid, 'insurances');
    }

    public Response getCustomerAllDetails(String bpid){
        return getCustomerDetails(bpid, 'all');
    }

    /**
        private methods
    */
    public Response getCustomerDetails(String bpid, String resourceName){
        if(String.isBlank(bpid)) throw new IGClientException('Business Partner Id cannot be null/empty');
        if(String.isBlank(resourceName)) throw new IGClientException('Resource name cannot be null/empty');

        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + resourceName.trim() + '/details?' + this.langQueryString);
        //req.setEndpoint('callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + resourceName.trim());
        req.setMethod('GET');
        req.setHeader(HTTP_HEADER_CORR, generateGUID());
        req.setHeader(HTTP_HEADER_ACPT, 'application/json');
        req.setTimeout(120000);
        Http http = new Http();
        HTTPResponse res = http.send(req);

        system.debug('RAW: ' + res.getBody());

        Response ret;
        Integer resStatusCode = res.getStatusCode();
        if(200!=resStatusCode){
            Error err;
            try{
                ret = (Error)JSON.deserialize(res.getBody(), Error.class);               
             }catch(Exception e){
                 err = new Error();
                 err.error = res.getBody();
                 ret = err;    
             }
             err = (Error)ret;
             err.success = false;
        }else{
            ret = (Data)JSON.deserialize(res.getBody(), Data.class);
            Data dat = (Data)ret;
            dat.success = true; 
        }
        ret.code = resStatusCode;
        return ret;
    }
    
    private static String generateGUID() {
          String returnValue = '';
          Integer nextByte = 0;
          for (Integer i = 0; i<32; i++) {
           if (i == 8 || i == 12 || i == 16 || i == 20) {
            returnValue += '-';
           }
           nextByte = (Math.round(Math.random() * 255) - 128) & 255;
           //System.debug('\n\n'+(nextByte & 15));
           if (i == 6) {
            nextByte = nextByte & 15;
           }
           returnValue += kHexChars.charAt(nextByte & 15);
          }
          return returnValue;
    }

    /**
        Schema classes
    */
    public abstract class Response {
        public boolean success {get; set;}
        public Integer code {get; set;}
    }
    public class Error extends Response {
        public Error(){success=false;}
        public string error {get; set;}
    }
    public class Data extends Response {
        public Data(){success=true;code=200;accounts=new Accounts();mortgages=new Mortgages();insurances=new Insurances();}
        public Mortgages mortgages {get; set;}
        public Accounts accounts {get; set;}
        public Insurances insurances {get; set;}
    }

    public abstract class Entities{
        public string status {get; set;}
    }
    public class Accounts extends Entities {
        public Accounts(){data=new list<Account>();}
        public Account[] data {get; set;}
    }

    public class Mortgages extends Entities {
        public Mortgages(){data=new list<Mortgage>();}
        public Mortgage[] data {get; set;}
    }

    public class Insurances extends Entities {
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