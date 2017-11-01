@isTest
public class IGInvestmentProfileMockHttpResponse implements HttpCalloutMock {

    protected Integer code;
    protected String status;
    protected String body;
    protected Map<String, String> responseHeaders;

    public IGInvestmentProfileMockHttpResponse(Integer code, String status, String body, Map<String, String> responseHeaders) {
        this.code = code;
        this.status = status;
        this.body = body;
        this.responseHeaders = responseHeaders;
    }

    public IGInvestmentProfileMockHttpResponse() {
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
        '    "InvestmentProfiles": ['+
        '      {'+
        '        "CLIENT_BPID": "1463916",'+
        '        "CLIENT_NUMBER": "123456",'+
        '        "ACCOUNT_NUMBER": "123456",'+
        '        "SOURCE_SYSTEM": "RBroker",'+
        '        "INVESTMENT_PROFILE": "Moderate",'+
        '        "INVESTMENT_OBJECTIVE": "Retirement Savings",'+
        '        "RISK_TOLERANCE": "Low",'+
        '        "INVESTMENT_TIME_HORIZON": "5 - 10 yrs",'+
        '        "ACCOUNT_STATUS_CODE": "ACTIVE"'+
        '      },'+
        '      {'+
        '        "CLIENT_BPID": "1463917",'+
        '        "CLIENT_NUMBER": "234567",'+
        '        "ACCOUNT_NUMBER": "234567",'+
        '        "SOURCE_SYSTEM": "SAS",'+
        '        "INVESTMENT_PROFILE": "High",'+
        '        "INVESTMENT_OBJECTIVE": "Retirement Savings",'+
        '        "RISK_TOLERANCE": "Medium",'+
        '        "INVESTMENT_TIME_HORIZON": "5 - 10 yrs",'+
        '        "ACCOUNT_STATUS_CODE": "CLOSED"'+
        '      }'+
        '    ]'+
        '  }'+
        '}';
        return json;
    }

}