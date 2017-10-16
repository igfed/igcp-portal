@isTest
global class CP_SCIMRestClientMock_UserQuery implements HttpCalloutMock {
   
   public String username {get; set;}
   
    public CP_SCIMRestClientMock_UserQuery()
    {
        this('testUser');
    }

    public CP_SCIMRestClientMock_UserQuery(String username)
    {
      this.username = username; 
    }
    


    global HTTPResponse respond(HTTPRequest req) {
        // Optionally, only send a mock response for a specific endpoint
        // and method.
        
        //System.assertEquals('http://api.salesforce.com/foo/bar', req.getEndpoint());
        //System.assertEquals('GET', req.getMethod());
        
        // Create a fake response
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(this.getJSON());
        res.setStatusCode(200);
        return res;
    }

    private String getJSON()
    {
      String JSON = '{'+
          '"totalResults": 1,'+
          '"schemas": ['+
            '"urn:ietf:params:scim:api:messages:2.0:ListResponse"'+
          '],'+
          '"Resources": ['+
            '{'+
              '"meta": {'+
                '"location": "https:// fitrp1-isam.investorsgroup.com/scim/Users/aGFyaXNodXNjMQ",'+
                '"resourceType": "User"'+
              '},'+
              '"id": "aGFyaXNodXNjMQ",'+
              '"userName": "'+ this.userName +'"'+
            '}'+
          ']'+
        '}';
      return JSON;
    }

}