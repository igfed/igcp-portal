public class DTO_TransactionsDetail {
	@AuraEnabled public String 	clientBpid;
	@AuraEnabled public String 	clientNumber;
	@AuraEnabled public String 	accountNumber;
	@AuraEnabled public String 	accountType;
	@AuraEnabled public String 	accountTypeLabel;
	@AuraEnabled public String 	holdingNumber;
	@AuraEnabled public String 	holdingName;
	@AuraEnabled public String 	sourceSystem;
	@AuraEnabled public String 	transactionDate;
	@AuraEnabled public String 	activity;
	@AuraEnabled public Double 	unitPrice;
	@AuraEnabled public Integer units;
	@AuraEnabled public Double 	netAmount;
	@AuraEnabled public Double 	transactionCharge;
	@AuraEnabled public Double 	taxes;
	@AuraEnabled public Double 	grossAmount;
	@AuraEnabled public String 	currencyCd;
	@AuraEnabled public Double 	exchangeRate;

	public DTO_TransactionsDetail(IGTransactionsClient.Transactions source) {
		this.clientBpid = source.CLIENT_BPID;
		this.clientNumber = source.CLIENT_NUMBER;
		this.accountNumber = source.ACCOUNT_NUMBER;
		this.accountType = source.ACCOUNT_TYPE;
		this.accountTypeLabel = source.ACCOUNT_TYPE_LABEL;
		this.holdingNumber = source.HOLDING_NUMBER;
		this.holdingName = source.HOLDING_NAME;
		this.sourceSystem = source.SOURCE_SYSTEM;
		this.transactionDate = source.TRANSACTION_DATE;
		this.activity = source.ACTIVITY;
		this.unitPrice = source.UNIT_PRICE;
		this.units = source.UNITS;
		this.netAmount = source.NET_AMOUNT;
		this.transactionCharge = source.TRANSACTION_CHARGE;
		this.taxes = source.TAXES;
		this.grossAmount = source.GROSS_AMOUNT;
		this.currencyCd = source.CURRENCY_X;
		this.exchangeRate = source.EXCHANGE_RATE;
	}
}