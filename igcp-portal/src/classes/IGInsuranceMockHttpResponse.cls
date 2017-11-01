@isTest
public class IGInsuranceMockHttpResponse implements HttpCalloutMock {

    protected Integer code;
    protected String status;
    protected String body;
    protected Map<String, String> responseHeaders;

    public IGInsuranceMockHttpResponse(Integer code, String status, String body, Map<String, String> responseHeaders) {
        this.code = code;
        this.status = status;
        this.body = body;
        this.responseHeaders = responseHeaders;
    }

    public IGInsuranceMockHttpResponse() {
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
        '    "InsurancePolicies": ['+
        '      {'+
        '        "CLIENT_BPID": "1463916",'+
        '        "CLIENT_NUMBER": "12321",'+
        '        "CONSULTANT_NUMBER": "12739",'+
        '        "INSURANCE_TYPE": "Health",'+
        '        "POLICY_STATUS": "Active (inforce).",'+
        '        "POLICY_TYPE": "Critical Illness Perm",'+
        '        "POLICY_NUMBER": "K3498210",'+
        '        "CARRIER": "SL",'+
        '        "COMPANY": "Sunlife",'+
        '        "INSURED": "Bob Smith",'+
        '        "POLICY_OWNER": "Bob Smith",'+
        '        "BENEFICIARY": "",'+
        '        "ISSUE_DATE": "2013-07-25",'+
        '        "RENEWAL_DATE": "",'+
        '        "PLAN_TYPE": "",'+
        '        "COVERAGE_AMOUNT": "50000",'+
        '        "COVERAGE_CEASE_DATE": "",'+
        '        "BENEFIT_AMOUNT": "1200",'+
        '        "BENEFIT_FREQUENCY": "Monthly",'+
        '        "WAITING_PERIOD": "",'+
        '        "BENEFIT_PERIOD": "",'+
        '        "BENEFIT_TAXABLE": "",'+
        '        "OCCUPATION_CLASSIFICATION": "",'+
        '        "OCCUPATION_DEFINITION": "",'+
        '        "HOME_CARE": "",'+
        '        "FAMILY_CARE_AMOUNT": "",'+
        '        "FAMILY_CARE_FREQUENCY": "",'+
        '        "PREMIUM_AMOUNT": "699.84",'+
        '        "PREMIUM_FREQUENCY": "Monthly",'+
        '        "PAYER": "Bob Smith",'+
        '        "EXPIRY_DATE": ""'+
        '      },'+
        '      {'+
        '        "CLIENT_BPID": "1463917",'+
        '        "CLIENT_NUMBER": "12313",'+
        '        "CONSULTANT_NUMBER": "12739",'+
        '        "INSURANCE_TYPE": "Disability",'+
        '        "POLICY_STATUS": "Active (inforce).",'+
        '        "POLICY_TYPE": "Income Replacement Duration Unspecified",'+
        '        "POLICY_NUMBER": "12837701",'+
        '        "CARRIER": "CL",'+
        '        "COMPANY": "Canada Life",'+
        '        "INSURED": "Bob Smith",'+
        '        "POLICY_OWNER": "Brenda Smith",'+
        '        "BENEFICIARY": "",'+
        '        "ISSUE_DATE": "2017-02-12",'+
        '        "RENEWAL_DATE": "2043-09-24",'+
        '        "PLAN_TYPE": "",'+
        '        "COVERAGE_AMOUNT": "",'+
        '        "COVERAGE_CEASE_DATE": "",'+
        '        "BENEFIT_AMOUNT": "3000",'+
        '        "BENEFIT_FREQUENCY": "Monthly",'+
        '        "WAITING_PERIOD": "90 days elimination (3 months, 13 weeks)",'+
        '        "BENEFIT_PERIOD": "Coverage to age 65",'+
        '        "BENEFIT_TAXABLE": "",'+
        '        "OCCUPATION_CLASSIFICATION": "",'+
        '        "OCCUPATION_DEFINITION": "",'+
        '        "HOME_CARE": "",'+
        '        "FAMILY_CARE_AMOUNT": "",'+
        '        "FAMILY_CARE_FREQUENCY": "",'+
        '        "PREMIUM_AMOUNT": "42.43",'+
        '        "PREMIUM_FREQUENCY": "Monthly",'+
        '        "PAYER": "Bob Smith",'+
        '        "EXPIRY_DATE": ""'+
        '      }'+
        '    ]'+
        '  }'+
        '}';
        return json;
    }

}