public class CP_ForgotPasswordClass {

    	public String username { get; set; }
    	public String postalCode { get; set; }
    	public String dob { get; set; }

        public String stateId {get; set;}
    	public String id { get; set; }
    	public String question { get; set; }
    	public String answer { get; set; }

        public String password { get; set; }
        public String confirmPassword { get; set; }        
    	


// Public Functions 

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
                        CP_SCIMRestClient.RandomSecurityQuestion isamResponse; 

                        isamResponse = restClient.getRandomSecurityQuestion(this.username);
                        System.debug('Response from rest client get random question');
                        System.debug(isamResponse);

                        if(isamResponse.success)
                        {
                            response.question = isamResponse.question;
                        }
                        else
                        {
                            response.State.IsValid = false;   
                            response.State.Messages.add(isamResponse.error);
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
                        CP_SCIMRestClient.RandomQuestion request = new CP_SCIMRestClient.RandomQuestion();
                        CP_SCIMRestClient.Response isamResponse;

                        request.id = this.id;
                        request.stateId = this.stateId; 
                        request.answer = this.answer;

                        isamResponse = restClient.validateAnswer(request);

                        if(isamResponse.success && isamResponse.code == 204)
		        		{
							response.State.IsValid = true;
		        		}
		        		else if(isamResponse.success && isamResponse.code == 200)
		        		{
		        			response.State.IsValid = false;
		        			response.State.IsLocked = this.recordFailedSecurityAnswerAttemptAndLock();
		        			response.State.Fields.add('answer');
			        		response.State.Messages.add(System.Label.CP_Forgot_UserName_Incorrect_Answer);	
		        		}
                        else
                        {
                            response.State.IsValid = false;
                            response.State.Messages.add(isamResponse.error);
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

        public CP_Response updatePassword()
        {
            CP_Response response = new CP_Response();
            try
            {
                CP_SCIMRestClient restClient = new CP_SCIMRestClient();
                CP_SCIMRestClient.IGUser thisUser = new CP_SCIMRestClient.IGUser();
                CP_SCIMRestClient.Response isamResponse;

                thisUser.username = this.username; 
                thisUser.password = this.password; 

                isamResponse = restClient.updatePassword(thisUser);
                
                System.debug('iSAM reponse after Update Password');
                System.debug(isamResponse);

                if(isamResponse.success)
                {
                    System.debug('calling sendEmail');
                    response.State.IsValid = true;
                    Boolean emailSent  = this.sendEmail();
                    System.debug('Email SENT: ' + emailSent);
                }
                else
                {
                    response.State.IsValid = false;
                    response.State.Messages.add(isamResponse.error);
                }
            }
            catch(exception e)
            {
                response.State.IsValid = false;
                response.State.Messages.add(e.getMessage());
            }
            return response;
        }

//



// Private Function 


        private boolean recordFailedAttemptAndLock()
        {
            Contact objCon = this.getContactByUserName();
            if(objCon != null)
            {
                if (objCon.Portal_Action_Failure_Count__c > 3)
                {
                    objCon.Portal_Action_Failure_Count__c = 0;
                    objCon.Portal_User_Is_Locked__c  = true;
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
                    objCon.Portal_User_Is_Locked__c  = true;
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

        private User getUserByUserName()
        {
            List<User> userList = [select ID, Username, Email
                from User 
                where username = : String.escapeSingleQuotes(this.username)];

            System.debug(userList);

            if(userList.isEmpty())
                return null;
            else
                return userList[0];
        }



        private Boolean sendEmail()
        {
            try
            {
                Contact objContact = this.getContactByUserName();
                if(objContact != null)
                {
                    String emailTemplate = objContact.Preferred_Language__c == 'French' ? 'IG_Forgot_Password_French' : 'IG_Forgot_Password_English';
                    OrgWideEmailAddress owa  = [SELECT ID, Address from OrgWideEmailAddress where Address  ='derek.chu@investorsgroup.com']; 
                    
                    User objUser  = this.getUserByUserName();
                    if(objUser != null)
                    {
                        if(owa != null)
                             CP_Utility.sendTemplatedEmail(emailTemplate, objUser.Id, objContact.ID, owa.Id);
                        else
                             CP_Utility.sendTemplatedEmail(emailTemplate, objUser.Id, objContact.ID, null);
                    }
                    else
                    {
                        if(owa != null)
                             CP_Utility.sendTemplatedEmail(emailTemplate, objContact.ID, objContact.ID, owa.Id);
                        else
                             CP_Utility.sendTemplatedEmail(emailTemplate, objContact.ID, objContact.ID, null);
                    }
                }
            }
            catch(exception e)
            {
                System.debug('Email Exception'+ e.getMessage());
                return false;
            }
            return true;
        }

// 



// Sub Classes


        public class SecurityQuestion extends CP_Response
        {
            public CP_SCIMRestClient.RandomQuestion question {get; set;}
            public SecurityQuestion()
        	{
        		super();
                this.question = new CP_SCIMRestClient.RandomQuestion();
			}
        }

//


}