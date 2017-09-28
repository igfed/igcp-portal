public class DTO_InvestmentsPreview {
	@AuraEnabled public Double totalValue;
	@AuraEnabled public Double totalGainLoss;
	@AuraEnabled public Map<String, DTO_InvestmentsPreviewAggregate> previewAggregatesByType;

	public DTO_InvestmentsPreview() {
		this.totalValue = 0;
		this.totalGainLoss = 0;
		this.previewAggregatesByType = new Map<String, DTO_InvestmentsPreviewAggregate>();
	}
	/*
	public void addPreviewAggregate(DTO_InvestmentsPreviewAggregate aggregate) {

	}
	*/
	public void addPreviewItem(DTO_InvestmentsPreviewItem item) {
		String dealerName = item.dealerName;
		if (String.isNotBlank(dealerName)) {
			DTO_InvestmentsPreviewAggregate aggregate = previewAggregatesByType.get(dealerName);
			if (aggregate == null) {
				aggregate = new DTO_InvestmentsPreviewAggregate(dealerName);
				previewAggregatesByType.put(dealerName, aggregate);
			}
			aggregate.addPreviewItem(item);
			totalValue += (item.marketValue != null ? item.marketValue : 0);
			totalGainLoss += (item.gainLoss != null ? item.gainLoss : 0);
		}
	}
}