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
            this.IsValid = true;
            this.IsLocked = false;
            this.ServiceNotAvailable = false;
            this.Fields = new List<String>();
            this.Messages = new List<String>();
        }
    }
}