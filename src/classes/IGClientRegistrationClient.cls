public with sharing class IGClientRegistrationClient extends IGRestClient {
	private static final String RESOURCE_NAME 				= 'registration';
	private static final String QRY_PARAM_DATE_OF_BIRTH  	= 'DATE_OF_BIRTH';
	private static final String QRY_PARAM_POSTAL_CODE 		= 'POSTAL_CODE';
	private static final String QRY_PARAM_IDENT_NUMBER 		= 'IDENT_NUMBER';

	public String dateOfBirth 		{ get; set; }
	public String postalCode 		{ get; set; }
	public String identityNumber 	{ get; set; }

	public IGClientRegistrationClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}
	
	public IGClientRegistrationClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}

	public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + RESOURCE_NAME + 
    			'?' + QRY_PARAM_DATE_OF_BIRTH + '=' + dateOfBirth.trim() +
				'&' + QRY_PARAM_POSTAL_CODE   + '=' + postalCode.trim()  + 
				'&' + QRY_PARAM_IDENT_NUMBER  + '=' + identityNumber.trim();
    }

    public override Response parseResponse(String responseBody) {
    	ClientRegistrationData rv = (ClientRegistrationData)System.JSON.deserializeStrict(responseBody, ClientRegistrationData.class);
    	return rv;
    }

    public class ClientRegistrationData extends IGRestClient.Response {
    	public Client client;
    }

    public class Client {
		public RegistrationMatches[] registrationMatches;
	}

	public class RegistrationMatches {
		public String CLIENT_BPID;	
		public String CLIENT_TYPE;	
		public String DECEASED_INDICATOR;
		public String UNLOCATED_INDICATOR;
		public String MATCH_TYPE;
	}


}