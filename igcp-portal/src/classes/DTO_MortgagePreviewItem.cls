public class DTO_MortgagePreviewItem {
	@AuraEnabled public String product;
	@AuraEnabled public String loanNumber;
	@AuraEnabled public String branchId;
	@AuraEnabled public Double interestRate;
	@AuraEnabled public Double loanBalance; 

	public DTO_MortgagePreviewItem(String theProduct, String theLoanNumber, String theBranchId, Double theInterestRate, Double theLoanBalance) {
		this.product 		= theProduct;
		this.loanNumber 	= theLoanNumber;
		this.branchId 		= theBranchId;
		this.interestRate 	= theInterestRate;
		this.loanBalance 	= theLoanBalance;
	}
}