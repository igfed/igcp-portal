public with sharing class DTO_ClientRegistration {
	public String clientBpid;	
	public String clientType;	
	public String deceasedIndicator;
	public String unlocatedIndicator;
	public String activeInvestment;
	public String activeInsurance;
	public String activeMortgage;
	public String matchType;

	public DTO_ClientRegistration(IGClientRegistrationClient.RegistrationMatches source) {
		this.clientBpid 		= source.CLIENT_BPID;	
		this.clientType 		= source.CLIENT_TYPE;	
		this.deceasedIndicator 	= source.DECEASED_INDICATOR;
		this.unlocatedIndicator = source.UNLOCATED_INDICATOR;
		this.activeInvestment   = source.ACTIVE_INVESTMENT;
		this.activeInsurance    = source.ACTIVE_INSURANCE;
		this.activeMortgage     = source.ACTIVE_MORTGAGE;
		this.matchType 			= source.MATCH_TYPE;
	}
}