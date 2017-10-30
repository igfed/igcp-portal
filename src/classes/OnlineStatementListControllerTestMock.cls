@isTest
global class OnlineStatementListControllerTestMock implements HttpCalloutMock {

    protected Integer code;
    protected String status;
    protected String body;
    protected Map<String, String> responseHeaders;

    public OnlineStatementListControllerTestMock(Integer code, String status, String body, Map<String, String> responseHeaders) {
        this.code = code;
        this.status = status;
        this.body = body;
        this.responseHeaders = responseHeaders;
    }

    public OnlineStatementListControllerTestMock() {
        this(200, 'SUCCESS', null, new Map<String, String>{'Content-Type' => 'application/json'});
        this.body = getJSON();
    }

    public HTTPResponse respond(HTTPRequest req) {

        HttpResponse res = new HttpResponse();
        for (String key : this.responseHeaders.keySet()) {
            res.setHeader(key, this.responseHeaders.get(key));
        }
        res.setBody(this.body);
        res.setStatusCode(this.code);
        res.setStatus(this.status);
        return res;
    }

    private String getJSON() {
       String json = '{'+
		'\"clientStatementResults\": ['+
		'    {'+
		'      \"clientName\": \"NASAUZ\",'+
		'      \"clientNumber\": \"1223873\",'+
		'      \"docId\": \"djcxMjYtNTAxMS01MDEyLTUwMTctREFBMjAtMzkzOTJGQUFBLTE3NDM0MzItMjEzNjUtMzU4MTgzNC0yMjQ0MDgtNzgtNzktMi0xLTAtXgExMjIzODczAUZUSVpFRFMBMTQ3OTEBMAE5OTMy\",'+
		'      \"statementdate\": \"2012-06-30T00:00:00-02:00\"'+
		'    },'+
		'    {'+
		'      \"clientName\": \"FTIZEDS\",'+
		'      \"clientNumber\": \"1223872\",'+
		'      \"docId\": \"djcxMjYtNTAxMS01MDEyLTUwMTctREFBMTktMzgyMzVGQUFBLTQzODYxLTIxNTM4LTM4MjQ2MTAtMjIzNTE5LTc4LTc5LTItMS0wLV4BMTIyMzg3MwFGVElaRURTATE0NzAwATABOTkzMg==\",'+
		'      \"statementdate\": \"2010-03-31T00:00:00-05:00\"'+
		'    }'+
		'  ]'+
		'}';

        return json;
    }
}