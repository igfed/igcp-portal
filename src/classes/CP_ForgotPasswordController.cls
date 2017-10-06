public with sharing class CP_ForgotPasswordController {
	
	@AuraEnabled
    public static string StepOne(String payload)
    {
        System.debug('I am in Step One');
        CP_ForgotPasswordClass objForm = new CP_ForgotPasswordClass(); 
        CP_Response response = new CP_Response();
        try
        {
            System.debug('JSON String');
            System.debug(payload);

            // Deserialize the passed JSON into User Identity Object     
            objForm = (CP_ForgotPasswordClass) JSON.deserialize(payload, CP_ForgotPasswordClass.class);

            response.State = verifyStepOneInput(objForm);

            if(response.State.IsValid)
                response.State = objForm.verifyClient();
        }
        catch(exception e)
        {
        	response.State.IsValid = false;
            response.State.Messages.add(e.getMessage());
        }

        // Serialize the result object and return as string
        return JSON.serialize(response);
    }


    @AuraEnabled
    public static String getSecurityQuestion(String payload)
    {
    	CP_ForgotPasswordClass objForm = new CP_ForgotPasswordClass();
        CP_ForgotPasswordClass.SecurityQuestion response = new CP_ForgotPasswordClass.SecurityQuestion();
    	try
    	{
            // Deserialize the passed JSON into User Identity Object     
            objForm = (CP_ForgotPasswordClass) JSON.deserialize(payload, CP_ForgotPasswordClass.class);

            //response.State = verifyStepOneInput(objForm);
            //if(response.State.IsValid)
                response = objForm.getSecurityQuestion();
    	}
	    catch (exception e)
	    {
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
    	CP_ForgotPasswordClass objForm = new CP_ForgotPasswordClass(); 
        CP_Response response = new CP_Response();
        System.debug('Step two');
        System.debug(payload);

    	try
    	{
    		// Deserialize the passed JSON into User Identity Object     
            objForm = (CP_ForgotPasswordClass) JSON.deserialize(payload, CP_ForgotPasswordClass.class);
            
            System.debug('objForm');
            System.debug(objForm);

            response.State = verifyStepOneInput(objForm);

            if(response.State.IsValid)
                response = objForm.verifySecurityAnswer();

    	}
    	catch(exception e)
    	{
    		response.State.IsValid = false;
            response.State.Messages.add(e.getMessage());
    	}
        
        System.debug('Final Response');
        System.debug(response);

    	return JSON.serialize(response);
    }


    @AuraEnabled
    public static String StepThree(String payload)
    {
        CP_ForgotPasswordClass objForm = new CP_ForgotPasswordClass(); 
        CP_Response response = new CP_Response();
        System.debug('Step Three');
        System.debug(payload);

        try
        {
            // Deserialize the passed JSON into User Identity Object     
            objForm = (CP_ForgotPasswordClass) JSON.deserialize(payload, CP_ForgotPasswordClass.class);
            
            System.debug('objForm');
            System.debug(objForm);

            response.State = verifyStepThreeInput(objForm);

            if(response.State.IsValid)
                response = objForm.verifySecurityAnswer();

        }
        catch(exception e)
        {
            response.State.IsValid = false;
            response.State.Messages.add(e.getMessage());
        }
        
        System.debug('Final Response');
        System.debug(response);

        return JSON.serialize(response);
    }



// Private function 

    private static CP_Response.Result verifyStepOneInput(CP_ForgotPasswordClass objForm)
    {
        CP_Response.Result state = new CP_Response.Result();

        if(String.isBlank(objForm.username))
        {
            // Client Number is empty
            state.IsValid = false;
            state.Fields.add('username');
            state.Messages.add(System.Label.CP_Registration_User_Name_Is_Empty);
        }
        
        if(String.isBlank(objForm.postalCode))
        {
            // Client Number is empty
            state.IsValid = false;
            state.Fields.add('postalCode');
            state.Messages.add(System.Label.CP_Registration_Postalcode_Is_Empty);
        }
        else if (!CP_Utility.IsValidPostalCode(objForm.postalCode))
        {
            state.IsValid = false;
            state.Fields.add('postalCode');
            state.Messages.add(System.Label.CP_Registration_Postalcode_Is_Invalid);
        }

        if(String.isBlank(objForm.dob))
        {
            // Client Number is empty
            state.IsValid = false;
            state.Fields.add('dob');
            state.Messages.add(System.Label.CP_Registration_DOB_Is_Empty);
        }

        return state;
    }

    private static CP_Response.Result verifyStepTwoInput(CP_ForgotPasswordClass objForm)
    {
        CP_Response.Result state = new CP_Response.Result();

        if(String.isBlank(objForm.username))
        {
            // Client Number is empty
            state.IsValid = false;
            state.Fields.add('username');
            state.Messages.add(System.Label.CP_Registration_User_Name_Is_Empty);
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

    private static CP_Response.Result verifyStepThreeInput(CP_ForgotPasswordClass objForm)
    {
        CP_Response.Result state = new CP_Response.Result();

        if(String.isBlank(objForm.username))
        {
            // Client Number is empty
            state.IsValid = false;
            state.Fields.add('username');
            state.Messages.add(System.Label.CP_Registration_User_Name_Is_Empty);
        }
        
        if(String.isBlank(objForm.password))
        {
            // Confirm Password did not match
            state.IsValid = false;
            state.Fields.add('password');
            state.Messages.add(System.Label.CP_Registration_Password_Is_Empty);   
        }
        else if(!CP_Utility.ReEnteredPasswordMatched(objForm.password, objForm.confirmPassword))
        {
            // Confirm Password did not match
            state.IsValid = false;
            state.Fields.add('confirmPassword');
            state.Messages.add(System.Label.CP_Registration_Confirm_Password_Not_Matched);   
        }
        
        return state;
    }

// 



}