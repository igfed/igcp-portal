public with sharing class IGOnlineStatementRender extends IGRestClient{
	private static final String IG_OLS_NAMED_CREDS 	= 'IG_Client_Portal_Dev_1_3';
	/*
	https://anypoint.mulesoft.com/apiconsoleproxy/api/v1/proxy/https://mocksvc.mulesoft.com/mocks/
	df5fe611-d3e3-45c3-92a1-c212b33dc901/ig/portal/1.3/documents/statements/list?client_numbers='1234'&dates=asdasda
	*/
	public IGOnlineStatementRender() {
		super(IG_OLS_NAMED_CREDS);
	}
	public override String getHttpEndPoint() {
		String testDocId = 'djcxMjYtNTAxMS01MDEyLTUwMTctREFBMTktMzgyMzVGQUFBLTQzODYxLTIxNTM4LTM4MjQ2MTAtMjIzNTE5LTc4LTc5LTItMS0wLV4BMTIyMzg3MwFGVElaRURTATE0NzAwATABOTkzMg==';
		return 'callout:'+IG_OLS_NAMED_CREDS+'/documents/statements/'+testDocId;
	}
	 public override Response parseResponse(String responseBody) {
    	System.debug('response '+responseBody);
    	return null;
    }
    public void testFunction(){
    	System.debug(super.callRESTService());
    }
}