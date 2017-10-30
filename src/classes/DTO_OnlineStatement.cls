public class DTO_OnlineStatement {
	@AuraEnabled public String statementName;
	@AuraEnabled public String clientNumber;
	@AuraEnabled public String statementDate;
	@AuraEnabled public String docId;
	@AuraEnabled public String clientName;


	public DTO_OnlineStatement(IGOnlineStatementsList.ClientStatementResults src) {
		this.statementDate = src.statementdate;
		this.clientNumber = src.clientNumber;
		this.clientName = src.clientName;
		this.docId = src.docId;
		this.statementName = src.clientName + ' '+src.statementdate;
	}
<<<<<<< HEAD
	public DTO_OnlineStatement(){
		
	}
=======
>>>>>>> b8a8fe43d1187fe7fe241397066e2593fe661b68
}