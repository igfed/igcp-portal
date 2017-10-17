public class DTO_InstructionsDetail {
	@AuraEnabled public String clientBpid;
	@AuraEnabled public String clientNumber;
	@AuraEnabled public String accountNumber;
	@AuraEnabled public String accountType;
	@AuraEnabled public String accountTypeLabel;
	@AuraEnabled public String holdingNumber;
	@AuraEnabled public String holdingName;
	@AuraEnabled public String instructionType;
	@AuraEnabled public String instructionTypeLabel;
	@AuraEnabled public String frequency;
	@AuraEnabled public String netAmountCad;
	@AuraEnabled public String grossAmountCad;
	@AuraEnabled public String nextTransactionDate;
	@AuraEnabled public String startDate;
	@AuraEnabled public String endDate;

	public DTO_InstructionsDetail(IGInstructionsClient.Instructions source) {
		this.clientBpid 			= source.CLIENT_BPID;
		this.clientNumber 			= source.CLIENT_NUMBER;
		this.accountNumber 			= source.ACCOUNT_NUMBER;
		this.accountType 			= source.ACCOUNT_TYPE;
		this.accountTypeLabel 		= source.ACCOUNT_TYPE_LABEL;
		this.holdingNumber 			= source.HOLDING_NUMBER;
		this.holdingName 			= source.HOLDING_NAME;
		this.instructionType 		= source.INSTRUCTION_TYPE;
		this.instructionTypeLabel 	= source.INSTRUCTION_TYPE_LABEL;
		this.frequency 				= source.FREQUENCY;
		this.netAmountCad 			= source.NET_AMOUNT_CAD;
		this.grossAmountCad 		= source.GROSS_AMOUNT_CAD;
		this.nextTransactionDate 	= source.NEXT_TRANSACTION_DATE;
		this.startDate 				= source.START_DATE;
		this.endDate 				= source.END_DATE;
	}
}