public class MockDataUtils {
	private static Map<String, String> ACC_DETAILS_MOCK_DATA = new Map<String, String>{
		'CLIENT_BPID' => '1463916',
        'CLIENT_NUMBER' => '123456',
        'ACCOUNT_NUMBER' => '123456',
        'CONSULTANT_NUMBER' => '123456',
        'ACCOUNT_TYPE' => '12',
        'ACCOUNT_TYPE_LABEL' => 'RRSP',
        'REGISTRATION_TYPE' => 'GIF',
        'DEALER_NUMBER' => '7759',
        'DEALER_NAME' => 'IGS',
        'SOURCE_SYSTEM' => 'RBroker',
        'REPORTING_DATE' => '2017-09-01',
        'AS_OF_DATE' => '2017-09-01',
        'BALANCE_DATE' => '2017-09-01',
        'PURCHASE_DATE' => '2017-09-01',
        'MARKET_VALUE_CAD' => '181839.02',
        'BOOK_COST_CAD' => '181839.02',
        'GAIN_LOSS_CAD' => '839.02',
        'CANADIAN_INCOME' => '839.02',
        'FOREIGN_INCOME' => '839.02',
        'FIRST_60_DAY_CONTRIBUTION_AMOUNT' => '839.02',
        'LAST_10_MONTH_CONTRIBUTION_AMOUNT' => '839.02',
        'SUCCESSOR_HOLDER_NAME' => 'Successor Holder 1',
        'GROUP_SPONSOR_NAME' => 'Group Sponsor 1',
        'GROUP_SPONSOR_NUMBER' => '123456',
        'SPOUSAL_CONTRIBUTOR_NAME' => 'Name 1',
        'RRIF_MINIMUM_WITHDRAWAL_AMOUNT' => '839.02',
        'RRIF_YTD_WITHDRAWAL_AMOUNT' => '839.02',
        'RRIF_REQUESTED_PAYOUT_AMOUNT' => '839.02',
        'POLICY_NUMBER' => '123456',
        'JOINT_ANNUITANT_NAME' => 'Name 1',
        'LIFETIME_INCOME_AMOUNT' => '839.02',
        'LIB_MINIMUM_AMOUNT' => '839.02',
        'MATURITY_GUARANTEE_DATE' => '2017-09-01',
        'MATURITY_GUARANTEE_AMOUNT ' => '839.02',
        'DEATH_BENEFIT_GUARANTEE_AMOUNT ' => '839.02',
        'GUARANTEE_LEVEL' => '???',
        'YTD_CONTRIBUTION_AMOUNT' => '839.02',
        'CRA_PLAN_ID' => '???',
        'NET_CONTRIBUTIONS' => '181839.02',
        'TOTAL_CONTRIBUTED_AMOUNT' => '181839.02',
        'TOTAL_REDEEMED_AMOUNT' => '181839.02',
        'TOTAL_DISTRIBUTED_AMOUNT' => '181839.02',
        'TOTAL_REINVESTED_AMOUNT' => '181839.02',
        'NET_CONTRIBUTIONS_YTD' => '181839.02',
        'NET_WITHDRAWALS_YTD' => '181839.02',
        'NET_TRANSFERS_IN_YTD' => '181839.02',
        'NET_TRANSFERS_OUT_YTD' => '181839.02',
        'NET_CONTRIBUTIONS_INCEPTION' => '181839.02',
        'NET_WITHDRAWALS_INCEPTION' => '181839.02',
        'NET_TRANSFERS_IN_INCEPTION' => '181839.02',
        'NET_TRANSFERS_OUT_INCEPTION' => '181839.02',
        'BENEFICIARY_NAMES' => '',
        'IPROFILE_MODEL_NUMBER' => '',
        'CURRENCY_X' => 'CAD'
	};

	public static String getMockAccountDetailsData(String fieldName) {
		String rv = null;
		if (String.isNotBlank(fieldName) && X360_Data_Services__c.getOrgDefaults().Mock_Acc_Detail_Data__c) {
			rv = ACC_DETAILS_MOCK_DATA.get(fieldName);
		}
		return rv;
	}
}