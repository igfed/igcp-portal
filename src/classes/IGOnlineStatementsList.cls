public class IGOnlineStatementsList extends IGRestClient{
	private static final String IG_OLS_NAMED_CREDS 	= 'IG_Client_Portal_Dev_1_3';
	private List<String> clientNumbersString;
	private LIst<Financial_Asset__c> listOfFAs;
	/*
	https://anypoint.mulesoft.com/apiconsoleproxy/api/v1/proxy/https://mocksvc.mulesoft.com/mocks/
	df5fe611-d3e3-45c3-92a1-c212b33dc901/ig/portal/1.3/documents/statements/list?client_numbers='1234'&dates=asdasda
	*/

	public IGOnlineStatementsList() {
		super(IG_OLS_NAMED_CREDS);
	}

	public List<statementList> getListOfStatements(Id contactId){
		listOfFAs = new List<Financial_Asset__c>();
		listOfFAs = [select Client_Number__c from Financial_Asset__c where Customer__c =: contactId];
		getServiceData();
		//client_numbers=123123&client_numbers=1231231
		return null;
	}

	public override String getHttpEndPoint() {
		Integer testClientNumber = 12345;
		String testDate = 'qwerty';
		String clientNumeberString;
		System.debug(listOfFAs);
		for(Financial_Asset__c eachFA : listOfFAs){
			clientNumeberString += 'client_numbers='+eachFA.Client_Number__c+'&';
		}
		return 'callout:'+IG_OLS_NAMED_CREDS+'/documents/statements/list?client_numbers='+testClientNumber+'&dates='+testDate;
	}
	public override Response parseResponse(String responseBody) {
    	System.debug('response '+responseBody);
    	return null;
    }
    public void testFunction(){
    	System.debug(super.callRESTService());
    }
    public class Client extends IGRestClient.Entities {
		public List<statementList> AssetMixes;
	}
    public class statementList{
    	String name;
    	String date_x;
    	String clientNumber;
    } 
}