public class IGOnlineStatementsList extends IGRestClient{
	private static final String IG_OLS_NAMED_CREDS 	= 'IG_Client_Portal_Dev_1_3';
	/*
	https://anypoint.mulesoft.com/apiconsoleproxy/api/v1/proxy/https://mocksvc.mulesoft.com/mocks/
	df5fe611-d3e3-45c3-92a1-c212b33dc901/ig/portal/1.3/documents/statements/list?client_numbers='1234'&dates=asdasda
	*/
	public IGOnlineStatementsList() {
		super(IG_OLS_NAMED_CREDS);
	}
	public override String getHttpEndPoint() {
		Integer testClientNumber = 12345;
		String testDate = 'qwerty';
		return 'callout:'+IG_OLS_NAMED_CREDS+'/documents/statements/list?client_numbers='+testClientNumber+'&dates='+testDate;
	}
	 public override Response parseResponse(String responseBody) {
    	System.debug('response '+responseBody);
    	return null;
    }
    public void testFunction(){
    	System.debug(super.callRESTService());
    }
}