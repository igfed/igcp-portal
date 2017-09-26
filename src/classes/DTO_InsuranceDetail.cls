public class DTO_InsuranceDetail {

	@AuraEnabled public String clientBpid;
	@AuraEnabled public String clientNumber;
	@AuraEnabled public String consultantNumber;
	@AuraEnabled public String insuranceType;
	@AuraEnabled public String policyStatus;
	@AuraEnabled public String policyType;
	@AuraEnabled public String policyNumber;
	@AuraEnabled public String carrier;
	@AuraEnabled public String company;
	@AuraEnabled public String insured;
	@AuraEnabled public String policyOwner;
	@AuraEnabled public String beneficiary;
	@AuraEnabled public String issueDate;
	@AuraEnabled public String renewalDate;
	@AuraEnabled public String planType;
	@AuraEnabled public String coverageAmount;
	@AuraEnabled public String coverageCeaseDate;
	@AuraEnabled public String benefitAmount;
	@AuraEnabled public String benefitFrequency;
	@AuraEnabled public String waitingPeriod;
	@AuraEnabled public String benefitPeriod;
	@AuraEnabled public String benefitTaxable;
	@AuraEnabled public String occupationClassification;
	@AuraEnabled public String occupationDefinition;
	@AuraEnabled public String homeCare;
	@AuraEnabled public String familyCareAmount;
	@AuraEnabled public String familyCareFrequency;
	@AuraEnabled public String premiumAmount;
	@AuraEnabled public String premiumFrequency;
	@AuraEnabled public String payer;
	@AuraEnabled public String expiryDate;
		
	public DTO_InsuranceDetail(IGInsuranceClient.Insurance source) {
		this.clientBpid 				= source.CLIENT_BPID;
		this.clientNumber 				= source.CLIENT_NUMBER;
		this.consultantNumber 			= source.CONSULTANT_NUMBER;
		this.insuranceType 				= source.INSURANCE_TYPE;
		this.policyStatus 				= source.POLICY_STATUS;
		this.policyType 				= source.POLICY_TYPE;
		this.policyNumber 				= source.POLICY_NUMBER;
		this.carrier 					= source.CARRIER;
		this.company 					= source.COMPANY;
		this.insured 					= source.INSURED;
		this.policyOwner 				= source.POLICY_OWNER;
		this.beneficiary 				= source.BENEFICIARY;
		this.issueDate 					= source.ISSUE_DATE;
		this.renewalDate 				= source.RENEWAL_DATE;
		this.planType 					= source.PLAN_TYPE;
		this.coverageAmount 			= source.COVERAGE_AMOUNT;
		this.coverageCeaseDate 			= source.COVERAGE_CEASE_DATE;
		this.benefitAmount 				= source.BENEFIT_AMOUNT;
		this.benefitFrequency 			= source.BENEFIT_FREQUENCY;
		this.waitingPeriod 				= source.WAITING_PERIOD;
		this.benefitPeriod 				= source.BENEFIT_PERIOD;
		this.benefitTaxable 			= source.BENEFIT_TAXABLE;
		this.occupationClassification 	= source.OCCUPATION_CLASSIFICATION;
		this.occupationDefinition 		= source.OCCUPATION_DEFINITION;
		this.homeCare 					= source.HOME_CARE;
		this.familyCareAmount 			= source.FAMILY_CARE_AMOUNT;
		this.familyCareFrequency 		= source.FAMILY_CARE_FREQUENCY;
		this.premiumAmount 				= source.PREMIUM_AMOUNT;
		this.premiumFrequency 			= source.PREMIUM_FREQUENCY;
		this.payer 						= source.PAYER;
		this.expiryDate 				= source.EXPIRY_DATE;
	}
}