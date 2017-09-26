public class CP_SCIMRestClient {
	
    private static string HTTP_HEADER_ACPT  = 'Accept';
    private static String REST_CONTENT		= 'application/json';
    private static String REST_GET_METHOD	= 'GET';
    private static String REST_POST_METHOD	= 'POST';
    private static String NAMED_CREDENTAIL	= 'IG_SCIM_API_Named_Credential';

   
    private Response callGetRESTService(String param) {
    	Response ret;
    	try
    	{
    		HttpRequest req = new HttpRequest();
	        req.setEndpoint('callout:' +  NAMED_CREDENTAIL + param);
	        req.setMethod(REST_GET_METHOD);
	        req.setHeader(HTTP_HEADER_ACPT, REST_CONTENT);
	        req.setTimeout(120000);
	
	        System.debug('HTTP Request ');
	        System.debug(req);

	        Http http = new Http();
	        HTTPResponse res = http.send(req);
	        
	        System.debug('HTTP Response');
	        System.debug(res);


	        Integer resStatusCode = res.getStatusCode();
	        ret = new Response((200 == resStatusCode), resStatusCode, res.getBody());
    	}
    	catch(exception e)
    	{
	    	ret = new Response(false, 500, e.getMessage());
    	}
    	return ret;
    }
    
    private Response callPostRESTService(String body) {
    	Response ret;
    	try
    	{
	    	HttpRequest req = new HttpRequest();
	        req.setEndpoint('callout:' +  NAMED_CREDENTAIL);
	        req.setMethod(REST_POST_METHOD);
	        req.setHeader(HTTP_HEADER_ACPT, REST_CONTENT);
	        req.setTimeout(120000);
	        req.setBody(body);

	        Http http = new Http();
	        HTTPResponse res = http.send(req);
	        
	        Integer resStatusCode = res.getStatusCode();
	        ret = new Response((200 == resStatusCode), resStatusCode, res.getBody());
        }
    	catch(exception e)
    	{
	    	ret = new Response(false, 500, e.getMessage());
    	}
    	return ret;
    }

    private String QueryUser(String userName)
    {
    	String location = '';
    	String param = '?filter=userName%20ew%20'+ userName +'&attributes=userName';
    	Response res = this.callGetRESTService(param); 

    	System.debug('Response Object in Query User');
    	System.debug(res);

    	if(res.success)
    	{
    		JSONParser parser = JSON.createParser(res.responseBody);
    		while (parser.nextToken() != null) {
            	if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && 
                	(parser.getText() == 'location')) {
                	// Get the value.
                	parser.nextToken();
                	location = parser.getText();
            	}
        	}
    	}

    	location = location.substringAfterLast('/');
    	return location;
    }




    public String RegisterNewUser()
    {
    	String json = '';


    	return json;
    }

    public String RetrieveUser(String userName)
    {
    	System.debug('User Name: '+ userName);

    	String userLocation = this.QueryUser(userName);

    	System.debug('Location: '+ userLocation);

		Response res = callGetRESTService('/'+userLocation);

		System.debug('Final Response JSON');
		System.debug(res);

		return JSON.serialize(res);
    }
   
    
    public virtual class Response {
        public boolean success 		{ get; set; }
        public Integer code 		{ get; set; }
        public String responseBody 	{ get; set; }    
        public String error			{ get {if (!success) return responseBody; else return '';} }    
        
        public Response() {
        	this.success = false;
        	this.code = 0;
        	this.responseBody ='';	
        }
        
        public Response(Boolean isSuccessful, Integer theCode, String theResponse) {
        	this.success = isSuccessful;
        	this.code = theCode;
        	this.responseBody = theResponse;
        }
    }

    
    



}