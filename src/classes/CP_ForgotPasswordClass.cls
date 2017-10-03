public class CP_ForgotPasswordClass {

    	public String username { get; set; }
    	public String postalCode { get; set; }
    	public String dob { get; set; }

        public String stateId {get; set;}
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
            List<Contact> contactList = [select ID, Portal_User_Is_Registered__c,
                Portal_User_ID__c, Portal_User_Name__c, Email, Phone, 
                MailingPostalCode, Birthdate, Business_Partner_ID__c, Preferred_Language__c, 
                Portal_Action_Failure_Count__c, Portal_Security_Answer_Failure_Count__c, 
                Portal_User_Is_Locked__c
                from Contact 
                where Portal_User_Name__c = : String.escapeSingleQuotes(this.username)
                AND Portal_User_Is_Registered__c = true];

            System.debug(contactList);

            if(contactList.isEmpty())
                return null;
            else
                return contactList[0];
        }


        public CP_Response.Result verifyClient()
        {
        	CP_Response.Result state = new CP_Response.Result();
        	try
        	{
                Contact objContact = this.getContactByUserName();
                if(objContact == null)
                {
                    state.IsValid = false;
                    state.Messages.add(System.Label.CP_Forgot_Pass_User_Name_Not_Found);
                }
                else
                {
                    if(objContact.Portal_User_Is_Locked__c == true)
                    {
                            state.IsValid = false;
                            state.IsLocked = true;
                    }
                    else
                    {
                        if(!CP_Utility.PostalCodeMatched(this.postalCode, objContact.MailingPostalCode))
                        {   
                            state.IsValid = false;
                            state.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);
                            state.IsLocked = this.recordFailedAttemptAndLock();
                        }
                        else if(objContact.Birthdate != Date.valueOf(this.dob))
                        {   
                            state.IsValid = false;
                            state.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);
                            state.IsLocked = this.recordFailedAttemptAndLock();
                        }
                    }
                }
        	}
        	catch(exception e)
        	{
	            state.IsValid = false;
	            state.Messages.add(e.getMessage());
        	}
        	return state;
        }


        public SecurityQuestion getSecurityQuestion()
        {
        	SecurityQuestion response = new SecurityQuestion();
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

                        response.Question.stateId= '123456789-987654321-147258369-963852741';
                        response.Question.id = '1';
                        response.Question.question = 'Hard coded question from Forgot passord Class';

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



        public class SecurityQuestion extends CP_Response
        {
            public RandomQuestion Question {get; set;}
            public SecurityQuestion()
        	{
        		super();
                this.Question = new RandomQuestion();
			}
        }

        public class RandomQuestion
        {
            public String stateId {get; set;}
            public String id {get; set;}
            public String question {get; set;}
        }

}