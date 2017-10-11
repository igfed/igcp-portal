@isTest
public class IGAccountDetailMockHttpResponse implements HttpCalloutMock {

    protected Integer code;
    protected String status;
    protected String body;
    protected Map<String, String> responseHeaders;

    public IGAccountDetailMockHttpResponse(Integer code, String status, String body, Map<String, String> responseHeaders) {
        this.code = code;
        this.status = status;
        this.body = body;
        this.responseHeaders = responseHeaders;
    }

    public IGAccountDetailMockHttpResponse() {
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
        '    "AccountDetails": ['+
        '      {'+
        '        "CLIENT_BPID": "1463916",'+
        '        "CLIENT_NUMBER": "123456",'+
        '        "ACCOUNT_NUMBER": "123456",'+
        '        "CONSULTANT_NUMBER": "123456",'+
        '        "ACCOUNT_TYPE": "12",'+
        '        "ACCOUNT_TYPE_LABEL": "RRSP",'+
        '        "REGISTRATION_TYPE": "GIF",'+
        '        "DEALER_NUMBER": "7759",'+
        '        "DEALER_NAME": "IGS",'+
        '        "SOURCE_SYSTEM": "RBroker",'+
        '        "REPORTING_DATE": "2017-09-01",'+
        '        "AS_OF_DATE": "2017-09-01",'+
        '        "BALANCE_DATE": "2017-09-01",'+
        '        "PURCHASE_DATE": "2017-09-01",'+
        '        "MARKET_VALUE_CAD": "181839.02",'+
        '        "BOOK_COST_CAD": "181839.02",'+
        '        "GAIN_LOSS_CAD": "839.02",'+
        '        "NET_CONTRIBUTIONS": "181839.02",'+
        '        "TOTAL_CONTRIBUTED_AMOUNT": "181839.02",'+
        '        "TOTAL_REDEEMED_AMOUNT": "181839.02",'+
        '        "TOTAL_DISTRIBUTED_AMOUNT": "181839.02",'+
        '        "TOTAL_REINVESTED_AMOUNT": "181839.02",'+
        '        "NET_CONTRIBUTIONS_YTD": "181839.02",'+
        '        "NET_WITHDRAWALS_YTD": "181839.02",'+
        '        "NET_TRANSFERS_IN_YTD": "181839.02",'+
        '        "NET_TRANSFERS_OUT_YTD": "181839.02",'+
        '        "NET_CONTRIBUTIONS_INCEPTION": "181839.02",'+
        '        "NET_WITHDRAWALS_INCEPTION": "181839.02",'+
        '        "NET_TRANSFERS_IN_INCEPTION": "181839.02",'+
        '        "NET_TRANSFERS_OUT_INCEPTION": "181839.02",'+
        '        "BENEFICIARY_NAMES": "",'+
        '        "IPROFILE_MODEL_NUMBER": "",'+
        '        "CURRENCY": "CAD"'+
        '      },'+
        '      {'+
        '        "CLIENT_BPID": "1463917",'+
        '        "CLIENT_NUMBER": "234567",'+
        '        "ACCOUNT_NUMBER": "234567",'+
        '        "CONSULTANT_NUMBER": "234567",'+
        '        "ACCOUNT_TYPE": "02",'+
        '        "ACCOUNT_TYPE_LABEL": "TFSA",'+
        '        "REGISTRATION_TYPE": "GIF",'+
        '        "DEALER_NUMBER": "9737",'+
        '        "DEALER_NAME": "IGSI",'+
        '        "SOURCE_SYSTEM": "SAS",'+
        '        "REPORTING_DATE": "2017-08-12",'+
        '        "AS_OF_DATE": "2017-08-12",'+
        '        "BALANCE_DATE": "2017-08-12",'+
        '        "PURCHASE_DATE": "2017-08-12",'+
        '        "MARKET_VALUE_CAD": "21432.01",'+
        '        "BOOK_COST_CAD": "21432.01",'+
        '        "GAIN_LOSS_CAD": "-432.01",'+
        '        "NET_CONTRIBUTIONS": "21432.02",'+
        '        "TOTAL_CONTRIBUTED_AMOUNT": "21432.02",'+
        '        "TOTAL_REDEEMED_AMOUNT": "21432.02",'+
        '        "TOTAL_DISTRIBUTED_AMOUNT": "21432.02",'+
        '        "TOTAL_REINVESTED_AMOUNT": "21432.02",'+
        '        "NET_CONTRIBUTIONS_YTD": "21432.02",'+
        '        "NET_WITHDRAWALS_YTD": "21432.02",'+
        '        "NET_TRANSFERS_IN_YTD": "21432.02",'+
        '        "NET_TRANSFERS_OUT_YTD": "21432.02",'+
        '        "NET_CONTRIBUTIONS_INCEPTION": "21432.02",'+
        '        "NET_WITHDRAWALS_INCEPTION": "21432.02",'+
        '        "NET_TRANSFERS_IN_INCEPTION": "21432.02",'+
        '        "NET_TRANSFERS_OUT_INCEPTION": "21432.02",'+
        '        "BENEFICIARY_NAMES": "Bob",'+
        '        "IPROFILE_MODEL_NUMBER": "234567",'+
        '        "CURRENCY": "USD"'+
        '      }'+
        '    ]'+
        '  }'+
        '}';
        return json;
    }

}