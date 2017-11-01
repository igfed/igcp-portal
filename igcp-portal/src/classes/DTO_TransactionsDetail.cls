public class DTO_TransactionsDetail {
	@AuraEnabled public String clientBpid;
	@AuraEnabled public String clientNumber;
	@AuraEnabled public String accountNumber;
	@AuraEnabled public String accountType;
	@AuraEnabled public String accountTypeLabel;
	@AuraEnabled public String holdingNumber;
	@AuraEnabled public String holdingName;
	@AuraEnabled public String sourceSystem;
	@AuraEnabled public String transactionDate;
	//@AuraEnabled public String transactionType;
	//@AuraEnabled public String transactionTypeLabel;
	@AuraEnabled public String activity;
	@AuraEnabled public String unitPrice;
	@AuraEnabled public String units;
	@AuraEnabled public String netAmount;
	@AuraEnabled public String transactionCharge;
	@AuraEnabled public String taxes;
	@AuraEnabled public String grossAmount;
	@AuraEnabled public String currencyCd;
	@AuraEnabled public String exchangeRate;

	public DTO_TransactionsDetail(IGTransactionsClient.Transactions source) {
		this.clientBpid 			= source.CLIENT_BPID;
		this.clientNumber 			= source.CLIENT_NUMBER;
		this.accountNumber 			= source.ACCOUNT_NUMBER;
		this.accountType 			= source.ACCOUNT_TYPE;
		this.accountTypeLabel 		= source.ACCOUNT_TYPE_LABEL;
		this.holdingNumber 			= source.HOLDING_NUMBER;
		this.holdingName 			= source.HOLDING_NAME;
		this.sourceSystem 			= source.SOURCE_SYSTEM;
		this.transactionDate 		= source.TRANSACTION_DATE;
		//this.transactionType 		= source.TRANSACTION_TYPE;
		//this.transactionTypeLabel = source.TRANSACTION_TYPE_LABEL;
		this.activity				= source.ACTIVITY;
		this.unitPrice 				= source.UNIT_PRICE;
		this.units 					= source.UNITS;
		this.netAmount 				= source.NET_AMOUNT;
		this.transactionCharge 		= source.TRANSACTION_CHARGE;
		this.taxes 					= source.TAXES;
		this.grossAmount 			= source.GROSS_AMOUNT;
		this.currencyCd 			= source.CURRENCY_X;
		this.exchangeRate 			= source.EXCHANGE_RATE;		
	}
}