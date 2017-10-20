public abstract class IGRestClient {
	public class IGClientException extends Exception {}

    private static string HTTP_HEADER_CORR  = 'correlationid';
    private static string HTTP_HEADER_ACPT  = 'Accept';
    private static string HTTP_QUERY_LANG   = 'LANG';
    private static String kHexChars 		= '0123456789abcdefABCDEF';
    private static String REST_METHOD		= 'GET';
    private static String REST_CONTENT		= 'application/json';

    public enum Language {ENGLISH, FRENCH}

    public String namedCredentialsName;
    public String langQueryString;    
    
    public IGRestClient(string namedCredentialsName){
        this(namedCredentialsName, Language.ENGLISH);
    }

    public IGRestClient(string namedCredentialsName, Language lang){
        this.namedCredentialsName = namedCredentialsName;
        if(Language.FRENCH==lang){
            this.langQueryString = HTTP_QUERY_LANG + '=FR';
        }
        else {
            this.langQueryString = HTTP_QUERY_LANG + '=EN';
        }
    }
    
    protected Response callRESTService() {
    	HttpRequest req = new HttpRequest();
        String endPoint = getHttpEndPoint();

        if (String.isNotBlank(endPoint) && endPoint.indexOf('?') == -1) {
            req.setEndpoint(getHttpEndPoint() + '?' + this.langQueryString);
        } else {
            req.setEndpoint(getHttpEndPoint() + '&' + this.langQueryString);
        }
        //req.setEndpoint(getHttpEndPoint() + '?' + this.langQueryString);
        req.setMethod(REST_METHOD);
        req.setHeader(HTTP_HEADER_CORR, generateGUID());
        req.setHeader(HTTP_HEADER_ACPT, REST_CONTENT);
        req.setTimeout(120000);
        System.debug('request '+req);
        Http http = new Http();
        HTTPResponse res = http.send(req);
        
        Response ret;
        Integer resStatusCode = res.getStatusCode();
        ret = new Response((200 == resStatusCode), resStatusCode, res.getBody());
        return ret;
    }
    
    private static String generateGUID() {
          String returnValue = '';
          Integer nextByte = 0;
          for (Integer i = 0; i<32; i++) {
           if (i == 8 || i == 12 || i == 16 || i == 20) {
            returnValue += '-';
           }
           nextByte = (Math.round(Math.random() * 255) - 128) & 255;
           if (i == 6) {
            nextByte = nextByte & 15;
           }
           returnValue += kHexChars.charAt(nextByte & 15);
          }
          return returnValue;
    }
    
    public abstract String getHttpEndPoint();
    //public abstract Response getServiceData();
    
    public Response getServiceData() {
    	Response rv = null;
		Response res = callRESTService();
		if (res.success) {
			try {
				rv = parseResponse(res.responseBody);
				rv.success = true;
			} catch (JSONException e) {
				rv = new Response(false, -1, e.getMessage());
			}
		} else {
			return res;
		}
    	return rv;
    }
    
    public abstract Response parseResponse(String responseBody);
    
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

    public abstract class Entities {
        public string status 		{ get; set; }
    }
    
}