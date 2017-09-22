public with sharing class CP_ForgotUserNameController {
	

	@AuraEnabled
    public static string StepOne(String payload)
    {
        System.debug('I am in Step One');
        ForgotUserNameResponse response = new ForgotUserNameResponse(); 
        try
        {
            System.debug('JSON String');
            System.debug(payload);

            // Deserialize the passed JSON into User Identity Object     
            response = (ForgotUserNameResponse) JSON.deserialize(payload, ForgotUserNameResponse.class);
           	response.State = new CP_Response.Result();

            if(String.isBlank(response.clientNum))
            {
	            // Client Number is empty
    	        response.State.IsValid = false;
        	    response.State.Fields.add('clientNum');
            	response.State.Messages.add(System.Label.CP_Registration_Client_Number_Is_Empty);
            }
            else if(String.isBlank(response.email))
            {
	            // Client Number is empty
    	        response.State.IsValid = false;
        	    response.State.Fields.add('email');
            	response.State.Messages.add(System.Label.CP_Registration_Email_Is_empty);
            }
            else if (!response.IsValidEmail(response.email))
        	{
	            // Email is not valid 
	            response.State.IsValid = false;
	            response.State.Fields.add('email');
	            response.State.Messages.add(System.Label.CP_Registration_Email_Is_Invalid);   
	        }
	        else if(!response.validateClientNumberAndEmail())
			{
				response.State.IsValid = false;
    	        response.State.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);
			}
			else
			{
				response.State.IsValid = true;
			}
        }
        catch(exception e)
        {
        	response.State = new CP_Response.Result();
            response.State.IsValid = false;
            response.State.Messages.add(e.getMessage());
        }

        // Serialize the result object and return as string
        return JSON.serialize(response);
    }


    @AuraEnabled
    public static String getSecurityQuestion(string clientNumber, Integer failedAttempts)
    {
    	ForgotUserNameResponse response = new ForgotUserNameResponse(clientNumber);
    	try
    	{
	   		Contact objContact = response.getContactByClientNumber();

	   		if(objContact != null)
	   		{

	   		}
	   		else
	   		{
	   			response.State = new CP_Response.Result();
	            response.State.IsValid = false;
	            response.State.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);
	   		}
    	}
	    catch (exception e)
	    {
	    	response.State = new CP_Response.Result();
            response.State.IsValid = false;
            response.State.Messages.add(e.getMessage());
	    }
    	
    	return JSON.serialize(response);
    }


    @AuraEnabled
    public static String StepTwo(String payload)
    {
    	ForgotUserNameResponse response = new ForgotUserNameResponse();
    	try
    	{
    		// Deserialize the passed JSON into User Identity Object     
            response = (ForgotUserNameResponse) JSON.deserialize(payload, ForgotUserNameResponse.class);
           	response.State = new CP_Response.Result();

           	Contact objContact = response.getContactBYClientNumber();

            if(objContact == null)
			{
				response.State.IsValid = false;
    	        response.State.Messages.add(System.Label.CP_Forgot_User_Name_Client_Number_or_Email_is_not_Valid);
			}
			else
			{

				response.State.IsValid = true;
			}
    	}
    	catch(exception e)
    	{
    		response.State = new CP_Response.Result();
            response.State.IsValid = false;
            response.State.Messages.add(e.getMessage());
    	}

    	return JSON.serialize(response);
    }



    public class ForgotUserNameResponse extends CP_Response{

    	public String clientNum { get; set; }
    	public String email { get; set; }
    	public String securityQuestion { get; set; }
    	public String answer { get; set; }
    	public Integer failedAttempts { get; set; }

    	public ForgotUserNameResponse()
    	{
    		super();
    		this.failedAttempts = 0;
    	}

		public ForgotUserNameResponse(String clientNumber)
    	{
    		super();
    		this.clientNum = clientNumber;
    		this.failedAttempts = 0;
    	}

    	// Search Contact by Business Partner ID
        public Boolean validateClientNumberAndEmail()
        {
            List<Contact> contactList = [select ID, Portal_User_Is_Registered__c, Email, Portal_User_ID__c, 
                Portal_User_Name__c, MailingPostalCode, Birthdate, Business_Partner_ID__c, Preferred_Language__c 
                from Contact 
                where Business_Partner_ID__c = : String.escapeSingleQuotes(this.clientNum) 
                AND Email = : String.escapeSingleQuotes(this.email)];

            System.debug(contactList);

            if(contactList.isEmpty())
                return false;
            else
                return true;
        }

        public Contact getContactBYClientNumber()
        {
            List<Contact> contactList = [select ID, Portal_User_Is_Registered__c, Email, Portal_User_ID__c, 
                Portal_User_Name__c, MailingPostalCode, Birthdate, Business_Partner_ID__c, Preferred_Language__c 
                from Contact 
                where Business_Partner_ID__c = : String.escapeSingleQuotes(this.clientNum)];

            System.debug(contactList);

            if(contactList.isEmpty())
                return null;
            else
                return contactList[0];
        }

    }
    

}