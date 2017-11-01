public class DTO_AssetMixAggregate {
	@AuraEnabled public String 						clientBpid;
	@AuraEnabled public Double 						totalCashAmount;
	@AuraEnabled public Double 						totalFixedIncomeAmount;
	@AuraEnabled public Double 						totalBalancedAmount;
	@AuraEnabled public Double 						totalEquityAmount;
	@AuraEnabled public Double 						totalSpecialtyAmount;
	@AuraEnabled public Double 						totalAllAmounts;
	@AuraEnabled public List<DTO_AssetMixDetail> 	assetMixDetailList;

	public DTO_AssetMixAggregate(String theClientBpid) {
		this.clientBpid = theClientBpid;
		this.totalCashAmount 		= 0;
		this.totalFixedIncomeAmount = 0;
		this.totalBalancedAmount 	= 0;
		this.totalEquityAmount 		= 0;
		this.totalSpecialtyAmount 	= 0;
		this.totalAllAmounts 		= 0;
		this.assetMixDetailList 	= new List<DTO_AssetMixDetail>();
	}

	public void addAssetMixDetail(DTO_AssetMixDetail assetMixDetail) {
		this.assetMixDetailList.add(assetMixDetail);
		this.totalCashAmount 		+= (assetMixDetail.cashAmount 			!= null ? assetMixDetail.cashAmount 		: 0);
		this.totalFixedIncomeAmount += (assetMixDetail.fixedIncomeAmount 	!= null ? assetMixDetail.fixedIncomeAmount 	: 0);
		this.totalBalancedAmount 	+= (assetMixDetail.balancedAmount 		!= null ? assetMixDetail.balancedAmount 	: 0);
		this.totalEquityAmount 		+= (assetMixDetail.equityAmount 		!= null ? assetMixDetail.equityAmount 		: 0);
		this.totalSpecialtyAmount 	+= (assetMixDetail.specialtyAmount 		!= null ? assetMixDetail.specialtyAmount 	: 0);
		this.totalAllAmounts 		= this.totalCashAmount + this.totalFixedIncomeAmount + this.totalBalancedAmount + this.totalEquityAmount + 
										this.totalSpecialtyAmount;			
	}
}