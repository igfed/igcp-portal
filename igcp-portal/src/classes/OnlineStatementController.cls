public class OnlineStatementController {
	

	
	private transient String cv;

	public OnlineStatementController(){
		String docId = Apexpages.CurrentPage().getParameters().get('docid');
		System.debug('doc id '+docId);
		if(docId != null || docId != ''){
			IGOnlineStatementCall statementObj = new IGOnlineStatementCall(docId);
			
			String res = statementObj.getPdfContent();
			cv = res;
		}
	}
	public String getFileContents(){
        if(null==cv) return 'No Content';
     	return cv;   
    }

	@Auraenabled
	public static void getOnlineStatement(String docId){
		IGOnlineStatementCall statementObj = new IGOnlineStatementCall(docId);
		statementObj.getPdfContent();
		

	}
}