public class DTO_InvestmentsPreviewItem {
	@AuraEnabled public String accountNumber;
	@AuraEnabled public String accountName;
	@AuraEnabled public Double marketValue;
	@AuraEnabled public Double gainLoss;
	@AuraEnabled public Double percGainLoss;
	@AuraEnabled public String dealerName;
	@AuraEnabled public String registrationType;
	@AuraEnabled public String signGainLoss; //neutral, positive, negative
	@AuraEnabled public String accountNumberEnc;
	@AuraEnabled public String clientNumber;

	public DTO_InvestmentsPreviewItem(String theAccountNumber, Double theMarketValue, Double theGainLoss, String theDealerName, 
				String theRegistrationType, String theClientNumber) {
		this.accountNumber 		= theAccountNumber;
		this.marketValue 		= theMarketValue;
		this.gainLoss 			= theGainLoss;
		this.dealerName			= theDealerName;
		this.registrationType 	= theRegistrationType;
		this.percGainLoss 		= calculateGainLossPerc(this.marketValue, this.gainLoss);
		this.signGainLoss		= determineSignGainLoss(this.gainLoss);
		this.accountNumberEnc 	= IGClientUtils.generateRandomString(64);
		this.clientNumber       = theClientNumber;
	}

	private Double calculateGainLossPerc(Double theValue, Double theGainLoss) {
		Double rv = null;
		if (theValue != null && theGainLoss != null) {
			Decimal decValue = Decimal.valueOf(theValue);
			Decimal decGainLoss = Decimal.valueOf(theGainLoss);
			if (decValue != 0) {
				Decimal result = decGainLoss.divide(decValue, 4);
				result = result.setScale(2);
				rv = result.doubleValue();
			}
		}
		return rv;
	}

	private String determineSignGainLoss(Double theGainLoss) {
		String rv = '';
		if (theGainLoss != null) {
			if (theGainLoss == 0)
				rv = 'neutral';
			else if (theGainLoss > 0)
				rv = 'positive';
			else if (theGainLoss < 0)
				rv = 'negative';
		}
		return rv;
	}
}