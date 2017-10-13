public class CP_ForgotUserNameClass {

    	public String clientNum { get; set; }
    	public String email { get; set; }

        public String stateId {get; set;}
        public String id { get; set; }
        public String question { get; set; }
        public String answer { get; set; }


    	public CP_Response.Result verifyClient()
        {
            CP_Response.Result state = new CP_Response.Result();
            try
            {
                Contact objContact = this.getContactByClientNumber();
                System.debug(objContact);

                if(objContact == null)
                {
                    state.IsValid = false;
                    state.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);    
                }
                else
                {
                    if(objContact.Portal_User_Is_Locked__c == true)
                    {   
                        state.IsValid = false;
                        state.IsLocked = true;
                        state.Messages.add(System.Label.CP_Registration_Locked_h1);
                    }
                    else if (objContact.Portal_User_Is_Registered__c == false)
                    {
                        state.IsValid = false;
                        state.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);
                    }
                    else
                    {       
                        if(objContact.email != this.email)
                        {   
                            state.IsValid = false;
                            state.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);
                        }
                    }
                }
            }
            catch(exception e)
            {
                state.IsValid = false;
                System.debug('Exception Caught - CP_ForgotUserNameClass.verifyClient: '+ e.getMessage());
                state.Messages.add(System.Label.CP_Generic_Server_Error_Instructions);
            }
            return state;
        }



        public SecurityQuestion getSecurityQuestion()
        {
            SecurityQuestion response = new SecurityQuestion();
            try
            {
                Contact objContact = this.getContactByClientNumber();
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

                        isamResponse = restClient.getRandomSecurityQuestion(objContact.Portal_User_Name__c);
                        System.debug('Response from rest client get random question');
                        System.debug(isamResponse);

                        if(isamResponse.success)
                        {
                            response.question = isamResponse.question;
                        }
                        else
                        {
                            response.State.IsValid = false; 
                            response.State.ServiceNotAvailable = true; 
                            response.State.Messages.add(System.Label.CP_Generic_Server_Error_Instructions);
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
                System.debug('Exception Caught - CP_ForgotUserNameClass.getSecurityQuestion: '+ e.getMessage());
                response.State.Messages.add(System.Label.CP_Generic_Server_Error_Instructions);
            }
            return response;
        }




        public CP_Response.Result verifySecurityAnswer()
        {
            CP_Response.Result state = new CP_Response.Result();
            try
            {
                Contact objContact = this.getContactByClientNumber();
                System.debug('Contact Object');
                System.debug(objContact);

                if(objContact != null)
                {
                    if(objContact.Portal_User_Is_Locked__c == true)
                    {
                        state.IsValid = false;
                        state.IsLocked = true;
                    }
                    else
                    {
                        CP_SCIMRestClient restClient = new CP_SCIMRestClient();
                        CP_SCIMRestClient.RandomQuestion request = new CP_SCIMRestClient.RandomQuestion();
                        CP_SCIMRestClient.Response isamResponse;

                        request.id = this.id;
                        request.stateId = this.stateId; 
                        request.answer = this.answer;
                        
                        System.debug('Passsing this to rest client');
                        System.debug(request);

                        isamResponse = restClient.validateAnswer(request);

                        System.debug('Response from rest client');
                        System.debug(isamResponse);

                        if(isamResponse.success && isamResponse.code == 204)
                        {
                            state.IsValid = true;
                            Boolean emailSent  = this.sendEmail();
                            System.debug('Email SENT: ' + emailSent);
                        }
                        else if(isamResponse.success && isamResponse.code == 200)
                        {
                            System.debug('respose was 200 ');

                            state.IsValid = false;
                            state.IsLocked = this.recordFailedSecurityAnswerAttemptAndLock();
                            state.Fields.add('answer');
                            state.Messages.add(System.Label.CP_Forgot_UserName_Incorrect_Answer);  
                        }
                        else
                        {
                            state.IsValid = false;
                            state.IsLocked = this.recordFailedSecurityAnswerAttemptAndLock();
                            state.Messages.add(isamResponse.error);
                        }
                    }
                }
                else
                {
                    state.IsValid = false;
                    state.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);
                }
            }
            catch(exception e)
            {
                state.IsValid = false;
                System.debug('Exception Caught - CP_ForgotUserNameClass.verifySecurityAnswer: '+ e.getMessage());
                state.Messages.add(System.Label.CP_Generic_Server_Error_Instructions);
            }
            return state;
        }









    	private boolean recordFailedAttemptAndLock()
        {
            Contact objCon = this.getContactByClientNumber();
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
            Contact objCon = this.getContactByClientNumber();

            System.debug('Lock the USER ');
            System.debug(objCon.Portal_Security_Answer_Failure_Count__c);
            System.debug(objCon.Portal_User_Is_Locked__c);

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
        private Contact getContactByClientNumber()
        {
            List<Financial_Asset__c> assetList = [select Customer__r.ID, Customer__r.FirstName, Customer__r.LastName, 
                                    Customer__r.Portal_User_Is_Registered__c, Customer__r.Email, Customer__r.Portal_User_ID__c, 
                                Customer__r.Portal_User_Name__c, Customer__r.MailingPostalCode, Customer__r.Birthdate, 
                                Customer__r.Business_Partner_ID__c, Customer__r.Preferred_Language__c, Customer__r.Phone, 
                                Customer__r.Portal_Action_Failure_Count__c, Customer__r.Portal_Registration_Is_Locked__c,
                                Customer__r.Portal_User_Consent_Date__c, Customer__r.Portal_User_Consent_Obtained__c, 
                                Customer__r.Portal_Registration_Eligible__c, Customer__r.Portal_Security_Answer_Failure_Count__c, 
                                Customer__r.Portal_User_Is_Locked__c
                FROM Financial_Asset__c
                WHERE 
                                 (RecordType.DeveloperName = 'Investment_Asset'  AND Client_Number__c = : String.escapeSingleQuotes(this.clientNum))
                                  OR (RecordType.DeveloperName = 'Loan_Asset'  AND Loan_Number__c = : String.escapeSingleQuotes(this.clientNum))
                                  OR (RecordType.DeveloperName = 'Policy_Asset'  AND Policy_Number__c = : String.escapeSingleQuotes(this.clientNum))
                ];


                if(assetList.isEmpty())
                    return null;
                else
                {
                    Contact objContact = new Contact();
                    objContact.ID = assetList[0].Customer__r.ID;
                    objContact.FirstName = assetList[0].Customer__r.FirstName;
                    objContact.LastName = assetList[0].Customer__r.LastName;
                    objContact.Portal_User_Is_Registered__c = assetList[0].Customer__r.Portal_User_Is_Registered__c;
                    objContact.Email = assetList[0].Customer__r.Email;
                    objContact.Phone = assetList[0].Customer__r.Phone;
                    objContact.Portal_User_ID__c = assetList[0].Customer__r.Portal_User_ID__c;
                    objContact.Portal_User_Name__c = assetList[0].Customer__r.Portal_User_Name__c;
                    objContact.MailingPostalCode = assetList[0].Customer__r.MailingPostalCode;
                    objContact.Birthdate = assetList[0].Customer__r.Birthdate;
                    objContact.Business_Partner_ID__c = assetList[0].Customer__r.Business_Partner_ID__c;
                    objContact.Preferred_Language__c = assetList[0].Customer__r.Preferred_Language__c;
                    objContact.Portal_Action_Failure_Count__c = assetList[0].Customer__r.Portal_Action_Failure_Count__c;
                    objContact.Portal_Registration_Is_Locked__c = assetList[0].Customer__r.Portal_Registration_Is_Locked__c;
                    objContact.Portal_User_Consent_Date__c = assetList[0].Customer__r.Portal_User_Consent_Date__c;
                    objContact.Portal_User_Consent_Obtained__c = assetList[0].Customer__r.Portal_User_Consent_Obtained__c;
                    objContact.Portal_Security_Answer_Failure_Count__c = assetList[0].Customer__r.Portal_Security_Answer_Failure_Count__c;
                    objContact.Portal_User_Is_Locked__c = assetList[0].Customer__r.Portal_User_Is_Locked__c;
                    
                    return objContact;
                }
        }

        
        private User getUserByUserName(String userName)
        {
            List<User> userList = [select ID, Username, Email
                from User 
                where username = : String.escapeSingleQuotes(userName)];

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
                Contact objContact = this.getContactByClientNumber();
                if(objContact != null)
                {
                    String emailTemplate = objContact.Preferred_Language__c == 'French' ? 'IG_Forgot_User_Name_French' : 'IG_Forgot_User_Name_English';
                    
                    User objUser  = this.getUserByUserName(objContact.Portal_User_Name__c);
                    System.debug('=====> objUser: ' + objUser);
                    if(objUser != null)
                        CP_Utility.sendTemplatedEmail(emailTemplate, objUser.Id, objContact.ID);
                    else
                        CP_Utility.sendTemplatedEmail(emailTemplate, objContact.ID, objContact.ID);
                }
            }
            catch(exception e)
            {
                System.debug('Email Exception'+ e.getMessage());
                return false;
            }
            return true;
        }
       
        



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