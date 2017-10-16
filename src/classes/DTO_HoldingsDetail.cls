public with sharing class DTO_HoldingsDetail {

	@AuraEnabled public String clientBpid;
	@AuraEnabled public String clientNumber;
	@AuraEnabled public String accountNumber;
	@AuraEnabled public String holdingNumber;
	@AuraEnabled public String consultantNumber;
	@AuraEnabled public String company;
	@AuraEnabled public String fundNumber;
	@AuraEnabled public String productName;
	@AuraEnabled public String loadType;
	@AuraEnabled public String series;
	@AuraEnabled public String marketValueCad;
	@AuraEnabled public String bookCostCad;
	@AuraEnabled public String gainLossCad;
	@AuraEnabled public String settledUnits;
	@AuraEnabled public String calcPrice;
	@AuraEnabled public String reportingDate;
	@AuraEnabled public String asOfDate;
	@AuraEnabled public String purchaseDate;
	@AuraEnabled public String netContributions;
	@AuraEnabled public String totalContributedAmount;
	@AuraEnabled public String totalRedeemedAmount;
	@AuraEnabled public String totalDistributedAmount;
	@AuraEnabled public String totalReinvestedAmount;
	@AuraEnabled public String netContributionsYtd;
	@AuraEnabled public String netWithdrawalsYtd;
	@AuraEnabled public String netTransfersInYtd;
	@AuraEnabled public String netTransfersOutYtd;
	@AuraEnabled public String netContributionsInception;
	@AuraEnabled public String netWithdrawalsInception;
	@AuraEnabled public String netTransfersInInception;
	@AuraEnabled public String netTransfersOutInception;

	public DTO_HoldingsDetail(IGHoldingsClient.Holding source) {
		this.clientBpid 				= source.CLIENT_BPID;
		this.clientNumber 				= source.CLIENT_NUMBER;
		this.accountNumber 				= source.ACCOUNT_NUMBER;
		this.holdingNumber 				= source.HOLDING_NUMBER;
		this.consultantNumber 			= source.CONSULTANT_NUMBER;
		this.company 					= source.COMPANY;
		this.fundNumber 				= source.FUND_NUMBER;
		this.productName 				= source.PRODUCT_NAME;
		this.loadType 					= source.LOAD_TYPE;
		this.series 					= source.SERIES;
		this.marketValueCad 			= source.MARKET_VALUE_CAD;
		this.bookCostCad 				= source.BOOK_COST_CAD;
		this.gainLossCad 				= source.GAIN_LOSS_CAD;
		this.settledUnits 				= source.SETTLED_UNITS;
		this.calcPrice 					= source.CALC_PRICE;
		this.reportingDate 				= source.REPORTING_DATE;
		this.asOfDate 					= source.AS_OF_DATE;
		this.purchaseDate 				= source.PURCHASE_DATE;
		this.netContributions 			= source.NET_CONTRIBUTIONS;
		this.totalContributedAmount 	= source.TOTAL_CONTRIBUTED_AMOUNT;
		this.totalRedeemedAmount 		= source.TOTAL_REDEEMED_AMOUNT;
		this.totalDistributedAmount 	= source.TOTAL_DISTRIBUTED_AMOUNT;
		this.totalReinvestedAmount 		= source.TOTAL_REINVESTED_AMOUNT;
		this.netContributionsYtd 		= source.NET_CONTRIBUTIONS_YTD;
		this.netWithdrawalsYtd 			= source.NET_WITHDRAWALS_YTD;
		this.netTransfersInYtd 			= source.NET_TRANSFERS_IN_YTD;
		this.netTransfersOutYtd 		= source.NET_TRANSFERS_OUT_YTD;
		this.netContributionsInception 	= source.NET_CONTRIBUTIONS_INCEPTION;
		this.netWithdrawalsInception 	= source.NET_WITHDRAWALS_INCEPTION;
		this.netTransfersInInception 	= source.NET_TRANSFERS_IN_INCEPTION;
		this.netTransfersOutInception 	= source.NET_TRANSFERS_OUT_INCEPTION;
	}
}