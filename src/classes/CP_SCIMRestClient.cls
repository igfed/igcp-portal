public class CP_SCIMRestClient {
	
    private static string HTTP_HEADER_ACPT  = 'Accept';
    private static string CONTENT_TYPE      = 'Content-Type';
    private static String REST_CONTENT		= 'application/json';

    private static String REST_GET_METHOD	= 'GET';
    private static String REST_POST_METHOD	= 'POST';
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

                response = callPostRESTService(USER_API_NAMED_CREDENTAIL, userJSON);

                if(response.success)
                {
                    String userId; 
                    userId  = this.getNewUserIdFromReturnedJSON(response.responseBody);
                    
                    if(!String.isBlank(userId))
                    {
                        response.responseBody = userId;
                    }
                    else
                    {
                        response = new Response(false, response.code, 'Something went wrong');
                    }
                }

                return response;
            }
            catch(Exception e)
            {
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
        
  

        public String getRandomSecurityQuestion(String userId)
        {
            QuestionClass randomQuestion = new QuestionClass();
            IGUser thisUser = this.RetrieveUserByUserId(userId);
            if(thisUser != null)
            {
                System.debug('IG User from ISAM');
                System.debug(thisUser);

                randomQuestion.id = '1';
                randomQuestion.question = 'some question';
                return JSON.serialize(randomQuestion);
            }
            return null;
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

        private String getNewUserIdFromReturnedJSON(String isamJSON)
        {
            String userId; 

            JSONParser parser = JSON.createParser(isamJSON);
            while (parser.nextToken() != null) {
                if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && 
                    (parser.getText() == 'id')) {
                    // Get the value.
                    parser.nextToken();
                    userId = parser.getText();
                }
            }
            if(String.isBlank(userId))
                return null;
            else
                return userId;
        }


        private String getUserLocationFromReturnedJSON(String isamJSON)
        {
            String location;

            JSONParser parser = JSON.createParser(isamJSON);
            while (parser.nextToken() != null) {
                if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) && 
                    (parser.getText() == 'location')) {
                    // Get the value.
                    parser.nextToken();
                    location = parser.getText();
                }
            }

            if(String.isBlank(location))
                return null;
            else 
                return location;
        }


        private Response getUserIdByUserName(String userName)
        {
            String location;
            String param = '?filter=userName%20ew%20'+ userName +'&attributes=userName';
            Response response = this.callGetRESTService(USER_API_NAMED_CREDENTAIL, param); 

            if(response.success)
            {
                location = this.getUserLocationFromReturnedJSON(response.responseBody);
                
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
        private Response callGetRESTService(String namedCredential, String param) {
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
        private Response callPostRESTService(String namedCredential, String body, String param) {
        	Response ret;
        	try
        	{
    	    	HttpRequest req = new HttpRequest();
    	        req.setEndpoint('callout:' +  namedCredential + param);
    	        req.setMethod(REST_POST_METHOD);
    	        req.setHeader(HTTP_HEADER_ACPT, REST_CONTENT);
                req.setHeader(CONTENT_TYPE, REST_CONTENT);
    	        req.setTimeout(120000);
    	        req.setBody(body);

                System.debug('Data Sent to ISAM');
                System.debug(body);

    	        Http http = new Http();
    	        HTTPResponse res = http.send(req);
    	    
                System.debug('ISAM Response Object from POST');
                System.debug(res);

    	        Integer resStatusCode = res.getStatusCode();
    	        ret = new Response((201 == resStatusCode), resStatusCode, res.getBody());
            }
        	catch(exception e)
        	{
    	    	ret = new Response(false, 500, e.getMessage());
        	}
        	return ret;
        }

        private Response callPostRESTService(String namedCredential, String body) {
            Response ret;
            try
            {
                HttpRequest req = new HttpRequest();
                req.setEndpoint('callout:' +  namedCredential);
                req.setMethod(REST_POST_METHOD);
                req.setHeader(HTTP_HEADER_ACPT, REST_CONTENT);
                req.setTimeout(120000);
                req.setBody(body);

                System.debug('Data Sent to ISAM');
                System.debug(body);

                Http http = new Http();
                HTTPResponse res = http.send(req);
            
                System.debug('ISAM Response Object from POST');
                System.debug(res);

                Integer resStatusCode = res.getStatusCode();
                ret = new Response((201 == resStatusCode), resStatusCode, res.getBody());
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

    // 
}