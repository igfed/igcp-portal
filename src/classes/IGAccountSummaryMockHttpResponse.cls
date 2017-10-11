@isTest
global class IGAccountSummaryMockHttpResponse implements HttpCalloutMock {
	global HTTPResponse respond(HTTPRequest req) {
		System.assertEquals('GET', req.getMethod());
		
		HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(getJSON());
        res.setStatusCode(200);
        return res;
	}
	
	private String getJSON() {
String json=		'{'+
		'  "Client": {'+
		'    "AccountSummaries": ['+
		'      {'+
		'        "CLIENT_BPID": "1463916",'+
		'        "CLIENT_NUMBER": "123456",'+
		'        "ACCOUNT_NUMBER": "123456",'+
		'        "ACCOUNT_TYPE": "12",'+
		'        "ACCOUNT_TYPE_LABEL": "RRSP",'+
		'        "CONSULTANT_NUMBER": "123456",'+
		'        "DEALER_NUMBER": "7759",'+
		'        "DEALER_NAME": "IGS",'+
		'        "SOURCE_SYSTEM": "RBroker",'+
		'        "REGISTRATION_TYPE": "GIF",'+
		'        "MARKET_VALUE_CAD": "181839.02",'+
		'        "BOOK_COST_CAD": "181839.02",'+
		'        "GAIN_LOSS_CAD": "839.02",'+
		'        "REPORTING_DATE": "2017-09-01",'+
		'        "AS_OF_DATE": "2017-09-01"'+
		'      },'+
		'      {'+
		'        "CLIENT_BPID": "1463917",'+
		'        "CLIENT_NUMBER": "234567",'+
		'        "ACCOUNT_NUMBER": "234567",'+
		'        "ACCOUNT_TYPE": "02",'+
		'        "ACCOUNT_TYPE_LABEL": "TFSA",'+
		'        "CONSULTANT_NUMBER": "234567",'+
		'        "DEALER_NUMBER": "9737",'+
		'        "DEALER_NAME": "IGSI",'+
		'        "SOURCE_SYSTEM": "SAS",'+
		'        "REGISTRATION_TYPE": "GIF",'+
		'        "MARKET_VALUE_CAD": "21432.01",'+
		'        "BOOK_COST_CAD": "21432.01",'+
		'        "GAIN_LOSS_CAD": "-432.01",'+
		'        "REPORTING_DATE": "2017-08-12",'+
		'        "AS_OF_DATE": "2017-08-12"'+
		'      }'+
		'    ]'+
		'  }'+
		'}';		
		return json;
	}
}