public class IGOnlineStatementsList extends IGRestClient{
	private static final String IG_OLS_NAMED_CREDS 	= 'IG_Client_Portal_Dev_1_3';
	private List<String> clientNumbersString;
	private LIst<Financial_Asset__c> listOfFAs;
<<<<<<< HEAD
	private static Map<Integer, String> monthsMap = new Map<Integer, String>{
		  1 => 'Jan',
		  2 => 'Feb',
		  3 => 'Mar',
		  4 => 'Apr',
		  5 => 'May',
		  6 => 'Jun',
		  7 => 'Jul',
		  8 => 'Aug',
		  9 => 'Sep',
		  10 => 'Oct',
		  11 => 'Nov',
		  12 => 'Dec'
		};
=======
>>>>>>> b8a8fe43d1187fe7fe241397066e2593fe661b68
	

	public IGOnlineStatementsList() {
		super(IG_OLS_NAMED_CREDS);
	}

	public List<DTO_OnlineStatement> getListOfStatements(Id contactId){
		listOfFAs = new List<Financial_Asset__c>();
		List<DTO_OnlineStatement> rv;
		listOfFAs = [select Client_Number__c from Financial_Asset__c where Customer__c =: contactId AND Client_Number__c != null];
		System.debug('listOfFAs '+listOfFAs);
		IGRestClient.Response res  = getServiceData();
		//client_numbers=123123&client_numbers=1231231
		rv = new List<DTO_OnlineStatement>();
		if (res != null) {
		    	if (!res.success) {
		    		System.debug('=====> getonlinestatemnet.ERROR: ' + res.success + ', ' + res.code + ', ' + res.error);
		           
	            } else {
	            	clientStatementData data = (clientStatementData)res;

	            	System.debug('=====> getonlinestatemnet.data: ' + data);
	            	for(ClientStatementResults eachResult : data.clientStatementResults){
<<<<<<< HEAD
	            		Date tempDate = Date.valueOf(eachResult.statementdate);
	            		/*System.debug(Date.valueOf(eachResult.statementdate)+'->>'+String.valueOf(temp.format('MMM')));
	            		System.debug(temp.format('MMMM D, YYYY'));*/
	            		System.debug(eachResult.statementdate+'->>'+ Date.valueOf(eachResult.statementdate));
	            		//eachResult.statementdate = monthsMap.get(tempDate.day()) +' '+temp.format('d')+', '+temp.format('YYYY');
	            		eachResult.statementdate = monthsMap.get(tempDate.month()) +' '+tempDate.day() +', '+tempDate.year();
	            		System.debug('date format '+eachResult.statementdate);
	            		rv.add(new DTO_OnlineStatement(eachResult));
	            	}/**/
=======
	            		Datetime temp = Date.valueOf(eachResult.statementdate);
	            		/*System.debug(Date.valueOf(eachResult.statementdate)+'->>'+String.valueOf(temp.format('MMM')));
	            		System.debug(temp.format('MMMM D, YYYY'));*/
	            		eachResult.statementdate = temp.format('MMM')+' '+temp.format('d')+', '+temp.format('YYYY');
	            		System.debug('date format '+eachResult.statementdate);
	            		rv.add(new DTO_OnlineStatement(eachResult));
	            	}
>>>>>>> b8a8fe43d1187fe7fe241397066e2593fe661b68
	            	
	            }
		    }
		System.debug(rv);
		return rv;
	}
<<<<<<< HEAD
	
=======
>>>>>>> b8a8fe43d1187fe7fe241397066e2593fe661b68

	public override String getHttpEndPoint() {
		Integer testClientNumber = 12345;
		String testDate = 'qwerty';
		String clientNumeberString='';
		System.debug('listOfFAs '+listOfFAs.size());
		for(Financial_Asset__c eachFA : listOfFAs){
			clientNumeberString += 'client_numbers='+eachFA.Client_Number__c+'&';
		}
		//clientNumeberString = 'client_numbers=33333'; // this is to test, will change when the service is up.
		return 'callout:'+IG_OLS_NAMED_CREDS+'/documents/statements/list?'+clientNumeberString+'dates='+testDate;
	}
	public override Response parseResponse(String responseBody) {
    	System.debug('response '+responseBody);
    	clientStatementData rv;
    	try{
    		rv = (clientStatementData)System.JSON.deserialize(responseBody, clientStatementData.class);
    	}
    	catch(Exception e){
    		System.debug('Exception '+e);
    	} 

    	System.debug('rv->>>>>> '+rv);
    	return rv;
    }
    public class clientStatementData extends IGRestClient.Response {
    	//public Client Client;
    	public ClientStatementResults[] clientStatementResults;
    	public clientStatementData(Boolean isSuccessful, Integer theCode, String theResponse) {
    		super(isSuccessful, theCode, theResponse);
    	}
    }
   /*public void testFunction(){
    	System.debug(super.callRESTService());
    }*/
    public class Client extends IGRestClient.Entities {
		public List<ClientStatementResults> clientStatementResults;
	}
	//public cls_clientStatementResults[] clientStatementResults;

    public class ClientStatementResults{
    	public String clientName;
		public String clientNumber;
		public String docId;
		public String statementdate;
    	
    } 
}