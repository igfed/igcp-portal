public class DTO_AccountSummary {
	@AuraEnabled public String clientBpid;
	@AuraEnabled public String clientNumber;
	@AuraEnabled public String accountNumber;
	@AuraEnabled public String accountType;
	@AuraEnabled public String accountTypeLabel;
	@AuraEnabled public String consultantNumber;
	@AuraEnabled public String dealerNumber;
	@AuraEnabled public String dealerName;
	@AuraEnabled public String sourceSystem;
	@AuraEnabled public String registrationType;
	@AuraEnabled public Double marketValueCad;
	@AuraEnabled public Double bookCostCad;
	@AuraEnabled public Double gainLossCad;
	@AuraEnabled public Date   reportingDate;
	@AuraEnabled public Date   asOfDate;

	public DTO_AccountSummary(IGAccountSummaryClient.AccountSummary source) {
		this.clientBpid 		= source.CLIENT_BPID;
		this.clientNumber 		= source.CLIENT_NUMBER;
		this.accountNumber 		= source.ACCOUNT_NUMBER;
		this.accountType 		= source.ACCOUNT_TYPE;
		this.accountTypeLabel 	= source.ACCOUNT_TYPE_LABEL;
		this.consultantNumber 	= source.CONSULTANT_NUMBER;
		this.dealerNumber 		= source.DEALER_NUMBER;
		this.dealerName 		= source.DEALER_NAME;
		this.sourceSystem 		= source.SOURCE_SYSTEM;
		this.registrationType 	= source.REGISTRATION_TYPE;
		this.marketValueCad 	= source.MARKET_VALUE_CAD;
		this.bookCostCad 		= source.BOOK_COST_CAD;
		this.gainLossCad 		= source.GAIN_LOSS_CAD;
		this.reportingDate 		= source.REPORTING_DATE;
		this.asOfDate 			= source.AS_OF_DATE;
	}
}