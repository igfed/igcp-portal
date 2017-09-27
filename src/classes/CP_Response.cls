public virtual class CP_Response {

	public Result State {get; set;}

	public CP_Response()
	{
		State = new Result();
	}

	public class Result
    {
        public Boolean IsValid{get; set;}
        public Boolean IsLocked{get; set;}
        public Boolean ServiceNotAvailable{get; set;}
        public list<String> Fields {get; set; }
        public list<String> Messages {get; set; }
        
        public Result()
        {
            this.IsValid = false;
            this.IsLocked = false;
            this.ServiceNotAvailable = false;
            this.Fields = new List<String>();
            this.Messages = new List<String>();
        }
    }


    public Boolean IsValidEmail(String email)
    {
        String emailRegex = '([a-zA-Z0-9_\\-\\.]+)@((\\[a-z]{1,3}\\.[a-z]{1,3}\\.[a-z]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})';
    
        Pattern MyPattern = Pattern.compile(emailRegex);
        Matcher MyMatcher = MyPattern.matcher(email);

        if(MyMatcher.matches())
            return true;
        else
            return false;
    }

}