public class DTO_InvestmentsPreviewItem {
	@AuraEnabled public String accountName;
	@AuraEnabled public Double marketValue;
	@AuraEnabled public Double gainLoss;
	@AuraEnabled public String dealerName;

	public DTO_InvestmentsPreviewItem(String theAccountName, Double theMarketValue, Double theGainLoss, String theDealerName) {
		this.accountName 	= theAccountName;
		this.marketValue 	= theMarketValue;
		this.gainLoss 		= theGainLoss;
		this.dealerName		= theDealerName;
	}
}