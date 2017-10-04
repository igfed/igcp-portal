global class CP_Utility {
	
	public static Boolean IsValidEmail(String email)
    {
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
        String postalCodeRegex_1 = '[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]';
        String postalCodeRegex_2 = '[a-zA-Z][0-9][a-zA-Z](-| |)[0-9][a-zA-Z][0-9]';
    
        System.debug(postalCode);

        Pattern MyPattern1 = Pattern.compile(postalCodeRegex_1);
        Matcher MyMatcher1 = MyPattern1.matcher(postalCode);

        Pattern MyPattern2 = Pattern.compile(postalCodeRegex_2);
        Matcher MyMatcher2 = MyPattern2.matcher(postalCode);

        if(MyMatcher1.matches() || MyMatcher2.matches())
            return true;
        else
            return false;
    }

    public static Boolean PostalCodeMatched(String codeEntered, String codeActual)
    {
        codeEntered = codeEntered.remove(' ').remove('-').toUpperCase();
        codeActual = codeActual.remove(' ').remove('-').toUpperCase();

        if(codeEntered == codeActual)
            return true;
        else
            return false;
    }

    public static Boolean ReEnteredPasswordMatched(String password, String rePassword)
    {
        if(password == rePassword)
            return true;
        else
            return false;
    }


}