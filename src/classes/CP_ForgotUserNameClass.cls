public class CP_ForgotUserNameClass {

    	public String clientNum { get; set; }
    	public String email { get; set; }
    	public String questionId { get; set; }
    	public String securityQuestion { get; set; }
    	public String answer { get; set; }
    	
    	
    	private boolean recordFailedAttemptAndLock()
        {
            Contact objCon = getContactByClientNumber();
            if (objCon.Portal_Action_Failure_Count__c > 3)
            {
                objCon.Portal_Action_Failure_Count__c = 0;
                objCon.Portal_Registration_Is_Locked__c = true;
                update objCon;
                return true;
            }
            else
            {
                objCon.Portal_Action_Failure_Count__c++;
                update objCon;
                return false;
            }
        }

        private boolean recordFailedSecurityAnswerAttemptAndLock()
        {
            Contact objCon = getContactByClientNumber();
            if (objCon.Portal_Security_Answer_Failure_Count__c > 1)
            {
                objCon.Portal_Security_Answer_Failure_Count__c = 0;
                objCon.Portal_Registration_Is_Locked__c = true;
                update objCon;
                return true;
            }
            else
            {
                objCon.Portal_Security_Answer_Failure_Count__c++;
                update objCon;
                return false;
            }
        }


    	// Search Contact by Business Partner ID
        private Contact getContactByClientNumber()
        {
            List<Contact> contactList = [select ID, Portal_User_Is_Registered__c, Email, 
                Portal_User_ID__c, Portal_Registration_Is_Locked__c, Portal_User_Name__c, 
                MailingPostalCode, Birthdate, Business_Partner_ID__c, Preferred_Language__c, 
                Portal_Action_Failure_Count__c, Portal_Security_Answer_Failure_Count__c
                from Contact 
                where Business_Partner_ID__c = : String.escapeSingleQuotes(this.clientNum) 
                AND Portal_User_Is_Registered__c = true
                AND Portal_User_Name__c != null AND Portal_User_Name__c != ''];

            System.debug(contactList);

            if(contactList.isEmpty())
                return null;
            else
                return contactList[0];
        }

        private boolean sendEmail()
        {
        	return true;
        }


        public CP_Response verifyClient()
        {
        	CP_Response response = new CP_Response();
        	try
        	{
        		if(String.isBlank(this.clientNum))
	            {
		            // Client Number is empty
	    	        response.State.IsValid = false;
	        	    response.State.Fields.add('clientNum');
	            	response.State.Messages.add(System.Label.CP_Registration_Client_Number_Is_Empty);
	            }
	            else if(String.isBlank(this.email))
	            {
		            // Client Number is empty
	    	        response.State.IsValid = false;
	        	    response.State.Fields.add('email');
	            	response.State.Messages.add(System.Label.CP_Registration_Email_Is_empty);
	            }
	            else if (!response.IsValidEmail(this.email))
	        	{
		            // Email is not valid 
		            response.State.IsValid = false;
		            response.State.Fields.add('email');
		            response.State.Messages.add(System.Label.CP_Registration_Email_Is_Invalid);   
		        }
	            else
	            {
	                Contact objContact = this.getContactByClientNumber();
	                if(objContact == null)
	                {
	                    response.State.IsValid = false;
	                    response.State.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);    
	                }
	                else if(objContact.email != this.email)
	                {   
	                    response.State.IsValid = false;
	                    response.State.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);
	                }
	                else
	                {
	                    if(objContact.Portal_Registration_Is_Locked__c == true)
	                    {
	                        response.State.IsValid = false;
	                        response.State.IsLocked = true;
	                    }
	                    else
	                    {
	                        response.State.IsValid = true;
	                    }
	                }
	            }
        	}
        	catch(exception e)
        	{
	            response.State.IsValid = false;
	            response.State.Messages.add(e.getMessage());
        	}
        	return response;
        }


        public SecurityQuestions getSecurityQuestion()
        {
        	SecurityQuestions response = new SecurityQuestions();
        	try
        	{
        		Contact objContact = this.getContactByClientNumber();
                System.debug('Contact Object');
                System.debug(objContact);

                if(objContact != null)
                {
                    if(objContact.Portal_Registration_Is_Locked__c == true)
                    {
                        response.State.IsValid = false;
                        response.State.IsLocked = true;
                    }
                    else
                    {
                        CP_SCIMRestClient restClient = new CP_SCIMRestClient();
                        CP_SCIMRestClient.IGUser thisUser; 
                        
                        response.State.IsValid = true; 
                        response.State.IsLocked = false; 
                        response.Questions.add(new CP_ForgotUserNameClass.QuestionClass('1', 'this is a hard coded question'));
                        
                        /*
                        if(!String.isBlank(objContact.Portal_User_Id__c))
                        {
                            //thisUser = restClient.RetrieveUserByUserId(objContact.Portal_User_Id__c);
                        }  
                        else
                        {
                            //thisUser = restClient.RetrieveUserByUserName(objContact.Portal_User_Name__c);
                        }
                        */
                       
                        System.debug('IG User Returned from ISAM');
                        System.debug(response);
                    }
                }
                else
                {
                    response.State = new CP_Response.Result();
                    response.State.IsValid = false;
                    response.State.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);
                }
        	}
        	catch(exception e)
        	{
        		response.State.IsValid = false;
	            response.State.Messages.add(e.getMessage());
        	}
        	return response;
        }

        public CP_Response verifySecurityAnswer()
        {
        	CP_Response response = new CP_Response();
        	try
        	{
        		if(this.answer == 'answer')
        		{
					response.State.IsValid = true;
        		}
        		else
        		{
        			response.State.IsValid = false;
        			response.State.Fields.add('answer');
	        		response.State.Messages.add(System.Label.CP_Forgot_UserName_Incorrect_Answer);	
        		}
        	}
        	catch(exception e)
        	{
        		response.State.IsValid = false;
	            response.State.Messages.add(e.getMessage());
        	}
        	return response;
        }



        public class SecurityQuestions extends CP_Response
        {
        	public List<QuestionClass> Questions {get; set;}
        	
        	public SecurityQuestions()
        	{
        		super();
        		this.Questions = new List<QuestionClass>();
			}
        }

        public class QuestionClass
        {
        	public String id {get; set;}
        	public String question {get; set;}

        	public QuestionClass()
        	{

        	}	
        	public QuestionClass(string i, string q)
        	{
        		this.id = i;
        		this.question = q;
        	}
        }

}