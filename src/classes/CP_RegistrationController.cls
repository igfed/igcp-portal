public class CP_RegistrationController {
    
    //public static CP_RegistrationClass.RegistrationForm objForm {get; set;}
    private static CP_RegistrationClass Registration = new CP_RegistrationClass();


    @AuraEnabled
    public static string StepOne(String payload)
    {
        System.debug('CP_RegistrationController.StepOne');
        System.debug('Payload: '+ payload);
        CP_Response response = new CP_Response();
        CP_RegistrationClass.UserIdentity objForm = new CP_RegistrationClass.UserIdentity();
        try
        {
            // Deserialize the passed JSON into User Identity Object     
            objForm = (CP_RegistrationClass.UserIdentity) JSON.deserialize(payload, CP_RegistrationClass.UserIdentity.class);
            System.debug('ObjForm: '+ objForm);

            // verify all required info is entered
            response.State = verifyStepOneInput(objForm);

            // if all required info is available then call verifyIdentity
            if(response.State.IsValid)
            {
                // Call the Registration class's verification method 
                response.State = Registration.verifyIdentity(objForm);
            }
        }
        catch(exception e)
        {
            response.State.IsValid = false;
            System.debug('Exception Caught - CP_RegistrationController.StepOne: '+ e.getMessage());
            response.State.Messages.add(System.Label.CP_Generic_Server_Error_Instructions);
        }

        // Serialize the result object and return as string
        return JSON.serialize(response);
    }
    
    @AuraEnabled
	public static string  StepTwo(String payload)
    {
        System.debug('CP_RegistrationController.StepTwo');
        System.debug('Payload: '+ payload);
        CP_Response response = new CP_Response();
        CP_RegistrationClass.UserProfile objForm = new CP_RegistrationClass.UserProfile();
        try
        {
            objForm = (CP_RegistrationClass.UserProfile) JSON.deserialize(payload, CP_RegistrationClass.UserProfile.class);
            System.debug('ObjForm: '+ objForm);

            // verify all required info is entered
            response.State = verifyStepTwoInput(objForm);

            // if all required info is available then call verifyProfile
            if(response.State.IsValid)
            {
                // Call the Registration class's verification method by passing in the Deserialized User profile object and get a result Object in return
                response.State = Registration.verifyProfile(objForm);
            }
        }
        catch(exception e)
        {
            response.State.IsValid = false;
            System.debug('Exception Caught - CP_RegistrationController.StepTwo: '+ e.getMessage());
            response.State.Messages.add(System.Label.CP_Generic_Server_Error_Instructions);
        }

        // Serialize the result object and return as string
        return JSON.serialize(response);
    }
    
	@AuraEnabled
	public static string  StepThree(String payload)
    {
        System.debug('CP_RegistrationController.StepThree');
        System.debug('Payload: '+ payload);

        CP_Response response = new CP_Response();
        CP_RegistrationClass.RegistrationForm objForm = new CP_RegistrationClass.RegistrationForm();
        
        try
        {
            // Deserialize the passed JSON into Registration Form Object     
            objForm = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(payload, CP_RegistrationClass.RegistrationForm.class);
            System.debug('ObjForm: '+ objForm);

            response.State = verifyStepOneInput(objForm.Identity);
            if(response.State.IsValid)
            {
                response.State = verifyStepTwoInput(objForm.Profile);
                if(response.State.IsValid)
                {
                    response.State = Registration.reValidateAll(objForm);
                    if(response.State.IsValid)
                    {
                        response.State = Registration.RegisterClient(objForm);
                    }
                }
            }
        }
        catch(exception e)
        {
            response.State.IsValid = false;
            System.debug('Exception Caught - CP_RegistrationController.StepThree: '+ e.getMessage());
            response.State.Messages.add(System.Label.CP_Generic_Server_Error_Instructions);
        }

        // Serialize the result object and return as string
        return JSON.serialize(response);
    }
    

    @AuraEnabled
    public static string getSecurityQuestions(String payload)
    {
        System.debug('CP_RegistrationController.getSecurityQuestions');
        System.debug('Payload: '+ payload);

        CP_RegistrationClass.SecurityQuestions securityQuestions = new CP_RegistrationClass.SecurityQuestions();
        CP_RegistrationClass.RegistrationForm objForm;

        objForm = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(payload, CP_RegistrationClass.RegistrationForm.class);
        System.debug('ObjForm: '+ objForm);
        
        try{
            String language; 
            language = String.isBlank(objForm.lang) ? 'en_CA' : objForm.lang;
            securityQuestions.loadQuestions(language);
        }
        catch(exception e)
        {
            SecurityQuestions.State.IsValid = false;
            System.debug('Exception Caught - CP_RegistrationController.getSecurityQuestions: '+ e.getMessage());
            SecurityQuestions.State.Messages.add(System.Label.CP_Generic_Server_Error_Instructions);
        }
        return JSON.serialize(securityQuestions);
    }



// Private Functions

    private static CP_Response.Result verifyStepOneInput(CP_RegistrationClass.UserIdentity IGUser)
    {
        CP_Response.Result result = new CP_Response.Result();
        
        if(String.isBlank(IGUser.clientNum))
        {
            // Client Number is empty
            result.IsValid = false;
            result.Fields.add('clientNum');
            result.Messages.add(System.Label.CP_Registration_Client_Number_Is_Empty);
        }

        if(String.isBlank(IGUser.postalCode))
        {
            // Postatcode is empty 
            result.IsValid = false;
            result.Fields.add('postalCode');
            result.Messages.add(System.Label.CP_Registration_Postalcode_Is_Empty);
        }                
        else if(!CP_Utility.IsValidPostalCode(IGuser.postalCode))
        {
            // Postatcode is empty 
            result.IsValid = false;
            result.Fields.add('postalCode');
            result.Messages.add(System.Label.CP_Registration_Postalcode_Is_Invalid);   
        }

        if(String.isBlank(IGUser.dob))
        {
            // Postatcode is empty 
            result.IsValid = false;
            result.Fields.add('dob');
            result.Messages.add(System.Label.CP_Registration_DOB_Is_Empty);
        } 

        return result;
    }


    private static CP_Response.Result  verifyStepTwoInput(CP_RegistrationClass.UserProfile IGUserProfile)
    {
        CP_Response.Result result = new CP_Response.Result();
        
        if(String.isBlank(IGUserProfile.userName))
        {
            // User name is empty
            result.IsValid = false;
            result.Fields.add('userName');
            result.Messages.add(System.Label.CP_Registration_User_Name_Is_Empty);
        }

        if(String.isBlank(IGUserProfile.password))
        {
            // Confirm Password did not match
            result.IsValid = false;
            result.Fields.add('password');
            result.Messages.add(System.Label.CP_Registration_Password_Is_Empty);   
        }
        else if(!CP_Utility.ReEnteredPasswordMatched(IGUserProfile.password, IGUserProfile.confirmPassword))
        {
            // Confirm Password did not match
            result.IsValid = false;
            result.Fields.add('confirmPassword');
            result.Messages.add(System.Label.CP_Registration_Confirm_Password_Not_Matched);   
        }

        if(String.isBlank(IGUserProfile.email))
        {
            // Email is Empty
            result.IsValid = false;
            result.Fields.add('email');
            result.Messages.add(System.Label.CP_Registration_Email_Is_empty);   
        }
        else if (!CP_Utility.IsValidEmail(IGUserProfile.email))
        {
            // Email is not valid 
            result.IsValid = false;
            result.Fields.add('email');
            result.Messages.add(System.Label.CP_Registration_Email_Is_Invalid);   
        }
        
        return result;
    }

//

}