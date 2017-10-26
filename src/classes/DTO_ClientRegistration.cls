public with sharing class DTO_ClientRegistration {
	public String clientBpid;	
	public String clientType;	
	public String deceasedIndicator;
	public String unlocatedIndicator;
	public String matchType;

	public DTO_ClientRegistration(IGClientRegistrationClient.RegistrationMatches source) {
		this.clientBpid 		= source.CLIENT_BPID;	
		this.clientType 		= source.CLIENT_TYPE;	
		this.deceasedIndicator 	= source.DECEASED_INDICATOR;
		this.unlocatedIndicator = source.UNLOCATED_INDICATOR;
		this.matchType 			= source.MATCH_TYPE;
	}
}