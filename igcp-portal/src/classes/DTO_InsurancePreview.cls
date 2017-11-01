public class DTO_InsurancePreview {
	@AuraEnabled public Double totalCoverageAmount;
	@AuraEnabled public List<DTO_InsurancePreviewItem> previewItemsList;

	public DTO_InsurancePreview() {
		this.totalCoverageAmount = 0;
		this.previewItemsList = new List<DTO_InsurancePreviewItem>();
	}

	public void addPreviewItem(DTO_InsurancePreviewItem item) {
		previewItemsList.add(item);
		totalCoverageAmount += (item.coverageAmount != null ? item.coverageAmount : 0);
	}
}