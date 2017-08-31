public class CP_RegistrationController {
    
    public static CP_RegistrationClass.RegistrationForm objForm {get; set;}

    
    private static CP_RegistrationClass Registration = new CP_RegistrationClass();


    @AuraEnabled
    public static string StepOne(String payload)
    {
        System.debug('I am in Step Two');
        objForm = new CP_RegistrationClass.RegistrationForm();
        try
        {
            System.debug('JSON String');
            System.debug(payload);

            // Deserialize the passed JSON into User Identity Object     
            objForm.Identity = (CP_RegistrationClass.UserIdentity) JSON.deserialize(payload, CP_RegistrationClass.UserIdentity.class);
            
            // Call the Registration class's verification method by passing in the Deserialized User Identity object and get a result Object in return
            objForm.State = Registration.verifyIdentity(objForm.Identity);
        }
        catch(exception e)
        {
            objForm.State = new CP_RegistrationClass.Result();
            objForm.State.IsValid = false;
            objForm.State.Messages.add(e.getMessage());
        }

        // Serialize the result object and return as string
        return JSON.serialize(objForm);
    }
    
    @AuraEnabled
	public static string  StepTwo(String payload)
    {
        objForm = new CP_RegistrationClass.RegistrationForm();
        try
        {
            objForm.Profile = (CP_RegistrationClass.UserProfile) JSON.deserialize(payload, CP_RegistrationClass.UserProfile.class);

            // Call the Registration class's verification method by passing in the Deserialized User profile object and get a result Object in return
            objForm.State = Registration.verifyProfile(objForm.Profile);

        }
        catch(exception e)
        {
            objForm.State = new CP_RegistrationClass.Result();
            objForm.State.IsValid = false;
            objForm.State.Messages.add(e.getMessage());
        }

        // Serialize the result object and return as string
        return JSON.serialize(objForm);
    }
    
	@AuraEnabled
	public static string  StepThree(String payload)
    {
        System.debug('I am in Step Three');
        objForm = new CP_RegistrationClass.RegistrationForm();
        objForm.State = new CP_RegistrationClass.Result();
        try
        {
            // Deserialize the passed JSON into Registration Form Object     
            objForm = (CP_RegistrationClass.RegistrationForm) JSON.deserialize(payload, CP_RegistrationClass.RegistrationForm.class);

            // Call the Registration class's verification method by passing in the Deserialized Registration Form object and get a result Object in return
            objForm.State = Registration.reValidateAll(objForm);

            if(objForm.State.IsValid)
            {
                // Make the ISAM call and get the new User ID  


                // Update the New User ID into Salesforce 


                // Return Success and Redirect to Login Page 
            }
        }
        catch(exception e)
        {
            objForm.State.IsValid = false;
            objForm.State.Messages.add(e.getMessage());
        }

        // Serialize the result object and return as string
        System.debug('Return object from Controller');
        System.debug(objForm);
        return JSON.serialize(objForm);
    }
    




}