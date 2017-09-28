public class DTO_InsurancePreviewItem {
	@AuraEnabled public String insuranceType;
	@AuraEnabled public String policyType;
	@AuraEnabled public String policyNumber;
	@AuraEnabled public String companyCarrier;
	@AuraEnabled public Double coverageAmount;

	public DTO_InsurancePreviewItem(String theInsuranceType, String thePolicyType, String thePolicyNumber, String theCompanyCarrier, 
			Double theCoverageAmount) {
		this.insuranceType 	= theInsuranceType;
		this.policyType    	= thePolicyType;
		this.policyNumber  	= thePolicyNumber;
		this.companyCarrier = theCompanyCarrier;
		this.coverageAmount = theCoverageAmount;
	}
}