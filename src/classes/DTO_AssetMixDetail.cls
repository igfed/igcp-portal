public class DTO_AssetMixDetail {
	@AuraEnabled public String clientBpid;
	@AuraEnabled public String clientNumber;
	@AuraEnabled public String accountNumber;
	@AuraEnabled public Double cashAmount;
	@AuraEnabled public Double fixedIncomeAmount;
	@AuraEnabled public Double balancedAmount;
	@AuraEnabled public Double equityAmount;
	@AuraEnabled public Double specialtyAmount;

	public DTO_AssetMixDetail(IGAssetMixClient.AssetMixes source) {
		this.clientBpid 		= source.CLIENT_BPID;
		this.clientNumber 		= source.CLIENT_NUMBER;
		this.accountNumber 		= source.ACCOUNT_NUMBER;
		this.cashAmount 		= source.CASH_AMOUNT;
		this.fixedIncomeAmount 	= source.FIXED_INCOME_AMOUNT;
		this.balancedAmount 	= source.BALANCED_AMOUNT;
		this.equityAmount 		= source.EQUITY_AMOUNT;
		this.specialtyAmount 	= source.SPECIALTY_AMOUNT;
	}
}