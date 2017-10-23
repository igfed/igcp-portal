public with sharing class DTO_OnlineStatement {
	@AuraEnabled public String statementName;
	@AuraEnabled public String clientNumber;
	@AuraEnabled public String statementDate;


	public DTO_OnlineStatement() {
		
	}
}