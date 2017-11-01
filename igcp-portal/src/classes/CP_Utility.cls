global class CP_Utility {
	
    public class UtilException extends Exception {}

	public static Boolean IsValidEmail(String email)
    {
        if(String.isBlank(email))
            return false;
            
        String emailRegex = '([a-zA-Z0-9_\\-\\.]+)@((\\[a-z]{1,3}\\.[a-z]{1,3}\\.[a-z]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})';
    
        Pattern MyPattern = Pattern.compile(emailRegex);
        Matcher MyMatcher = MyPattern.matcher(email);

        if(MyMatcher.matches())
            return true;
        else
            return false;
    }

    public static Boolean IsValidPhoneNumber(String phoneNumber)
    {
        if(String.isBlank(phoneNumber))
            return false;

        String thisPhoneNumber = phoneNumber.replace(' ','');
        
        String MyRegex = '\\+?1?[ .-]?\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})([ .-]?)([0-9]{4})';

        //String phoneRegex = '(/^(\\+?1-?)?(\\([2-9]([02-9]\\d|1[02-9])\\)|[2-9]([02-9]\\d|1[02-9]))-?[2-9]([02-9]\\d|1[02-9])-?\\d{4}$/)';
        //String phoneRegex = '^((\\+1)?\\s?\\(\\d{3}\\)\\s?\\d{3}\\-\\d{4})?$';

        Pattern MyPattern = Pattern.compile(MyRegex);
        Matcher MyMatcher = MyPattern.matcher(thisPhoneNumber);
        return MyMatcher.matches();

    }

    public static Boolean IsValidPostalCode(String postalCode)
    {
        if(String.isBlank(postalCode))
            return false;

        String postalCodeRegex_1 = '[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]';
        String postalCodeRegex_2 = '[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]';
        String postalCodeRegex_3 = '^\\d{5}(-\\d{4})?$';

        Pattern MyPattern1 = Pattern.compile(postalCodeRegex_1);
        Matcher MyMatcher1 = MyPattern1.matcher(postalCode);

        Pattern MyPattern2 = Pattern.compile(postalCodeRegex_2);
        Matcher MyMatcher2 = MyPattern2.matcher(postalCode);

        Pattern MyPattern3 = Pattern.compile(postalCodeRegex_3);
        Matcher MyMatcher3 = MyPattern3.matcher(postalCode);

        if(MyMatcher1.matches() || MyMatcher2.matches() || MyMatcher3.matches())
            return true;
        else
            return false;
    }

    public static Boolean PostalCodeMatched(String codeEntered, String codeActual)
    {
        if(String.isBlank(codeEntered) || String.isBlank(codeActual))
            return false;

        codeEntered = codeEntered.remove(' ').remove('-').toUpperCase();
        codeActual = codeActual.remove(' ').remove('-').toUpperCase();

        if(codeEntered == codeActual)
            return true;
        else
            return false;
    }

    public static Boolean ReEnteredPasswordMatched(String password, String rePassword)
    {
        if(String.isBlank(password) || String.isBlank(rePassword))
            return false;

        if(password == rePassword)
            return true;
        else
            return false;
    }


    //  -------------------------------------------------------------------------
    //  HELPER method: sendTemplatedEmail
    //  -------------------------------------------------------------------------
    public static void sendTemplatedEmail(String templateApiName, ID targetObjId, Id whatId) {
      //  templateApiName   must be API Name of an Email template
      //  targetObjId must be a Contact, User, Lead Id -- also used in merge fields of template recipient.xxxx
      //  whatId    must be an SObject that is used in the merge fields of the template relatedTo.xxxx
      
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();

        Id templateId;  
        try {
            templateId = [select id, name from EmailTemplate where developername = : templateApiName].id;
        }
        catch (Exception e) {
            throw new UtilException ('[U-03] Unable to locate EmailTemplate using name: ' + templateApiName + 
                                    ' refer to Setup | Communications Templates ' + templateApiName);
        }
        
        email.setTemplateId(templateId);

        email.setTargetObjectId(targetObjId);

        if(whatId != null)
            email.setWhatId(whatId);

        email.setSaveAsActivity(false); 

        try {
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
        }
        catch (EmailException e) {
            throw new UtilException('[U-02] sendTemplatedEmail error. ' + e.getMessage());
        }
    }  
}