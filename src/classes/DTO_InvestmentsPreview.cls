public class DTO_InvestmentsPreview {
	@AuraEnabled public Double totalValue;
	@AuraEnabled public Double totalGainLoss;
	@AuraEnabled public Double percGainLoss;
	@AuraEnabled public String signGainLoss; //neutral, positive, negative
	@AuraEnabled public Map<String, DTO_InvestmentsPreviewAggregate> previewAggregatesByType;
	@AuraEnabled public Map<String, Map<String, DTO_InvestmentsPreviewAggregate>> previewAggregatesByTypeAndReg;

	public DTO_InvestmentsPreview() {
		this.totalValue 	= 0;
		this.totalGainLoss 	= 0;
		this.percGainLoss 	= 0;
		this.signGainLoss	= 'neutral';
		this.previewAggregatesByType = new Map<String, DTO_InvestmentsPreviewAggregate>();
		this.previewAggregatesByTypeAndReg = new Map<String, Map<String, DTO_InvestmentsPreviewAggregate>>();
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

			String theRegKey = ('Y' == item.registrationType ? 'REGISTERED' : 'NON-REGISTERED');
			Map<String, DTO_InvestmentsPreviewAggregate> theDealerMap = previewAggregatesByTypeAndReg.get(dealerName);
			if (theDealerMap == null) {
				theDealerMap = new Map<String, DTO_InvestmentsPreviewAggregate>();
				previewAggregatesByTypeAndReg.put(dealerName, theDealerMap);
			}
			DTO_InvestmentsPreviewAggregate aggregate2 = theDealerMap.get(theRegKey);
			if (aggregate2 == null) {
				aggregate2 = new DTO_InvestmentsPreviewAggregate(dealerName);
				theDealerMap.put(theRegKey, aggregate2);
			}
			aggregate2.addPreviewItem(item);

			totalValue += (item.marketValue != null ? item.marketValue : 0);
			totalGainLoss += (item.gainLoss != null ? item.gainLoss : 0);
			if (totalGainLoss == 0)
				signGainLoss = 'neutral';
			else if (totalGainLoss > 0)
				signGainLoss = 'positive';
			else if (totalGainLoss < 0)
				signGainLoss = 'negative';
			if (totalValue != 0) {
				Decimal decTotalValue = Decimal.valueOf(totalValue);
				Decimal decTotalGainLoss = Decimal.valueOf(totalGainLoss);
				Decimal result = decTotalGainLoss.divide(decTotalValue, 4);
				result = result.setScale(2);
				percGainLoss = result.doubleValue();
			}
		}
	}
}