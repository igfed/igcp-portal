public class OnlineStatementController {
	

	@Auraenabled
	public static void getOnlineStatement(String docId){
		IGOnlineStatementCall statementObj = new IGOnlineStatementCall(docId);
		statementObj.getPdfContent();
		

	}
}