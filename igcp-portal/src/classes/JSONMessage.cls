public class JSONMessage {

	public class ErrorMessage {
		public String type;
		public String message;
		public String stacktrace;
	}

	public class ErrorResponse extends AjaxResponse{
		public ErrorMessage error;

	}
	public class APIResponse extends AjaxResponse {

		public String responseObject;
		public String message;
	}
    public virtual class AjaxResponse {
    	public String type;
    	public DateTime timeNow;
		public Boolean isSuccess;

    }
}