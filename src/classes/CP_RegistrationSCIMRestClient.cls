public with sharing class CP_RegistrationSCIMRestClient extends IGRestClient {

    public String bpid          { get; set; }
    public String resourceName  { get; set; }

// Constructors

    public CP_RegistrationSCIMRestClient(String namedCredentialsName, IGRestClient.Language lang, 
            String bpid, String resourceName) {
        super(namedCredentialsName, lang);
        this.bpid = bpid;
        this.resourceName = resourceName;
    }
    
    public CP_RegistrationSCIMRestClient(String namedCredentialsName, String bpid, String resourceName) {
        this(namedCredentialsName, null, bpid, resourceName);
    }
    
    public CP_RegistrationSCIMRestClient(String namedCredentialsName, IGRestClient.Language lang) {
        super(namedCredentialsName, lang);
    }
    
    public CP_RegistrationSCIMRestClient(String namedCredentialsName) {
        this(namedCredentialsName, null);
    }

//


// Over-reden bastract  functions from Base class 

	public override String getHttpEndPoint() {
    	return '';
    }

    public override Response parseResponse(String responseBody) {
    	
    	ISAMClientUser isamUserInfo = (ISAMClientUser)System.JSON.deserializeStrict(responseBody, ISAMClientUser.class);
    	return isamUserInfo;
    }
//



    public class ISAMClientUser extends IGRestClient.Response{

        public List<String> schemas {get; set;}
        public IGName name {get; set;}
        public String displayName {get; set;}
        public String userName {get; set;}
        public List<IGPhoneNumber> phoneNumbers {get; set;}
        public List<IGEmail> emails {get; set;}
        public String password {get; set;}
        public List<IGSecurityQuestion> SecurityQuestions {get; set;}
    }

    public class IGName {
        public string givenName {get; set;}
        public string familyName {get; set;}
    }

    public class IGPhoneNumber {
        public String type {get; set;}
        public String value{get; set;}
        public Boolean primary {get; set;}
    }

    public class IGEmail {
        public String type {get; set;}
        public String value{get; set;}
        public Boolean primary {get; set;}   
    }

    public class IGSecurityQuestion{
        public String id {get; set;}
        public String answer{get; set;}
        public String question {get; set;} 
    }

}