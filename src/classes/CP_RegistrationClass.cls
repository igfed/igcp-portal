global class CP_RegistrationClass {

    Public class Result
    {
        public String Status {get; set; }
        public String Message {get; set; }
        public Contact objContact {get; set; }
        
        public Result(){}
        public Result(String status, String message)
        {
            this.Status = status;
            this.Message = message;
        }
    }
    
    
    public CP_RegistrationClass.Result verifyIdentity(CP_RegistrationClass.UserIdentity IGUser)
    {
        CP_RegistrationClass.Result result = new CP_RegistrationClass.Result();
        
        // Search Contact by Business Partner number
        Contact objContact = IGUser.getContactByID();
        
        // check if Contact exists
		if(objContact == null)
        {
            // Contact not found
            result.Status = 'failed';
            result.Message = 'Contact not found';
            return result;
        }
        else
        {
            // Check if the returned Contact has Registered flag set and also has value in ISAM ID field
            if(objContact.Portal_User_Is_Registered__c == true && objContact.Portal_User_ISAM_ID__c != null)
            {
                // User already Registered
               	result.Status = 'failed';
	            result.Message = 'User already Registered';
                return result;
            }
            else
            {
                // Validate Contact Date of birth and Postal code with values entered by user
                if(IGUser.verify(objContact))
                {
                    // user Identity varified and data validated
                    result.Status = 'success';
                    result.objContact = objContact;
                    return result;
                }
                else
                {	
                    // Postat Code or Date of Birth data did not match the stored info in Salesforce.
                    result.Status = 'failed';
	            	result.Message = 'Postat Code or Date of Birth data did not match the stored info in Salesforce';
                    return result;
                }
            }
        }
    }
 
    public class UserIdentity
    {
        @AuraEnabled
        public String clientNum { get; set; }
         @AuraEnabled
        public String postalCode { get; set; }
         @AuraEnabled
        public String dob { get; set; }
        
        // Search Contact by Business Partner ID
        public Contact getContactByID()
        {
            return [select ID, Portal_User_Is_Registered__c, Portal_User_ISAM_ID__c, 
                    Portal_User_Name__c, MailingPostalCode, Birthdate 
                    from Contact 
                    where Business_Partner_ID__c = : this.clientNum limit 1];
		}
        
        
		public Boolean Verify(Contact objContact)
        {
            if(this.clientNum != objContact.Business_Partner_ID__c) 
                return false;
            if(this.postalCode != objContact.MailingPostalCode) 
                return false;
            //if(this.dob != objContact.Birthdate) 
            //    return false;
            
            return true;
        }
    }
    
    
    public class UserProfile
    {
        public String UserName { get; set; }
        public String Password { get; set; }
        public String ConfirmPassword { get; set; }
        public String Email { get; set; }
        public String ConfirmEmail { get; set; }
        public String EmailOptIn { get; set; }
        public String MobilePhone { get; set; }
        public String SecurityQuestion1 { get; set; }
        public String Answer1 { get; set; }
        public String SecurityQuestion2 { get; set; }
        public String Answer2 { get; set; }
        public String SecurityQuestion3 { get; set; }
        public String Answer3 { get; set; }
    }
    
}