public class IGAssetMixClient extends IGRestClient {
	private static final String RESOURCE_NAME 		= 'assetMix';

	public String bpid 			{ get; set; } 

	public IGAssetMixClient(String namedCredentialsName, IGRestClient.Language lang) {
		super(namedCredentialsName, lang);
	}

	public IGAssetMixClient(String namedCredentialsName) {
		this(namedCredentialsName, null);
	}
	
	public override String getHttpEndPoint() {
    	return 'callout:' + this.namedCredentialsName + '/clients/' + bpid.trim() + '/' + RESOURCE_NAME;
    }

    public override Response parseResponse(String responseBody) {
    	AssetMixData rv = (AssetMixData)System.JSON.deserializeStrict(responseBody, AssetMixData.class);
    	return rv;
    }

    public class AssetMixData extends IGRestClient.Response {
    	public Client Client;

    	public AssetMixData(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}
    }

    public class Client extends IGRestClient.Entities {
		public List<AssetMixes> AssetMixes;
	}

    public class AssetMixes {
		public String CLIENT_BPID;
		public String CLIENT_NUMBER;
		public String ACCOUNT_NUMBER;
		public Double CASH_AMOUNT;
		public Double FIXED_INCOME_AMOUNT;
		public Double BALANCED_AMOUNT;
		public Double EQUITY_AMOUNT;
		public Double SPECIALTY_AMOUNT;
	}

}