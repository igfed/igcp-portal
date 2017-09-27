public with sharing class CP_ForgotUserNameController {
	

	@AuraEnabled
    public static string StepOne(String payload)
    {
        System.debug('I am in Step One');
        CP_ForgotUserNameClass objForm = new CP_ForgotUserNameClass(); 
        CP_Response response = new CP_Response();
        try
        {
            System.debug('JSON String');
            System.debug(payload);

            // Deserialize the passed JSON into User Identity Object     
            objForm = (CP_ForgotUserNameClass) JSON.deserialize(payload, CP_ForgotUserNameClass.class);
           	
            response = objForm.verifyClient();
            
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
    public static String getSecurityQuestion(String payload)
    {
    	CP_ForgotUserNameClass objForm = new CP_ForgotUserNameClass();
        CP_ForgotUserNameClass.SecurityQuestions response = new CP_ForgotUserNameClass.SecurityQuestions();
    	try
    	{
            System.debug('JSON String');
            System.debug(payload);

            // Deserialize the passed JSON into User Identity Object     
            objForm = (CP_ForgotUserNameClass) JSON.deserialize(payload, CP_ForgotUserNameClass.class);

            if(String.isBlank(objForm.clientNum))
            {
                // Client Number is empty
                response.State.IsValid = false;
                response.State.Fields.add('clientNum');
                response.State.Messages.add(System.Label.CP_Registration_Client_Number_Is_Empty);
            }
            else
            {
                response = objForm.getSecurityQuestion();
            }
    	}
	    catch (exception e)
	    {
	    	response.State = new CP_Response.Result();
            response.State.IsValid = false;
            response.State.Messages.add(e.getMessage());
	    }

        System.debug('Final Return from getSecurityQuestion');
        System.debug(response);
    	
    	return JSON.serialize(response);
    }


    @AuraEnabled
    public static String StepTwo(String payload)
    {
    	CP_ForgotUserNameClass objForm = new CP_ForgotUserNameClass(); 
        CP_Response response = new CP_Response();
        System.debug('Step two');
        System.debug(payload);

    	try
    	{
    		// Deserialize the passed JSON into User Identity Object     
            objForm = (CP_ForgotUserNameClass) JSON.deserialize(payload, CP_ForgotUserNameClass.class);
            
            System.debug('objForm');
            System.debug(objForm);

            if(String.isBlank(objForm.clientNum))
            {
                // Client Number is empty
                response.State.IsValid = false;
                response.State.Fields.add('clientNum');
                response.State.Messages.add(System.Label.CP_Registration_Client_Number_Is_Empty);
            }
            else if (String.isBlank(objForm.answer))
            {
                response.State.IsValid = false;
                response.State.Fields.add('answer');
                response.State.Messages.add(System.Label.CP_Forgot_UserName_Answer_Is_Empty);
            }
            else
            {
                response = objForm.verifySecurityAnswer();
            }
    	}
    	catch(exception e)
    	{
    		response.State = new CP_Response.Result();
            response.State.IsValid = false;
            response.State.Messages.add(e.getMessage());
    	}
        
        System.debug('Final Response');
        System.debug(response);

    	return JSON.serialize(response);
    }

    

}