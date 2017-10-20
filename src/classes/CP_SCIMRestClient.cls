public class CP_SCIMRestClient {
	
    private static string HTTP_HEADER_ACPT  = 'Accept';
    private static string CONTENT_TYPE      = 'Content-Type';
    private static String REST_CONTENT		= 'application/json';

    private static String REST_GET_METHOD	= 'GET';
    private static String REST_POST_METHOD	= 'POST';
    private static String REST_PUT_METHOD  = 'PUT';
    private static String REST_PATCH_METHOD  = 'PATCH';

    private static String USER_API_NAMED_CREDENTAIL	= 'IG_SCIM_User_API';
    private static String AUTH_API_NAMED_CREDENTAIL  = 'IG_SCIM_Auth_API';



    // Public Functions

        public Boolean UserNameExist(String userName)
        {
            Response res = this.getUserIdByUserName(userName);
            System.debug('User Name Exist:');
            System.debug(res);
            return res.success;
        }

        public Response RegisterNewUser(CP_RegistrationClass.RegistrationForm objForm)
        {
            Response response; 
            try
            {
                IGUser newUser = this.prepareNewUserForSCIM(objForm);

                String userJSON;
                userJSON = JSON.serialize(newUser); 
                userJSON = userJSON.replace('PlaceHolderForQuestionsListNode','urn:ietf:params:scim:schemas:extension:isam:1.0:UserKnowledgeQuestions');

                System.debug('This is what i am sending to ISAM');
                System.debug(userJSON);

                response = callPostRESTService(USER_API_NAMED_CREDENTAIL, userJSON);

                if(response.success)
                {
                    String userId; 
                    userId  = this.getSingleValueFromReturnedJSON(response.responseBody, 'id');
                    
                    if(!String.isBlank(userId))
                    {
                        response.responseBody = userId;
                    }
                    else
                    {
                        response = new Response(false, response.code, System.Label.CP_Generic_Server_Error_Instructions);
                    }
                }

                return response;
            }
            catch(Exception e)
            {
                System.debug('Exception Caught - CP_SCIMRestClient.RegisterNewUser: '+ e.getMessage());
                response = new Response(false, response.code, e.getMessage());
            }
            return response; 
        }


        public IGUser RetrieveUserByUserName(String userName)
        {
            Response res = this.getUserIdByUserName(userName);
            if(res.success)
            {
                return this.RetrieveUserByUserId(res.responseBody);
            }
            return null;    
        }
       
        public IGUser RetrieveUserByUserId(String userId)
        {
            Response res = this.callGetRESTService(USER_API_NAMED_CREDENTAIL, '/'+ userId);
            if(res.success)
            {
                res.responseBody = res.responseBody.replace('urn:ietf:params:scim:schemas:extension:isam:1.0:UserKnowledgeQuestions', 'PlaceHolderForQuestionsListNode');
                res.responseBody = res.responseBody.replace('urn:ietf:params:scim:schemas:extension:enterprise:2.0:User', 'orgChart');
                IGUser thisUser = (IGUser) JSON.deserialize(res.responseBody, IGUser.class);

                return thisUser;
            }
            return null;
        }
        

        public RandomSecurityQuestion getRandomSecurityQuestion(String userName)
        {
            RandomSecurityQuestion securityResponse = new RandomSecurityQuestion();

            String param = '?PolicyId=urn:ibm:security:authentication:asf:username_context&username='+ userName.toLowerCase();
            Response response = this.callGetRESTService(AUTH_API_NAMED_CREDENTAIL, param);

            if(response.success)
            {
                System.debug('Security Questioned returned JSON');
                System.debug(response.responseBody);

                try
                {
                    securityResponse.Question.stateId = getSingleValueFromReturnedJSON(response.responseBody, 'stateId');
                    securityResponse.Question.question = getSingleValueFromReturnedJSON(response.responseBody, 'knowledge.question.text');
                    securityResponse.Question.id = getSingleValueFromReturnedJSON(response.responseBody, 'knowledge.question.unique.id');
                    securityResponse.success = true;
                }
                catch(Exception e)
                {
                    System.debug('Exception Caught - CP_SCIMRestClient.getRandomSecurityQuestion: '+ e.getMessage());
                    securityResponse = new RandomSecurityQuestion(false, 500, e.getMessage());
                }
            }
            else
            {
                System.debug('Some Other Error in - CP_SCIMRestClient.getRandomSecurityQuestion: '+ response.error);
                securityResponse = new RandomSecurityQuestion(response.success, response.code, response.error);
            }
            return securityResponse;
        }

        public Response validateAnswer(RandomQuestion request)
        {
            String param = '?StateId='+ request.stateId;
            String strBody = '{ "knowledge.questions.count": "1", "knowledgeQuestions" : [ { "knowledge.question.answer": "'+ request.answer +'", "knowledge.question.unique.id": "'+ request.id +'" } ] }';

                System.debug('strBody content');
                System.debug(strBody);

            return  this.callPutRESTService(AUTH_API_NAMED_CREDENTAIL, strBody, param);
        }

        public Response updatePassword(IGUser igUser)
        {
            Response response; 
            try
            {
                response = this.getUserIdByUserName(igUser.username);
                if(response.success)
                {
                    String param = '/'+ response.responseBody;
                    String strBody = '{ "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"], "Operations":[ { "op":"replace", "value":{ "password":"'+ igUser.password +'" } } ] }';
                    response = this.callPatchRESTService(USER_API_NAMED_CREDENTAIL, strBody, param);   
                }
            }
            catch(Exception e)
            {
                response = new Response(false, 500, e.getMessage());
            }
            return response;
        }



    //







    // Other Private Funcitons 

        private IGUser prepareNewUserForSCIM(CP_RegistrationClass.RegistrationForm objForm)
        {
            IGUser newUser = new IGUser();

            newUser.name.givenName = objForm.Profile.firstName;
            newUser.name.familyName = objForm.Profile.lastName;
            newUser.displayName = objForm.Profile.firstName + ' '+ objForm.Profile.lastName;
            newUser.userName = objForm.Profile.username;

            ContactClass phoneNumber = new ContactClass();
            phoneNumber.type = 'mobile';
            phoneNumber.value= objForm.Profile.mobilePhone;
            phoneNumber.primary = false;
            newUser.phoneNumbers.add(phoneNumber);
            
            ContactClass email = new ContactClass();
            email.type = 'work';
            email.value= objForm.Profile.email;
            email.primary = false;
            newUser.emails.add(email);
            
            newUser.password = objForm.Profile.password;
            
            QuestionClass q1 = new QuestionClass();
            q1.id = '1';
            q1.answer = objForm.Profile.answer1;
            q1.question = objForm.Profile.securityQuestion1;
            newUser.PlaceHolderForQuestionsListNode.questions.add(q1);

            QuestionClass q2 = new QuestionClass();
            q2.id = '2';
            q2.answer = objForm.Profile.answer2;
            q2.question = objForm.Profile.securityQuestion2;
            newUser.PlaceHolderForQuestionsListNode.questions.add(q2);


            QuestionClass q3 = new QuestionClass();
            q3.id = '3';
            q3.answer = objForm.Profile.answer3;
            q3.question = objForm.Profile.securityQuestion3;
            newUser.PlaceHolderForQuestionsListNode.questions.add(q3);

            return newUser;
        }

        private String getSingleValueFromReturnedJSON(String isamJSON, String nodeName)
        {
            String returnValue; 

            JSONParser parser = JSON.createParser(isamJSON);
            while (parser.nextToken() != null) {
                if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && 
                    (parser.getText() == nodeName)) {
                    // Get the value.
                    parser.nextToken();
                    returnValue = parser.getText();
                }
            }
            if(String.isBlank(returnValue))
                return null;
            else
                return returnValue;
        }


        private Response getUserIdByUserName(String userName)
        {
            String location;
            String param = '?filter=userName%20ew%20'+ userName +'&attributes=userName';
            Response response = this.callGetRESTService(USER_API_NAMED_CREDENTAIL, param); 

            if(response.success)
            {
                location = this.getSingleValueFromReturnedJSON(response.responseBody, 'location');
                
                if(!String.isBlank(location))
                {
                    response.responseBody = location.substringAfterLast('/');
                }
                else
                {
                    response = new Response(false, response.code, 'User Not found');
                }
            }
            return response;
        }

        


    //










    // Core Private Functions    
        
        // GET
        private Response callGetRESTService(String namedCredential, String param) 
        {
        	Response ret;
        	try
        	{
        		HttpRequest req = new HttpRequest();
    	        req.setEndpoint('callout:' +  namedCredential + param);
    	        req.setMethod(REST_GET_METHOD);
    	        req.setHeader(HTTP_HEADER_ACPT, REST_CONTENT);
                req.setHeader(CONTENT_TYPE, REST_CONTENT);
    	        req.setTimeout(120000);
    	
    	        Http http = new Http();
    	        HTTPResponse res = http.send(req);
    	        
                System.debug('ISAM Response Object from GET');
                System.debug(res);
                System.debug(res.getBody());

    	        Integer resStatusCode = res.getStatusCode();
    	        ret = new Response((200 == resStatusCode), resStatusCode, res.getBody());
        	}
        	catch(exception e)
        	{
    	    	ret = new Response(false, 500, e.getMessage());
        	}
        	return ret;
        }
        
        
        //POST 
        private Response callPostRESTService(String namedCredential, String body) 
        {
        	Response ret;
        	try
        	{
    	    	HttpRequest req = new HttpRequest();
    	        req.setEndpoint('callout:' +  namedCredential);
    	        req.setMethod(REST_POST_METHOD);
    	        req.setHeader(HTTP_HEADER_ACPT, REST_CONTENT);
                req.setHeader(CONTENT_TYPE, REST_CONTENT);
    	        req.setTimeout(120000);
    	        req.setBody(body);

                System.debug('Data Sent to ISAM');
                System.debug(body);
                    System.debug(req);  


    	        Http http = new Http();
    	        HTTPResponse res = http.send(req);
    	    
                System.debug('ISAM Response Object from POST');
                System.debug(res);
                System.debug(res.getBody());

    	        Integer resStatusCode = res.getStatusCode();
    	        ret = new Response((201 == resStatusCode), resStatusCode, res.getBody());
            }
        	catch(exception e)
        	{
    	    	ret = new Response(false, 500, e.getMessage());
        	}
        	return ret;
        }

        //PUT
        private Response callPutRESTService(String namedCredential, String body, string param) {
          Response ret;
            try
            {
                HttpRequest req = new HttpRequest();
                req.setEndpoint('callout:' + namedCredential + param);
                req.setMethod(REST_PUT_METHOD);
                req.setHeader(HTTP_HEADER_ACPT, REST_CONTENT);
                req.setHeader(CONTENT_TYPE, REST_CONTENT);
                req.setTimeout(120000);
                req.setBody(body);

                System.debug('Data Sent to ISAM');
                System.debug(body);
                System.debug(req);

                Http http = new Http();
                HTTPResponse res = http.send(req);
            
                System.debug('ISAM Response Object from PUT');
                System.debug(res);
                System.debug(res.getBody());

                Integer resStatusCode = res.getStatusCode();
                ret = new Response((resStatusCode == 204 || resStatusCode == 200), resStatusCode, res.getBody());
            }
            catch(exception e)
            {
                ret = new Response(false, 500, e.getMessage());
            }
            return ret;
        }


        //PATCH
        private Response callPatchRESTService(String namedCredential, String body, String param)
        {
            Response ret;
            try
            {
                HttpRequest req = new HttpRequest();
                req.setEndpoint('callout:' +  namedCredential+ param);    //?_HttpMethod=PATCH'
                req.setMethod(REST_POST_METHOD);
                req.setHeader(HTTP_HEADER_ACPT, REST_CONTENT);
                req.setHeader(CONTENT_TYPE, REST_CONTENT);
                req.setHeader('X-HTTP-Method-Override', 'PATCH');
                req.setTimeout(120000);
                req.setBody(body);

                System.debug('Data Sent to ISAM');
                System.debug(body);
                    System.debug(req);  

                Http http = new Http();
                HTTPResponse res = http.send(req);
            
                System.debug('ISAM Response Object from PATCH');
                System.debug(res);
                System.debug(res.getBody());

                Integer resStatusCode = res.getStatusCode();
                ret = new Response((200 == resStatusCode), resStatusCode, res.getBody());
            }
            catch(exception e)
            {
                ret = new Response(false, 500, e.getMessage());
            }
            return ret;
        }


    // 





    // Sub Classes

        public class IGClientException extends Exception {}


        public virtual class Response {
            public boolean success 		{ get; set; }
            public Integer code 		{ get; set; }
            public String responseBody 	{ get; set; }    
            public String error			{ get {if (!success) return responseBody; else return '';} }    
            
            public Response() {
            	this.success = false;
            	this.code = 0;
            	this.responseBody ='';	
            }
            
            public Response(Boolean isSuccessful, Integer theCode, String theResponse) {
            	this.success = isSuccessful;
            	this.code = theCode;
            	this.responseBody = theResponse;
            }
        }
        

        public class IGUser
        {
        	public List<String> schemas {get; set;}
            public NameClass name {get; set;}
        	public String displayName {get; set;}
        	public String userName {get; set;}
        	public list<ContactClass> phoneNumbers {get; set;}
        	public List<ContactClass> emails {get; set;}
        	public String password {get; set;}
        	public QuestionsListClass PlaceHolderForQuestionsListNode {get; set;}

        	public IGUser()
        	{
        		this.schemas = new List<String>();
        		this.schemas.add('urn:ietf:params:scim:schemas:core:2.0:User');
        		this.schemas.add('urn:ietf:params:scim:schemas:extension:isam:1.0:UserKnowledgeQuestions');

        		this.name = new NameClass();
        		this.phoneNumbers = new List<ContactClass>();
        		this.emails = new List<ContactClass>();
    			this.PlaceHolderForQuestionsListNode = new QuestionsListClass();
        	}
        }


        public class NameClass
        {
        	public String givenName {get; set;}
        	public String familyName {get; set;}
        }


        public class ContactClass
        {
        	public String type {get; set;}
        	public String value {get; set;}
        	public Boolean primary {get; set;}
        }


        public class QuestionsListClass{
        	public List<QuestionClass> questions {get; set;}	
        	public QuestionsListClass()
        	{
        		this.questions = new List<QuestionClass>();
        	}
        }


        public class QuestionClass
        {
        	public String id {get; set;}
        	public String answer {get; set;}
        	public String question {get; set;}
        }



        // Random Questions 

        public class RandomSecurityQuestion extends Response
        {
            public RandomQuestion question {get; set;}

            public RandomSecurityQuestion(){
                super();
                this.question = new RandomQuestion();
            }   
            public RandomSecurityQuestion(Boolean isSuccessful, Integer theCode, String theResponse)
            {
                super(isSuccessful, theCode, theResponse);
                this.question = new RandomQuestion();
            }
        }

        public class RandomQuestion 
        {
            public String stateId {get; set;}
            public String question {get; set;}
            public String id {get; set;}
            public String answer {get; set;}
        }

    // 
}