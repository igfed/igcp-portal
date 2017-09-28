public class CP_ForgotPasswordClass {

    	public String username { get; set; }
    	public String postalCode { get; set; }
    	public String dob { get; set; }

    	public String questionId { get; set; }
    	public String securityQuestion { get; set; }
    	public String answer { get; set; }
    	
    	
    	private boolean recordFailedAttemptAndLock()
        {
            Contact objCon = this.getContactByUserName();
            if(objCon != null)
            {
            	if (objCon.Portal_Action_Failure_Count__c > 3)
	            {
	                objCon.Portal_Action_Failure_Count__c = 0;
	                objCon.Portal_User_Is_Locked__c	 = true;
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
	        return false;
        }

        private boolean recordFailedSecurityAnswerAttemptAndLock()
        {
            Contact objCon = this.getContactByUserName();
            if(objCon != null)
            {
            	if (objCon.Portal_Security_Answer_Failure_Count__c > 1)
	            {
	                objCon.Portal_Security_Answer_Failure_Count__c = 0;
	                objCon.Portal_User_Is_Locked__c	 = true;
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
            return false;
        }


    	// Search Contact by Business Partner ID
        private Contact getContactByUserName()
        {
            List<Contact> contactList = [select ID, Portal_User_Is_Registered__c, Email, 
                Portal_User_ID__c, Portal_User_Name__c, 
                MailingPostalCode, Birthdate, Business_Partner_ID__c, Preferred_Language__c, 
                Portal_Action_Failure_Count__c, Portal_Security_Answer_Failure_Count__c, 
                Portal_User_Is_Locked__c
                from Contact 
                where Portal_User_Name__c = : String.escapeSingleQuotes(this.username)
                AND Portal_User_Is_Registered__c = true
                AND Portal_User_Name__c != null AND Portal_User_Name__c != ''];

            System.debug(contactList);

            if(contactList.isEmpty())
                return null;
            else
                return contactList[0];
        }

        

        public CP_Response verifyClient()
        {
        	CP_Response response = new CP_Response();
        	try
        	{
                Contact objContact = this.getContactByUserName();
                if(objContact == null)
                {
                    response.State.IsValid = false;
                    response.State.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);    
                }
                else if(objContact.MailingPostalCode.remove(' ').remove('-').toUpperCase() != this.postalCode.remove(' ').remove('-').toUpperCase())
                {   
                    response.State.IsValid = false;
                    response.State.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);
                }
                else if(objContact.Birthdate != Date.valueOf(this.dob))
                {   
                    response.State.IsValid = false;
                    response.State.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);
                }
                else
                {
                    if(objContact.Portal_User_Is_Locked__c == true)
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
        		Contact objContact = this.getContactByUserName();
                System.debug('Contact Object');
                System.debug(objContact);

                if(objContact != null)
                {
                    if(objContact.Portal_User_Is_Locked__c == true)
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
                        response.Questions.add(new CP_ForgotPasswordClass.QuestionClass('1', 'this is a hard coded question'));
                        
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
        		Contact objContact = this.getContactByUserName();
                System.debug('Contact Object');
                System.debug(objContact);

                if(objContact != null)
                {
                    if(objContact.Portal_User_Is_Locked__c == true)
                    {
                        response.State.IsValid = false;
                        response.State.IsLocked = true;
                    }
                    else
                    {
                        CP_SCIMRestClient restClient = new CP_SCIMRestClient();
                        CP_SCIMRestClient.IGUser thisUser; 
                        
                        if(this.answer == 'answer')
		        		{
							response.State.IsValid = true;
		        		}
		        		else
		        		{
		        			response.State.IsValid = false;
		        			response.State.IsLocked = this.recordFailedSecurityAnswerAttemptAndLock();
		        			response.State.Fields.add('answer');

			        		response.State.Messages.add(System.Label.CP_Forgot_UserName_Incorrect_Answer);	
		        		}
                    }
                }
                else
                {
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