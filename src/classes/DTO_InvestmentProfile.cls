public with sharing class DTO_InvestmentProfile {
	@AuraEnabled public String clientBpid;
	@AuraEnabled public String clientNumber;
	@AuraEnabled public String accountNumber;
	@AuraEnabled public String sourceSystem;
	@AuraEnabled public String investmentProfile;
	@AuraEnabled public String investmentObjective;
	@AuraEnabled public String riskTolerance;
	@AuraEnabled public String investmentTimeHorizon;
	@AuraEnabled public String accountStatusCode;

	public DTO_InvestmentProfile(IGInvestmentProfileClient.InvestmentProfile source) {
		this.clientBpid 			= source.CLIENT_BPID;
		this.clientNumber 			= source.CLIENT_NUMBER;
		this.accountNumber 			= source.ACCOUNT_NUMBER;
		this.sourceSystem 			= source.SOURCE_SYSTEM;
		this.investmentProfile 		= source.INVESTMENT_PROFILE;
		this.investmentObjective 	= source.INVESTMENT_OBJECTIVE;
		this.riskTolerance 			= source.RISK_TOLERANCE;
		this.investmentTimeHorizon 	= source.INVESTMENT_TIME_HORIZON;
		this.accountStatusCode 		= source.ACCOUNT_STATUS_CODE;
	}
}