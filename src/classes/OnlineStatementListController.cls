public class OnlineStatementListController {

	private static Map<String,List<DTO_OnlineStatement>> mapYearStatement;//= new Map<String,List<DTO_OnlineStatement>>();

	public OnlineStatementListController(){

		//mapYearStatement = new Map<String,List<DTO_OnlineStatement>>();
		getOnlineList(getAllStatements());
	}
	/*
	@Auraenabled
	public static List<DTO_OnlineStatement> getOnlineStatementList(){
		List<Contact> contactToUse;
		List<DTO_OnlineStatement> rv = null;
		contactToUse = new List<Contact>();
		Id contextContactId;
        System.debug(UserInfo.getUserId());
    	contactToUse = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
    	System.debug(contactToUse);
    	//contextContactId = '0033D00000LKcwIQAT';//contactToUse.get(0).Id;
    	contextContactId =  contactToUse.get(0).Id;
    	IGOnlineStatementsList onlineStatementClient = new IGOnlineStatementsList();
    	rv = onlineStatementClient.getListOfStatements(contextContactId);
    	System.debug('rv '+rv);
		return rv;
	} */
	@Auraenabled
	public static List<DTO_OnlineStatement> getOnlineStatementListFilter(String filter){
		/*List<Contact> contactToUse;
		List<DTO_OnlineStatement> rv = null;
		contactToUse = new List<Contact>();
		Id contextContactId;
        System.debug(UserInfo.getUserId());
    	contactToUse = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
    	System.debug(contactToUse);*/
    	getOnlineList(getAllStatements());
    	if(filter == 'Last 4 quarters'){
    		Date todayDate = System.today();
    		return mapYearStatement.get(String.valueOf(todayDate.year()));
		}else {
			return mapYearStatement.get(filter);
		}


	}
	private static List<DTO_OnlineStatement> getAllStatements(){
		List<Contact> contactToUse;
		List<DTO_OnlineStatement> rv = null;
		contactToUse = new List<Contact>();
		Id contextContactId;
        System.debug(UserInfo.getUserId());
    	contactToUse = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
    	System.debug(contactToUse);
    	//contextContactId = '0033D00000LKcwIQAT';//contactToUse.get(0).Id;
    	contextContactId =  contactToUse.get(0).Id;
    	IGOnlineStatementsList onlineStatementClient = new IGOnlineStatementsList();
    	rv = onlineStatementClient.getListOfStatements(contextContactId);
    	System.debug('rv '+rv);
		return rv;

	}

	private static void getOnlineList(List<DTO_OnlineStatement> onlineStatementList){
		
		//statementDate
		String thisyear ='';
		Date todayDate = System.today();
		mapYearStatement = new Map<String,List<DTO_OnlineStatement>>();
	
		System.debug(mapYearStatement);
		for(DTO_OnlineStatement eachDTOStatement : onlineStatementList){
			String[] str = eachDTOStatement.statementDate.split(' ');
			if(mapYearStatement.containsKey(str[2])) {
				List<DTO_OnlineStatement> tempList = mapYearStatement.get(str[2]);
				tempList.add(eachDTOStatement);
				mapYearStatement.put(str[2],tempList);

			}else {
				List<DTO_OnlineStatement> tempList = new List<DTO_OnlineStatement>(); 
				tempList.add(eachDTOStatement);
				mapYearStatement.put(str[2],tempList);

			}

		}
	}
}