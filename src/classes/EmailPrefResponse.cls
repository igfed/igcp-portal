public class EmailPrefResponse {

	/*public String clientNumber;
	public Boolean investmentStatements;
	public Boolean taxReceipts;
	public Boolean tradeConfirmation;*/
	
	public class DocumentPreferencesLoan {
		public String loanNumber;
		public Boolean mortgageDocument;
	}

	public class DocumentPreferences {
		public String clientNumber;
		public Boolean investmentStatements;
		public Boolean taxReceipts;
		public Boolean tradeConfirmation;
	}

	public class DocumentPreferencesPolicy {
		public String policyNumber;
		public Boolean policyDocument;
	}
	
}