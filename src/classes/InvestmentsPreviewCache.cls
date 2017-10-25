public class InvestmentsPreviewCache implements Cache.CacheBuilder {
	public DTO_InvestmentsPreview previewDTO;
	public Set<String> accountNumbers;

	public InvestmentsPreviewCache(DTO_InvestmentsPreview in_previewDTO) {
		this.previewDTO = in_previewDTO;
		this.accountNumbers = new Set<String>();
		if (in_previewDTO != null) {
			for (DTO_InvestmentsPreviewAggregate agg : in_previewDTO.previewAggregatesByType.values()) {
				for (DTO_InvestmentsPreviewItem item : agg.previewItems) {
					this.accountNumbers.add(item.accountNumber);
				}
			}
		}
	}

	public Object doLoad(String clientBPID) {
		DTO_InvestmentsPreview in_previewDTO = IGClientService.getInvestmentsPreview(clientBPID);
		return (new InvestmentsPreviewCache(in_previewDTO));
	}
}