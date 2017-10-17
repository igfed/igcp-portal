@isTest
global class CP_SCIMRestClientMock_UserQuery implements HttpCalloutMock {
   
   public String username {get; set;}
   public Boolean getSuccessReturn {get; set;}

   
    public CP_SCIMRestClientMock_UserQuery()
    {
        this('testUser', true);
    }

    public CP_SCIMRestClientMock_UserQuery(String username)
    {
      this('testUser', true);
    }
    public CP_SCIMRestClientMock_UserQuery(String username, Boolean success)
    {
      this.username = username; 
      this.getSuccessReturn = success;
    }
    


    global HTTPResponse respond(HTTPRequest req) {
        // Optionally, only send a mock response for a specific endpoint
        // and method.
        
        //System.assertEquals('http://api.salesforce.com/foo/bar', req.getEndpoint());
        //System.assertEquals('GET', req.getMethod());
        
        // Create a fake response
        System.debug('Mock Got called');
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        if(req.getMethod() == 'POST')
        {
          System.debug('post Mock Got called');
          res.setBody(this.getSuccessJSON());
          res.setStatusCode(201);
        }
        else
        {
          System.debug('GET Mock Got called');
          if(this.getSuccessReturn)
            res.setBody(this.getSuccessJSON());
          else
            res.setBody(this.getFailedJSON());  

          res.setStatusCode(200);
        }
        


        return res;
    }

    private String getSuccessJSON()
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

     private String getFailedJSON()
    {
      String JSON = '{"totalResults":0,"schemas":["urn:ietf:params:scim:api:messages:2.0:ListResponse"]}';
      return JSON;
    }

   
}