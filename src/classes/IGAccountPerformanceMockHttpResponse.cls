@isTest
public class IGAccountPerformanceMockHttpResponse implements HttpCalloutMock {

    protected Integer code;
    protected String status;
    protected String body;
    protected Map<String, String> responseHeaders;

    public IGAccountPerformanceMockHttpResponse(Integer code, String status, String body, Map<String, String> responseHeaders) {
        this.code = code;
        this.status = status;
        this.body = body;
        this.responseHeaders = responseHeaders;
    }

    public IGAccountPerformanceMockHttpResponse() {
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
        String json=        '{'+
        '  "Client": {'+
        '    "AccountPerformances": ['+
        '      {'+
        '        "CLIENT_BPID": "1463916",'+
        '        "CLIENT_NUMBER": "123456",'+
        '        "ACCOUNT_NUMBER": "123456",'+
        '        "OPENING_VALUE_YTD": "1000.00",'+
        '        "CLOSING_VALUE_YTD": "1001.00",'+
        '        "STARTING_YTD": "2017-01-01",'+
        '        "OPENING_VALUE_1YR": "1000.00",'+
        '        "CLOSING_VALUE_1YR": "1001.00",'+
        '        "STARTING_1YR": "2017-01-01",'+
        '        "OPENING_VALUE_3YR": "1000.00",'+
        '        "CLOSING_VALUE_3YR": "1001.00",'+
        '        "STARTING_3YR": "2017-01-01",'+
        '        "OPENING_VALUE_5YR": "1000.00",'+
        '        "CLOSING_VALUE_5YR": "1001.00",'+
        '        "STARTING_5YR": "2017-01-01",'+
        '        "OPENING_VALUE_INCEPTION": "1000.00",'+
        '        "CLOSING_VALUE_INCEPTION": "1001.00",'+
        '        "STARTING_INCEPTION": "2017-01-01"'+
        '      },'+
        '      {'+
        '        "CLIENT_BPID": "1463917",'+
        '        "CLIENT_NUMBER": "234567",'+
        '        "ACCOUNT_NUMBER": "234567",'+
        '        "OPENING_VALUE_YTD": "2000.00",'+
        '        "CLOSING_VALUE_YTD": "2001.00",'+
        '        "STARTING_YTD": "2017-01-01",'+
        '        "OPENING_VALUE_1YR": "2000.00",'+
        '        "CLOSING_VALUE_1YR": "2001.00",'+
        '        "STARTING_1YR": "2017-01-01",'+
        '        "OPENING_VALUE_3YR": "2000.00",'+
        '        "CLOSING_VALUE_3YR": "2001.00",'+
        '        "STARTING_3YR": "2017-01-01",'+
        '        "OPENING_VALUE_5YR": "2000.00",'+
        '        "CLOSING_VALUE_5YR": "2001.00",'+
        '        "STARTING_5YR": "2017-01-01",'+
        '        "OPENING_VALUE_INCEPTION": "2000.00",'+
        '        "CLOSING_VALUE_INCEPTION": "2001.00",'+
        '        "STARTING_INCEPTION": "2017-01-01"'+
        '      }'+
        '    ]'+
        '  }'+
        '}';
        return json;
    }

}