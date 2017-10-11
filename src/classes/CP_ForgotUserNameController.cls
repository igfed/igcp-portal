public with sharing class CP_ForgotUserNameController {
	

	@AuraEnabled
    public static string StepOne(String payload)
    {
        System.debug('CP_ForgotUserNameController.StepOne');
        System.debug('Payload: '+ payload);
        CP_ForgotUserNameClass objForm = new CP_ForgotUserNameClass(); 
        CP_Response response = new CP_Response();
        try
        {
            // Deserialize the passed JSON into User Identity Object     
            objForm = (CP_ForgotUserNameClass) JSON.deserialize(payload, CP_ForgotUserNameClass.class);
            System.debug('ObjForm: '+ objForm);

           	response.State = verifyStepOneInput(objForm);

            if(response.State.IsValid)
            {
                response.State = objForm.verifyClient();
            }
        }
        catch(exception e)
        {
        	response.State.IsValid = false;
            System.debug('Exception Caught - CP_ForgotUserNameController.StepOne: '+ e.getMessage());
            response.State.Messages.add(System.Label.CP_Generic_Server_Error_Instructions);
        }

        // Serialize the result object and return as string
        return JSON.serialize(response);
    }


    @AuraEnabled
    public static String getSecurityQuestion(String payload)
    {
        System.debug('CP_ForgotUserNameController.getSecurityQuestion');
        System.debug('Payload: '+ payload);
    	CP_ForgotUserNameClass objForm = new CP_ForgotUserNameClass();
        CP_ForgotUserNameClass.SecurityQuestion response = new CP_ForgotUserNameClass.SecurityQuestion();
    	try
    	{
            // Deserialize the passed JSON into User Identity Object     
            objForm = (CP_ForgotUserNameClass) JSON.deserialize(payload, CP_ForgotUserNameClass.class);
            System.debug('ObjForm: '+ objForm);

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
	    	response.State.IsValid = false;
            System.debug('Exception Caught - CP_ForgotUserNameController.getSecurityQuestion: '+ e.getMessage());
            response.State.Messages.add(System.Label.CP_Generic_Server_Error_Instructions);
	    }

    	return JSON.serialize(response);
    }


    @AuraEnabled
    public static String StepTwo(String payload)
    {
        System.debug('Step Two of forgot user name ');
        System.debug('Payload: '+ payload);
    	CP_ForgotUserNameClass objForm = new CP_ForgotUserNameClass(); 
        CP_Response response = new CP_Response();

    	try
    	{
    		// Deserialize the passed JSON into User Identity Object     
            objForm = (CP_ForgotUserNameClass) JSON.deserialize(payload, CP_ForgotUserNameClass.class);
            System.debug('ObjForm: '+ objForm);

            response.State = verifyStepTwoInput(objForm);

            if(response.State.IsValid)
            {
                response.State = objForm.verifySecurityAnswer();
            }
    	}
    	catch(exception e)
    	{
    		response.State.IsValid = false;
            System.debug('Exception Caught - CP_ForgotUserNameController.StepTwo: '+ e.getMessage());
            response.State.Messages.add(System.Label.CP_Generic_Server_Error_Instructions);
    	}

    	return JSON.serialize(response);
    }

 

 // Private function 

    private static CP_Response.Result verifyStepOneInput(CP_ForgotUserNameClass objForm)
    {
        CP_Response.Result state = new CP_Response.Result();

        if(String.isBlank(objForm.clientNum))
        {
            // Client Number is empty
            state.IsValid = false;
            state.Fields.add('clientNum');
            state.Messages.add(System.Label.CP_Registration_Client_Number_Is_Empty);
        }
        
        if(String.isBlank(objForm.email))
        {
            // Client Number is empty
            state.IsValid = false;
            state.Fields.add('email');
            state.Messages.add(System.Label.CP_Registration_Email_Is_Empty);
        }
        else if (!CP_Utility.IsValidEmail(objForm.email))
        {
            state.IsValid = false;
            state.Fields.add('email');
            state.Messages.add(System.Label.CP_Registration_Email_Is_Invalid);
        }

        return state;
    }

    private static CP_Response.Result verifyStepTwoInput(CP_ForgotUserNameClass objForm)
    {
        CP_Response.Result state = new CP_Response.Result();

        if(String.isBlank(objForm.clientNum))
        {
            // Client Number is empty
            state.IsValid = false;
            state.Fields.add('clientNum');
            state.Messages.add(System.Label.CP_Registration_Client_Number_Is_Empty);
        }
        
        if(String.isBlank(objForm.stateId))
        {
            state.IsValid = false;
        }
        if(String.isBlank(objForm.id))
        {
            state.IsValid = false;
        }
        if(String.isBlank(objForm.answer))
        {
            state.IsValid = false;
        }
        
        return state;
    }



}