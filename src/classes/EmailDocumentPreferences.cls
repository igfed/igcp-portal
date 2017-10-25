public with sharing class EmailDocumentPreferences {
	/*public List<EmailPrefResponse> documentPreferences;
	public Boolean allDocumentPreference;
	*/
	
	public Boolean allDocumentPreference;
		public List<EmailPrefResponse.DocumentPreferences> documentPreferences;
		public List<EmailPrefResponse.DocumentPreferencesLoan> documentPreferencesLoan;
		public List<EmailPrefResponse.DocumentPreferencesPolicy> documentPreferencesPolicy;
}