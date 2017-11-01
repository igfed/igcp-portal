@isTest
public class IGMortgageMockHttpResponse implements HttpCalloutMock {

    protected Integer code;
    protected String status;
    protected String body;
    protected Map<String, String> responseHeaders;

    public IGMortgageMockHttpResponse(Integer code, String status, String body, Map<String, String> responseHeaders) {
        this.code = code;
        this.status = status;
        this.body = body;
        this.responseHeaders = responseHeaders;
    }

    public IGMortgageMockHttpResponse() {
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
        '    "Loans": ['+
        '      {'+
        '        "CLIENT_BPID": "1463916",'+
        '        "CONSULTANT_NUMBER": "4314",'+
        '        "LOAN_NUM": "1263979100",'+
        '        "PRODUCT": "Lock & Roll Mortgage; Closed",'+
        '        "COMPANY": "Investors Group",'+
        '        "BRANCH_ID": "542",'+
        '        "BRANCH_NAME": "Quebec",'+
        '        "BORROWER_NAME": "Bob Smith",'+
        '        "COBORROWER_NAME": "Roberta Smithy",'+
        '        "BORROWER_COUNT": "2",'+
        '        "GUARANTOR_NAME": "",'+
        '        "LOAN_BALANCE": "180879.67",'+
        '        "INTEREST_RATE": "2.25",'+
        '        "LAST_RENEWAL_DATE": "2016-10-18",'+
        '        "MATURITY_DATE": "2021-10-18",'+
        '        "PAYMENT_FREQUENCY": "Monthly",'+
        '        "REMAINING_AMORTIZATION_TERM": "291",'+
        '        "REMAINING_TIME": "51",'+
        '        "PAYMENT_AMOUNT": "806.14",'+
        '        "TAX_AMOUNT": "0",'+
        '        "PAYMENT_AND_TAX_AMOUNT": "806.14",'+
        '        "LAST_PAYMENT_DATE": "2017-07-18",'+
        '        "NEXT_PAYMENT_DATE": "2017-08-18",'+
        '        "LOAN_AMOUNT": "185200",'+
        '        "APPRAISAL_VALUE": "231500",'+
        '        "FUNDING_DATE": "2016-10-18",'+
        '        "ORIGINAL_AMORTIZATION_TERM": "300",'+
        '        "TRANSIT_NUMBER": "",'+
        '        "ACCOUNT_OWNER": "",'+
        '        "ACCOUNT_NUMBER": "",'+
        '        "PROPERTY_ADDRESS": "123 Some Street",'+
        '        "PROPERTY_CITY": "Winnipeg",'+
        '        "PROPERTY_PROVINCE": "MB",'+
        '        "PROPERTY_POSTAL_CODE": "R3R0G5",'+
        '        "MORTGAGE_LIFE_INSURANCE": "",'+
        '        "DATA_EFFECTIVE_DATE": "2017-07-19",'+
        '        "PAID_OFF_INDICATOR": "N",'+
        '        "REFINANCE_INDICATOR": "N",'+
        '        "LOAN_CLASS_DESC": "Not Insured",'+
        '        "PROPERTY_TYPE_DESC": "Condominium - Apartment"'+
        '      },'+
        '      {'+
        '        "CLIENT_BPID": "1463917",'+
        '        "CONSULTANT_NUMBER": "4314",'+
        '        "LOAN_NUM": "1210728500",'+
        '        "PRODUCT": "Lock & Roll Mortgage; Closed",'+
        '        "COMPANY": "Investors Group",'+
        '        "BRANCH_ID": "542",'+
        '        "BRANCH_NAME": "Quebec",'+
        '        "BORROWER_NAME": "Bob Smith",'+
        '        "COBORROWER_NAME": "",'+
        '        "BORROWER_COUNT": "1",'+
        '        "GUARANTOR_NAME": "",'+
        '        "LOAN_BALANCE": "108277.05",'+
        '        "INTEREST_RATE": "1.99",'+
        '        "LAST_RENEWAL_DATE": "2013-08-12",'+
        '        "MATURITY_DATE": "2020-08-12",'+
        '        "PAYMENT_FREQUENCY": "Monthly",'+
        '        "REMAINING_AMORTIZATION_TERM": "216",'+
        '        "REMAINING_TIME": "37",'+
        '        "PAYMENT_AMOUNT": "596.41",'+
        '        "TAX_AMOUNT": "0",'+
        '        "PAYMENT_AND_TAX_AMOUNT": "596.41",'+
        '        "LAST_PAYMENT_DATE": "2017-07-12",'+
        '        "NEXT_PAYMENT_DATE": "2017-08-12",'+
        '        "LOAN_AMOUNT": "127143",'+
        '        "APPRAISAL_VALUE": "220000",'+
        '        "FUNDING_DATE": "2013-08-12",'+
        '        "ORIGINAL_AMORTIZATION_TERM": "239",'+
        '        "TRANSIT_NUMBER": "",'+
        '        "ACCOUNT_OWNER": "",'+
        '        "ACCOUNT_NUMBER": "",'+
        '        "PROPERTY_ADDRESS": "234 Other Avenue",'+
        '        "PROPERTY_CITY": "Winnipeg",'+
        '        "PROPERTY_PROVINCE": "MB",'+
        '        "PROPERTY_POSTAL_CODE": "R3R0G6",'+
        '        "MORTGAGE_LIFE_INSURANCE": "",'+
        '        "DATA_EFFECTIVE_DATE": "2017-07-13",'+
        '        "PAID_OFF_INDICATOR": "N",'+
        '        "REFINANCE_INDICATOR": "Y",'+
        '        "LOAN_CLASS_DESC": "CMHC",'+
        '        "PROPERTY_TYPE_DESC": "Condominium - Apartment"'+
        '      }'+
        '    ]'+
        '  }'+
        '}';
        return json;
    }

}