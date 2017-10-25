public class DTO_AccountPerformance {
	@AuraEnabled public String clientBpid;
	@AuraEnabled public String clientNumber;
	@AuraEnabled public String accountNumber;
	@AuraEnabled public String openingValueYtd;
	@AuraEnabled public String closingValueYtd;
	@AuraEnabled public String startingYtd;
	@AuraEnabled public String openingValue1Yr;
	@AuraEnabled public String closingValue1Yr;
	@AuraEnabled public String starting1Yr;
	@AuraEnabled public String openingValue3Yr;
	@AuraEnabled public String closingValue3Yr;
	@AuraEnabled public String starting3Yr;
	@AuraEnabled public String openingValue5Yr;
	@AuraEnabled public String closingValue5Yr;
	@AuraEnabled public String starting5Yr;
	@AuraEnabled public String openingValueInception;
	@AuraEnabled public String closingValueInception;
	@AuraEnabled public String startingInception;

	public DTO_AccountPerformance(IGAccountPerformanceClient.AccountPerformance source) {
		this.clientBpid 			= source.CLIENT_BPID;
		this.clientNumber 			= source.CLIENT_NUMBER;
		this.accountNumber 			= source.ACCOUNT_NUMBER;
		this.openingValueYtd 		= source.OPENING_VALUE_YTD;
		this.closingValueYtd 		= source.CLOSING_VALUE_YTD;
		this.startingYtd 			= source.STARTING_YTD;
		this.openingValue1Yr 		= source.OPENING_VALUE_1YR;
		this.closingValue1Yr 		= source.CLOSING_VALUE_1YR;
		this.starting1Yr 			= source.STARTING_1YR;
		this.openingValue3Yr 		= source.OPENING_VALUE_3YR;
		this.closingValue3Yr 		= source.CLOSING_VALUE_3YR;
		this.starting3Yr 			= source.STARTING_3YR;
		this.openingValue5Yr 		= source.OPENING_VALUE_5YR;
		this.closingValue5Yr 		= source.CLOSING_VALUE_5YR;
		this.starting5Yr 			= source.STARTING_5YR;
		this.openingValueInception 	= source.OPENING_VALUE_INCEPTION;
		this.closingValueInception 	= source.CLOSING_VALUE_INCEPTION;
		this.startingInception 		= source.STARTING_INCEPTION;
	}
}