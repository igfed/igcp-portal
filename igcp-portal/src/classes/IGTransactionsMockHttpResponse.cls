@isTest
public class IGTransactionsMockHttpResponse implements HttpCalloutMock {

    protected Integer code;
    protected String status;
    protected String body;
    protected Map<String, String> responseHeaders;

    public IGTransactionsMockHttpResponse(Integer code, String status, String body, Map<String, String> responseHeaders) {
        this.code = code;
        this.status = status;
        this.body = body;
        this.responseHeaders = responseHeaders;
    }

    public IGTransactionsMockHttpResponse() {
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
        '    "Transactions": ['+
        '      {'+
        '        "CLIENT_BPID": "1463916",'+
        '        "CLIENT_NUMBER": "123456",'+
        '        "ACCOUNT_NUMBER": "123456",'+
        '        "ACCOUNT_TYPE": "12",'+
        '        "ACCOUNT_TYPE_LABEL": "RRSP",'+
        '        "HOLDING_NUMBER": "123456",'+
        '        "HOLDING_NAME": "123456",'+
        '        "SOURCE_SYSTEM": "RBroker",'+
        '        "TRANSACTION_DATE": "2017-09-01",'+
        '        "ACTIVITY": "Buy",'+
        '        "UNIT_PRICE": "39.02",'+
        '        "UNITS": "100",'+
        '        "NET_AMOUNT": "181839.02",'+
        '        "TRANSACTION_CHARGE": "3.02",'+
        '        "TAXES": "3.02",'+
        '        "GROSS_AMOUNT": "181839.02",'+
        '        "CURRENCY": "CAD",'+
        '        "EXCHANGE_RATE": "1.0"'+
        '      },'+
        '      {'+
        '        "CLIENT_BPID": "1463917",'+
        '        "CLIENT_NUMBER": "234567",'+
        '        "ACCOUNT_NUMBER": "234567",'+
        '        "ACCOUNT_TYPE": "02",'+
        '        "ACCOUNT_TYPE_LABEL": "TFSA",'+
        '        "HOLDING_NUMBER": "567823",'+
        '        "HOLDING_NAME": "567823",'+
        '        "SOURCE_SYSTEM": "SAS",'+
        '        "TRANSACTION_DATE": "2017-08-12",'+
        '        "ACTIVITY": "Contribution",'+
        '        "UNIT_PRICE": "32.01",'+
        '        "UNITS": "200",'+
        '        "NET_AMOUNT": "21432.01",'+
        '        "TRANSACTION_CHARGE": "1.01",'+
        '        "TAXES": "1.01",'+
        '        "GROSS_AMOUNT": "21432.01",'+
        '        "CURRENCY": "USD",'+
        '        "EXCHANGE_RATE": "0.82"'+
        '      }'+
        '    ]'+
        '  }'+
        '}';
        return json;
    }
}