public class IGOnlineStatementCall extends IGOnlineStatementRender {
	private static final String IG_OLS_NAMED_CREDS 	= 'IG_Client_Portal_Dev_1_3';
	public String documentId;
	/*
	1. call the get method 

	*/
	public IGOnlineStatementCall(String docId){
			super(IG_OLS_NAMED_CREDS);
		documentId = docId;
		
	}
	public string getPdfContent(){
		IGOnlineStatementCall.Response res = getServiceData();
		System.debug('response '+res);
		return null;
	}
	
	public override String getHttpEndPoint() {
		
		String testDocId = 'djcxMjYtNTAxMS01MDEyLTUwMTctREFBMTktMzgyMzVGQUFBLTQzODYxLTIxNTM4LTM4MjQ2MTAtMjIzNTE5LTc4LTc5LTItMS0wLV4BMTIyMzg3MwFGVElaRURTATE0NzAwATABOTkzMg==';
		return 'callout:'+IG_OLS_NAMED_CREDS+'/documents/statements/'+documentId;
	}
	 public override Response parseResponse(String responseBody) {
	 	responseBody = responseBody.replace('"Content-Type"', '"Content_Type"');
	 	responseBody = responseBody.replace('"Content-Transfer-Encoding"', '"Content_Transfer_Encoding"');
	 	responseBody = responseBody.replace('"Content-ID"', '"Content_ID"');
	 	System.debug('responseBody '+responseBody);
    	Document rv = (Document)System.JSON.deserializeStrict(responseBody, Document.class);
    	System.debug('rv->>>'+rv);
    	return rv;
    }

	
 
	public class Document extends IGOnlineStatementRender.Response {
		public String name;
		public String attachinfo;
		public String Content_Type;
		public String Content_Transfer_Encoding;
		public String Content_ID;
		public String Content;
		public Document(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}

	}
}