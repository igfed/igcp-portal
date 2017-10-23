public class IGOnlineStatementsList extends IGRestClient{
	private static final String IG_OLS_NAMED_CREDS 	= 'IG_Client_Portal_Dev_1_3';
	private List<String> clientNumbersString;
	private LIst<Financial_Asset__c> listOfFAs;
	

	public IGOnlineStatementsList() {
		super(IG_OLS_NAMED_CREDS);
	}

	public List<statementList> getListOfStatements(Id contactId){
		listOfFAs = new List<Financial_Asset__c>();
		listOfFAs = [select Client_Number__c from Financial_Asset__c where Customer__c =: contactId];
		System.debug('listOfFAs '+listOfFAs);
		getServiceData();
		//client_numbers=123123&client_numbers=1231231
		return null;
	}

	public override String getHttpEndPoint() {
		Integer testClientNumber = 12345;
		String testDate = 'qwerty';
		String clientNumeberString='';
		System.debug('listOfFAs '+listOfFAs.size());
		for(Financial_Asset__c eachFA : listOfFAs){
			clientNumeberString += 'client_numbers='+eachFA.Client_Number__c+'&';
		}
		return 'callout:'+IG_OLS_NAMED_CREDS+'/documents/statements/list?'+clientNumeberString+'dates='+testDate;
	}
	public override Response parseResponse(String responseBody) {
    	System.debug('response '+responseBody);
    	clientStatementData rv;
    	try{
    		rv = (clientStatementData)System.JSON.deserializeStrict(responseBody, clientStatementData.class);
    	}
    	catch(Exception e){
    		System.debug('Exception '+e);
    	}

    	System.debug('rv->>>>>> '+rv);
    	return rv;
    }
    public class clientStatementData extends IGRestClient.Response {
    	public Client Client;

    	public clientStatementData(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}
    }
   public void testFunction(){
    	System.debug(super.callRESTService());
    }
    public class Client extends IGRestClient.Entities {
		public List<statementList> statementsOL;
	}
    public class statementList{
    	String clientName;
    	String clientNumber;
    	String docId;
    	String statementdate;
    	
    } 
}