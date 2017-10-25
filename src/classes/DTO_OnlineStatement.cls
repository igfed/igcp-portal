public class DTO_OnlineStatement {
	@AuraEnabled public String statementName;
	@AuraEnabled public String clientNumber;
	@AuraEnabled public String statementDate;
	@AuraEnabled public String docId;


	public DTO_OnlineStatement(IGOnlineStatementsList.ClientStatementResults src) {
		this.statementDate = src.statementdate;
		this.clientNumber = src.clientNumber;
		
		this.docId = src.docId;
	}
}