@isTest
public class IGAssetMixMockHttpResponse implements HttpCalloutMock {

    protected Integer code;
    protected String status;
    protected String body;
    protected Map<String, String> responseHeaders;

    public IGAssetMixMockHttpResponse(Integer code, String status, String body, Map<String, String> responseHeaders) {
        this.code = code;
        this.status = status;
        this.body = body;
        this.responseHeaders = responseHeaders;
    }

    public IGAssetMixMockHttpResponse() {
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
        '    "AssetMixes": ['+
        '      {'+
        '        "CLIENT_BPID": "1463916",'+
        '        "CLIENT_NUMBER": "123456",'+
        '        "ACCOUNT_NUMBER": "123456",'+
        '        "CASH_AMOUNT": "181839.02",'+
        '        "FIXED_INCOME_AMOUNT": "181839.02",'+
        '        "BALANCED_AMOUNT": "181839.02",'+
        '        "EQUITY_AMOUNT": "181839.02",'+
        '        "SPECIALTY_AMOUNT": "181839.02"'+
        '      },'+
        '      {'+
        '        "CLIENT_BPID": "1463917",'+
        '        "CLIENT_NUMBER": "234567",'+
        '        "ACCOUNT_NUMBER": "234567",'+
        '        "CASH_AMOUNT": "21432.01",'+
        '        "FIXED_INCOME_AMOUNT": "21432.01",'+
        '        "BALANCED_AMOUNT": "21432.01",'+
        '        "EQUITY_AMOUNT": "21432.01",'+
        '        "SPECIALTY_AMOUNT": "21432.01"'+
        '      }'+
        '    ]'+
        '  }'+
        '}';
        return json;
    }

}