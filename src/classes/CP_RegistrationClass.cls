global class CP_RegistrationClass {

    public class IGClientException extends Exception {}

    Public class Result
    {
        //public String Status {get; set; }
        public Boolean IsValid{get; set;}
        public Boolean IsLocked{get; set;}
        public Boolean ServiceNotAvailable{get; set;}
        public list<String> Fields {get; set; }
        public list<String> Messages {get; set; }
        
        public Result()
        {
            this.IsLocked = false;
            this.ServiceNotAvailable = false;
            this.Fields = new List<String>();
            this.Messages = new List<String>();
        }
    }


    public class RegistrationForm
    {
        public Result State {get; set;}
        public Boolean acceptTOS {get; set;}
        public UserIdentity Identity {get; set; }
        public UserProfile Profile {get; set;}

        public RegistrationForm()
        {
            State = new Result();
        }
    }

    public class SecurityQuestions
    {
        public Result State {get; set;}
        public List<String> Questions {get; set;}
        public SecurityQuestions()
        {
            Questions = new List<String>();
            State = new Result();
        }

        public void loadQuestions()
        {
            List<Security_Question__mdt> questionList = [SELECT 
                                    Question_Eng__c,
                                    Question_Fr__c
                                    FROM Security_Question__mdt];

            for(Security_Question__mdt Q : questionList)
            {
                this.Questions.add(Q.Question_Eng__c);  
            }
        }
    }
  
    public CP_RegistrationClass.Result verifyIdentity(CP_RegistrationClass.UserIdentity IGUser)
    {
        
        CP_RegistrationClass.Result result = new CP_RegistrationClass.Result();
        
       // System.debug('Inside Reg class - IGUser:'+ IGUser);

        if(String.isBlank(IGUser.clientNum))
        {
            // Client Number is empty
            result.IsValid = false;
            result.Fields.add('clientNum');
            result.Messages.add(System.Label.CP_Registration_Client_Number_Is_Empty);
            return result;
        }

        // Search Contact by Business Partner number
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
        else
        {
            // Contact Found 
            // Contact is Locked 
            if(objContact.Customer__r.Portal_Registration_Is_Locked__c == true)
            {
                result.IsValid = false;
                result.IsLocked = true;

                return result;
            }
            else // Contact is not Locked, proceed with other checks
            {
                if(objContact.Asset_Type__c == 'Joint' && objContact.Is_Registration_Eligibile__c == false)
                {
                    result.IsValid = false;
                    result.IsLocked = false;
                    result.Fields.add('clientNum');
                    result.Messages.add(System.Label.CP_Registration_Client_is_Joint_and_Not_allowed_to_Register);

                    return result;
                }
                else if(objContact.Asset_Type__c == 'Company' && objContact.Is_Registration_Eligibile__c == false)
                {
                    result.IsValid = false;
                    result.IsLocked = false;
                    result.Fields.add('clientNum');
                    result.Messages.add(System.Label.CP_Registration_Client_is_Company_and_Not_allowed_to_Register);

                    return result;
                }
                else
                {
                    // Check if the returned Contact has Registered flag set and also has value in ISAM ID field
                    if(objContact.Customer__r.Portal_User_Is_Registered__c == true)
                    {
                        // User already Registered
                        result.IsValid = false;
                        result.IsLocked = false;
                        //Provided Client number is already Registered.
                        result.Fields.add('clientNum');
                        result.Messages.add(System.Label.CP_Registration_Client_Already_Registered);
                        return result;
                    }
                    else
                    {
                        // Validate Contact Postal code and Date of birth with values entered by user
                        //System.debug('step 1- client num is valid');
                        if(String.isBlank(IGUser.postalCode))
                        {
                            // Postatcode is empty 
                            result.IsValid = false;
                            result.Fields.add('postalCode');
                            result.Messages.add(System.Label.CP_Registration_Postalcode_Is_Empty);
                        }                
                        else if(!IGUser.IsValidPostalCode())
                        {
                            // Postatcode is empty 
                            result.IsValid = false;
                            result.Fields.add('postalCode');
                            result.Messages.add(System.Label.CP_Registration_Postalcode_Is_Invalid);   
                        }
                        else if(!IGUser.PostalCodeMatched(objContact.Customer__r.MailingPostalCode))
                        {
                            // Postatcode did not match the stored info in Salesforce.
                            result.IsValid = false;
                            result.Fields.add('postalCode');
                            result.Messages.add(System.Label.CP_Registration_Postalcode_Not_Matched);
                        }
                        //System.debug('step 2 postal code is valid');
                        
                        if(String.isBlank(IGUser.dob))
                        {
                            // Date of Birth is empty.
                            result.IsValid = false;
                            result.Fields.add('dob');
                            result.Messages.add(System.Label.CP_Registration_DOB_Is_Empty);
                        }
                        else if(Date.valueOf(IGUser.dob) != objContact.Customer__r.Birthdate) 
                        {
                            // Date of Birth did not match the stored info in Salesforce.
                            result.IsValid = false;
                            result.Fields.add('dob');
                            result.Messages.add(System.Label.CP_Registration_DOB_Not_Matched);
                        }
                        
                        System.debug('step 3 dob is valid ');
                        // If the result.isValid is still null then it means all validations passed
                        if(result.IsValid == null)
                        {
                            // user Identity varified and data validated
                            result.IsValid = true;
                        }
                        else
                        {
                            result.IsLocked = IGUser.recordFailedAttemptAndLock();
                        }
                        return result;
                    }
                }    
            }
            
        }
    }
 


    public CP_RegistrationClass.Result verifyProfile(CP_RegistrationClass.UserProfile IGUserProfile)
    {
        CP_RegistrationClass.Result result = new CP_RegistrationClass.Result();
        
        result.IsValid = null;

        if(String.isBlank(IGUserProfile.userName))
        {
            // User name is empty
            result.IsValid = false;
            result.Fields.add('userName');
            result.Messages.add(System.Label.CP_Registration_User_Name_Is_Empty);
        }
        else if(IGUserProfile.UserNameAlreadyExist())
        {
            // User name already exists
            result.IsValid = false;
            result.Fields.add('userName');
            result.Messages.add(System.Label.CP_Registration_User_Name_Already_Exist);
        }
        
        if(String.isBlank(IGUserProfile.password))
        {
            // Confirm Password did not match
            result.IsValid = false;
            result.Fields.add('password');
            result.Messages.add(System.Label.CP_Registration_Password_Is_Empty);   
        }
        else if(IGUserProfile.password != IGUserProfile.confirmPassword)
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
        else if (!IGUserProfile.IsValidEmail())
        {
            // Email is not valid 
            result.IsValid = false;
            result.Fields.add('email');
            result.Messages.add(System.Label.CP_Registration_Email_Is_Invalid);   
        }
        else if(IGUserProfile.EmailAlreadyRegistered())
        {
            // Email Is Already Registered
            result.IsValid = false;
            result.Fields.add('email');
            result.Messages.add(System.Label.CP_Registration_Email_Is_Already_Registered);
        }
        
        // If the result.isValid is still null then it means all validations passed
        if(result.IsValid == null)
        {
            // user Identity varified and data validated
            result.IsValid = true;
        }
        return result;
    }


    public CP_RegistrationClass.Result reValidateAll(RegistrationForm regForm)
    {
        System.debug('In Revalidate function');
        System.debug(regForm);

        CP_RegistrationClass.Result result = new CP_RegistrationClass.Result();
        if(regForm.acceptTOS)
        {
            System.debug(regForm.Identity);

            result = this.verifyIdentity(regForm.Identity);
            System.debug('Identity is valid ');

            if(result.IsValid)
            {
                result = verifyProfile(regForm.Profile);
                System.debug('Profile is valid');
            }
        }
        else
        {
            result.IsValid = false;
            result.Fields.add('acceptTOS');
            result.Messages.add(System.Label.CP_Registration_Terms_Of_Service_Not_Accepted);
        }

        return result;
    }


    public CP_RegistrationClass.Result SaveInfoInSalesforce(RegistrationForm regForm)
    {
        System.debug('i m in saveInfo');
        CP_RegistrationClass.Result result = new CP_RegistrationClass.Result();
        try
        {
            Contact objContact = regForm.Identity.getContactByBusinessPartnerID();
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
                objContact.Marketing_Email_Optout__c = regForm.Profile.emailOptIn;
                //objContact.Preferred_Language__c = 'English';
                objContact.Portal_User_Consent_Date__c = DateTime.now();
                objContact.Portal_User_Consent_Obtained__c = true;
                objContact.Portal_Action_Failure_Count__c = 0;

                update objContact;
                System.debug('info saved! ');

                result.IsValid = true;
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

    public class UserIdentity
    {
        public String clientNum { get; set; }
        public String postalCode { get; set; }
        public String dob { get; set; }
        
        // Search Contact by Business Partner ID
        public Contact getContactByBusinessPartnerID()
        {
            List<Contact> contactList = [select ID, FirstName, LastName, Portal_User_Is_Registered__c, Email, Portal_User_ID__c, 
                Portal_User_Name__c, MailingPostalCode, Birthdate, Business_Partner_ID__c, Preferred_Language__c,
                Portal_Action_Failure_Count__c, 
                Portal_Registration_Is_Locked__c,
                Portal_User_Consent_Date__c, Portal_User_Consent_Obtained__c 
                from Contact 
                where Business_Partner_ID__c = : String.escapeSingleQuotes(this.clientNum)];

            System.debug(contactList);

            if(contactList.isEmpty())
                return null;
            else
                return contactList[0];
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
                           Customer__r.Portal_User_Consent_Date__c, Customer__r.Portal_User_Consent_Obtained__c
                    FROM 
                           Financial_Asset__c 
                    WHERE 
                                  (RecordType.DeveloperName = 'Investment_Asset'  AND Client_Number__c = : String.escapeSingleQuotes(this.clientNum))
                                  OR (RecordType.DeveloperName = 'Loan_Asset'  AND Loan_Number__c = : String.escapeSingleQuotes(this.clientNum))
                                  OR (RecordType.DeveloperName = 'Policy_Asset'  AND Policy_Number__c = : String.escapeSingleQuotes(this.clientNum))
                    ]; 

            System.debug(assetList);

            if(assetList.isEmpty())
                return null;
            else
                return assetList[0];
        }


        public boolean recordFailedAttemptAndLock()
        {
            Contact objCon = getContactByBusinessPartnerID();
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
            List<contact> contactList = [select ID, Portal_User_Is_Registered__c, Email, Portal_User_ID__c, 
                Portal_User_Name__c, MailingPostalCode, Birthdate, Business_Partner_ID__c 
                from Contact 
                where Portal_User_Name__c = : String.escapeSingleQuotes(this.userName) limit 1];
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
        

    }
    
}