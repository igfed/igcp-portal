global class CP_RegistrationClass {


// Public Functions     
    public CP_Response.Result verifyIdentity(CP_RegistrationClass.UserIdentity IGUser)
    {
        CP_Response.Result result = new CP_Response.Result();
        
        // Search Contact by Client/Policy/Loan Number
        Financial_Asset__c objContact = IGUser.getClientInfo();
        
        System.debug('Returned Contact object');
        System.debug(objContact);

        // check if Contact exists
		if(objContact == null)
        {
            // Contact not found
            result.IsValid = false;
            result.Fields.add('clientNum');
            result.Messages.add(System.Label.CP_Registration_Client_Number_Not_Found);

            return result;
        }
        else // Contact Found Validate Client Status
        {
            // Contact is Locked 
            if(objContact.Customer__r.Portal_Registration_Is_Locked__c == true)
            {
                result.IsValid = false;
                result.IsLocked = true;

                return result;
            }
            else // Contact is not Locked, proceed with other checks
            {
                // Check Client's Eligibility for Registration
                if(objContact.Is_Registration_Eligibile__c == false)
                {
                    // Client is not Eligible
                    result.IsValid = false;
                    result.Fields.add('clientNum');
                    result.Messages.add(System.Label.CP_Registration_Client_is_Joint_and_Not_allowed_to_Register);

                    return result;
                }
                else // Client is Eligible, proceed with other checks
                {
                    // Check if the returned Contact has Registered flag set 
                    if(objContact.Customer__r.Portal_User_Is_Registered__c == true)
                    {
                        // Client is already Registered
                        result.IsValid = false;
                        result.Fields.add('clientNum');
                        result.Messages.add(System.Label.CP_Registration_Client_Already_Registered);
                        return result;
                    }
                    else
                    {
                        // Validate Contact Postal code and Date of birth with values entered by user
                        if(!CP_Utility.PostalCodeMatched(IGUser.postalCode, objContact.Customer__r.MailingPostalCode))
                        {
                            // Postatcode did not match the stored info in Salesforce.
                            result.IsValid = false;
                            result.Fields.add('postalCode');
                            result.Messages.add(System.Label.CP_Registration_Postalcode_Not_Matched);
                        }
                        

                        if(Date.valueOf(IGUser.dob) != objContact.Customer__r.Birthdate) 
                        {
                            // Date of Birth did not match the stored info in Salesforce.
                            result.IsValid = false;
                            result.Fields.add('dob');
                            result.Messages.add(System.Label.CP_Registration_DOB_Not_Matched);
                        }
                        
                        // If the result.isValid is false then record failed attempt
                        if(result.IsValid == false)
                        {
                            result.IsLocked = IGUser.recordFailedAttemptAndLock();
                        }
                    }
                }    
            }
        }

        return result;
    }
 
    public CP_Response.Result verifyProfile(CP_RegistrationClass.UserProfile IGUserProfile)
    {
        CP_Response.Result result = new CP_Response.Result();
        
        if(IGUserProfile.UserNameAlreadyExist())
        {
            // User name already exists
            result.IsValid = false;
            result.Fields.add('userName');
            result.Messages.add(System.Label.CP_Registration_User_Name_Already_Exist);
        }
        
        if(IGUserProfile.EmailAlreadyRegistered())
        {
            // Email Is Already Registered
            result.IsValid = false;
            result.Fields.add('email');
            result.Messages.add(System.Label.CP_Registration_Email_Is_Already_Registered);
        }
        
        return result;
    }


    public CP_Response.Result reValidateAll(RegistrationForm regForm)
    {
        CP_Response.Result result = new CP_Response.Result();

        if(regForm.acceptTOS)
        {
            result = this.verifyIdentity(regForm.Identity);
            if(result.IsValid)
                result = verifyProfile(regForm.Profile);
        }
        else
        {
            result.IsValid = false;
            result.Fields.add('acceptTOS');
            result.Messages.add(System.Label.CP_Registration_Terms_Of_Service_Not_Accepted);
        }

        return result;
    }

    public CP_Response.Result RegisterClient(RegistrationForm regForm)
    {
        CP_Response.Result result = new CP_Response.Result();

        // Make the ISAM call and get the new User ID
        CP_SCIMRestClient restClient = new CP_SCIMRestClient();
        CP_SCIMRestClient.Response res = new CP_SCIMRestClient.Response();
        
        // Pull contact object from SalesForce        
        Contact objContact = regForm.Identity.getContactObject();

        // Update First and Last Name of regForm object from Contact object
        regForm.Profile.firstName = objContact.firstName;
        regForm.Profile.lastName = objContact.lastName; 

        //  make the call to SCIM API to create the User in ISAM 
        res = restClient.RegisterNewUser(regForm);
        
        if(res.success)
        {
            // Update the New User ID into Salesforce 
            regForm.Profile.userId = res.responseBody;
            result = SaveInfoInSalesforce(regForm);
        }
        else
        {
            result.IsValid = false;
            result.ServiceNotAvailable = true;
            result.Messages.add(res.responseBody);
        }
        return result;
    }

//









// Privat Functions 
    private static CP_Response.Result SaveInfoInSalesforce(RegistrationForm regForm)
    {
        System.debug('regForm');
        System.debug(regForm);

        CP_Response.Result result = new CP_Response.Result();
        try
        {
            Contact objContact = regForm.Identity.getContactObject();
            if(objContact == null)
            {
                result.IsValid = false;
                result.Fields.add('clientNum');
                result.Messages.add(System.Label.CP_Registration_Client_Number_Not_Found);
            }
            else
            {
                objContact.Portal_User_Is_Registered__c = true;
                objContact.Portal_User_Name__c = regForm.Profile.userName;
                objContact.Portal_User_ID__c = regForm.Profile.userId;
                objContact.Email = regForm.Profile.email;
                objContact.Phone = regForm.Profile.mobilePhone;
                objContact.Marketing_Email_Optout__c = regForm.Profile.emailOptIn == null ? false : true;
                objContact.Preferred_Language__c = regForm.lang == null ? 'English' : regform.lang.toUpperCase() == 'FR_CA' ? 'French' : 'English';
                objContact.Portal_User_Consent_Date__c = DateTime.now();
                objContact.Portal_User_Consent_Obtained__c = true;
                objContact.Portal_Action_Failure_Count__c = 0;

                update objContact;
            }
        }
        catch(exception e)
        {
            System.debug('there was something wrong.'+ e.getMessage());
            result.IsValid = false;
            result.Messages.add(e.getMessage());
        }
        return result;
    }

// 













// Sub Classes

    public class IGClientException extends Exception {}


    public class UserIdentity
    {
        public String clientNum { get; set; }
        public String postalCode { get; set; }
        public String dob { get; set; }
        
        public Contact getContactObject()
        {
            List<Financial_Asset__c> assetList = [select Customer__r.ID, Customer__r.FirstName, Customer__r.LastName, 
                                    Customer__r.Portal_User_Is_Registered__c, Customer__r.Email, Customer__r.Portal_User_ID__c, 
                                Customer__r.Portal_User_Name__c, Customer__r.MailingPostalCode, Customer__r.Birthdate, 
                                Customer__r.Business_Partner_ID__c, Customer__r.Preferred_Language__c, Customer__r.Phone, 
                                Customer__r.Portal_Action_Failure_Count__c, Customer__r.Portal_Registration_Is_Locked__c,
                                Customer__r.Portal_User_Consent_Date__c, Customer__r.Portal_User_Consent_Obtained__c, 
                                Customer__r.Portal_Registration_Eligible__c
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
                    
                    return objContact;
                }
        }

        public Financial_Asset__c getClientInfo()
        {
            List<Financial_Asset__c> assetList = 
                [ 
                    SELECT 
                           RecordType.Name, Asset_Type__c, Client__c, Customer__c,  
                           Is_Registration_Eligibile__c,
                           Policy_Number__c, Loan_Number__c, Client_Number__c, 
                           Customer__r.Name, Customer__r.FirstName, Customer__r.LastName, 
                           Customer__r.Birthdate , Customer__r.Business_Partner_ID__c, 
                           Customer__r.Email, Customer__r.Marketing_Email_Optout__c, 
                           Customer__r.Phone, Customer__r.Portal_User_ID__c, 
                           Customer__r.Portal_User_Is_Registered__c, Customer__r.Portal_User_Name__c, 
                           Customer__r.Preferred_Language__c, Customer__r.MailingPostalCode, 
                           Customer__r.Portal_Action_Failure_Count__c, 
                           Customer__r.Portal_Registration_Is_Locked__c,
                           Customer__r.Portal_User_Consent_Date__c, Customer__r.Portal_User_Consent_Obtained__c,
                           Customer__r.Portal_Registration_Eligible__c
                    FROM 
                           Financial_Asset__c 
                    WHERE 
                                  (RecordType.DeveloperName = 'Investment_Asset'  AND Client_Number__c = : String.escapeSingleQuotes(this.clientNum))
                                  OR (RecordType.DeveloperName = 'Loan_Asset'  AND Loan_Number__c = : String.escapeSingleQuotes(this.clientNum))
                                  OR (RecordType.DeveloperName = 'Policy_Asset'  AND Policy_Number__c = : String.escapeSingleQuotes(this.clientNum))
                    ]; 

            if(assetList.isEmpty())
                return null;
            else
                return assetList[0];
        }


        public boolean recordFailedAttemptAndLock()
        {
            Contact objCon = this.getContactObject();
            if(objCon != null)
            {
                    if (objCon.Portal_Action_Failure_Count__c > 3)
                    {
                        objCon.Portal_Action_Failure_Count__c = 0;
                        objCon.Portal_Registration_Is_Locked__c = true;
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

        /*
        public Boolean IsValidPostalCode()
        {
            String postalCodeRegex_1 = '[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]';
            String postalCodeRegex_2 = '[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]';
        
            System.debug(this.postalCode);

            Pattern MyPattern1 = Pattern.compile(postalCodeRegex_1);
            Matcher MyMatcher1 = MyPattern1.matcher(this.postalCode);

            Pattern MyPattern2 = Pattern.compile(postalCodeRegex_2);
            Matcher MyMatcher2 = MyPattern2.matcher(this.postalCode);

            if(MyMatcher1.matches() || MyMatcher2.matches())
                return true;
            else
                return false;
        }

        public Boolean PostalCodeMatched(String code)
        {
            String inputCode = this.postalCode.remove(' ').remove('-').toUpperCase();
            String sfCode = code.remove(' ').remove('-').toUpperCase();
            if(inputCode == sfCode)
                return true;
            else
                return false;
        }
        */
    }

    
    public class UserProfile
    {
        public String userId  {get; set;}
        public String firstName  {get; set;}
        public String lastName  {get; set;}
        public String username { get; set; }
        public String password { get; set; }
        public String confirmPassword { get; set; }
        public String email { get; set; }
        public Boolean emailOptIn { get; set; }
        public String mobilePhone { get; set; }
        public String securityQuestion1 { get; set; }
        public String answer1 { get; set; }
        public String securityQuestion2 { get; set; }
        public String answer2 { get; set; }
        public String securityQuestion3 { get; set; }
        public String answer3 { get; set; }

        public Boolean UserNameAlreadyExist()
        {
            // First check salesforce records to see if UserName exists
            
            List<contact> contactList = [select ID, Portal_User_Is_Registered__c, Email, Portal_User_ID__c, 
                Portal_User_Name__c, MailingPostalCode, Birthdate, Business_Partner_ID__c 
                from Contact 
                where Portal_User_Name__c = : String.escapeSingleQuotes(this.userName) limit 1];

            // If UserName not found then check if it exists in ISAM
            if(contactList.isEmpty())
            {
                CP_SCIMRestClient restClient = new CP_SCIMRestClient();
                return restClient.UserNameExist(this.userName);
            }
            else
            {
                return true;
            }
        }

        //CP_Registration_Email_Is_Already_Registered
        public Boolean EmailAlreadyRegistered()
        {
            List<contact> contactList = [select ID, Portal_User_Is_Registered__c, Email, Portal_User_ID__c, 
                Portal_User_Name__c, MailingPostalCode, Birthdate, Business_Partner_ID__c 
                from Contact 
                where Email = : String.escapeSingleQuotes(this.email) limit 1];
            if(contactList.isEmpty())
                return false;
            else
                return true;

        }
        
        /*
        public Boolean IsValidEmail()
        {
            String emailRegex = '([a-zA-Z0-9_\\-\\.]+)@((\\[a-z]{1,3}\\.[a-z]{1,3}\\.[a-z]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})';
        
            Pattern MyPattern = Pattern.compile(emailRegex);
            Matcher MyMatcher = MyPattern.matcher(this.email);

            if(MyMatcher.matches())
                return true;
            else
                return false;
        }

        public Boolean IsValidPhoneNumber()
        {
            String thisPhoneNumber = this.mobilePhone.replace(' ','');
            System.debug('this.mobilePhone:'+ this.mobilePhone);
            System.debug('thisPhoneNumber:'+ thisPhoneNumber);

            String MyRegex = '\\+?1?[ .-]?\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})([ .-]?)([0-9]{4})';

            //String phoneRegex = '(/^(\\+?1-?)?(\\([2-9]([02-9]\\d|1[02-9])\\)|[2-9]([02-9]\\d|1[02-9]))-?[2-9]([02-9]\\d|1[02-9])-?\\d{4}$/)';
            
            //String phoneRegex = '^((\\+1)?\\s?\\(\\d{3}\\)\\s?\\d{3}\\-\\d{4})?$';

            Pattern MyPattern = Pattern.compile(MyRegex);
            Matcher MyMatcher = MyPattern.matcher(thisPhoneNumber);
            return MyMatcher.matches();
        }
        */
    }
    
     public class RegistrationForm
    {
        public Boolean acceptTOS {get; set;}
        public String lang {get; set;}
        public UserIdentity Identity {get; set; }
        public UserProfile Profile {get; set;}
    }


    public class SecurityQuestions extends CP_Response
    {
        public List<String> Questions {get; set;}
        public SecurityQuestions()
        {
            super();
            Questions = new List<String>();
        }

        public void loadQuestions(String lang)
        {
            try
            {
                System.debug(lang);
                List<Security_Question__mdt> questionList = [SELECT 
                                        Question_Eng__c,
                                        Question_Fr__c
                                        FROM Security_Question__mdt];
                if(!questionList.isEmpty())
                {

                    for(Security_Question__mdt Q : questionList)
                    {
                        if(lang.toUpperCase() == 'FR_CA')
                            this.Questions.add(Q.Question_Fr__c); 
                        else
                            this.Questions.add(Q.Question_Eng__c);
                    }
                }
                else
                {
                    this.State.IsValid = false; 
                    this.State.Messages.add(System.label.CP_Registration_Security_Questions_Not_Found);
                }
            }
            catch(Exception e)
            {
                this.State.IsValid = false;
                this.State.Messages.add(e.getMessage());
            }
        }

    }

//

}