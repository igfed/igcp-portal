public abstract class IGOnlineStatementRender {
	private static string HTTP_HEADER_CORR  = 'correlationid';
    private static string HTTP_HEADER_ACPT  = 'Accept';
    private static string HTTP_QUERY_LANG   = 'LANG';
    private static String kHexChars 		= '0123456789abcdefABCDEF';
    private static String REST_METHOD		= 'GET';
    private static String REST_CONTENT		= 'application/pdf';
    private static final String IG_OLS_NAMED_CREDS 	= 'IG_Client_Portal_Dev_1_3';

    public enum Language {ENGLISH, FRENCH}

    public String namedCredentialsName;
    public String langQueryString;    
    
    public IGOnlineStatementRender(string namedCredentialsName){
        this(namedCredentialsName, Language.ENGLISH);
    }

    public IGOnlineStatementRender(string namedCredentialsName, Language lang){
        this.namedCredentialsName = namedCredentialsName;
        if(Language.FRENCH==lang){
            this.langQueryString = HTTP_QUERY_LANG + '=FR';
        }
        else {
            this.langQueryString = HTTP_QUERY_LANG + '=EN';
        }
    }
    

    
	/*
	https://anypoint.mulesoft.com/apiconsoleproxy/api/v1/proxy/https://mocksvc.mulesoft.com/mocks/
	df5fe611-d3e3-45c3-92a1-c212b33dc901/ig/portal/1.3/documents/statements/list?client_numbers='1234'&dates=asdasda
	*/
	
    public abstract String getHttpEndPoint();
	
	public abstract Response parseResponse(String responseBody);

    public void testFunction(){
    	System.debug(callRESTServiceForPdf());
    }
    public Response callRESTServiceForPdf() {
        HttpRequest req = new HttpRequest();
        String endPoint = getHttpEndPoint();
        this.langQueryString = HTTP_QUERY_LANG + '=EN';

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
     public Response getServiceData() {
        Response rv = null;
        Response res = callRESTServiceForPdf();
        System.debug('res '+res.success);
        if (res.success) {
            try {
                rv = parseResponse(res.responseBody);
                rv.success = true;

            } catch (JSONException e) {
                System.debug('exception '+e);
                rv = new Response(false, -1, e.getMessage());
            }
        } else {
            return res;
        }
        return rv;
    }
    
    public virtual class Response {
        public boolean success      { get; set; }
        public Integer code         { get; set; }
        public String responseBody  { get; set; }    
        public String error         { get {if (!success) return responseBody; else return '';} }    
        
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

    public class Entities {
        public string status        { get; set; }
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
}