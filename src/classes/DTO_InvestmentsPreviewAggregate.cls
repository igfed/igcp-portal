public class DTO_InvestmentsPreviewAggregate {
	@AuraEnabled public Double totalValue;
	@AuraEnabled public Double totalGainLoss;
	@AuraEnabled public String dealerName;
	@AuraEnabled public List<DTO_InvestmentsPreviewItem> previewItems;

	public DTO_InvestmentsPreviewAggregate() {
		this.totalValue = 0;
		this.totalGainLoss = 0;
		this.previewItems = new List<DTO_InvestmentsPreviewItem>();
	}

	public DTO_InvestmentsPreviewAggregate(String theDealerName) {
		this();
		this.dealerName = theDealerName;
	}

	public void addPreviewItem(DTO_InvestmentsPreviewItem item) {
		previewItems.add(item);
		totalValue    += (item.marketValue != null ? item.marketValue : 0);
		totalGainLoss += (item.gainLoss != null ? item.gainLoss : 0);
	}
}