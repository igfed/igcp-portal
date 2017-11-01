public with sharing class DTO_MortgagePreview {
	@AuraEnabled public Double totalLoanAmount;
	@AuraEnabled public List<DTO_MortgagePreviewItem> previewItemsList;

	public DTO_MortgagePreview() {
		this.totalLoanAmount  = 0;
		this.previewItemsList = new List<DTO_MortgagePreviewItem>();
	}

	public void addPreviewItem(DTO_MortgagePreviewItem item) {
		previewItemsList.add(item);
		totalLoanAmount += (item.loanBalance != null ? item.loanBalance : 0);
	}
}