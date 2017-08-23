public class CP_RegistrationController {
    
    @AuraEnabled
    public static string StepOne(String payload)
    {
    	system.debug(payload);
        return '';
    }
    
    @AuraEnabled
	public static string  StepTwo(String UserName, String Password, String Email, Boolean OptIn, String MobilePhone, String SecQue1, String Ans1, String SecQue2, String Ans2, String SecQue3, String Ans3)
    {
        return '';
    }
    
	@AuraEnabled
	public static string  StepThree()
    {
        return '';
    }
    
}