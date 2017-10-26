public class EmailChangeController {

	/*
	steps:
	Before doing the following steps ISAM should get updated then salesforce records needs to be updated.
		1. get the old email address from SOQL
		2. compare new with old email address
		3. update the contact's new email address if the old is different
			else : dont change anything
		4. update the user objects email address as well(may need to put this operation in future method)

	*/
	@AuraEnabled
	public static void emailChange(String emailAddr){

		Id contId;
		//updateEmailISAM();
		updateContactEmail(emailAddr);
		updateUserEmail(contId);


	}
	private static void updateContactEmail(String emailAddress){
		List<Contact> contactToUse;
		Boolean toUpdate;
		Contact contactToUpdate;
		Id contextContactId;

		contactToUpdate = new Contact();
		contactToUse = new List<Contact>();
    	contactToUse = [select Id,Email, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
    	contactToUpdate = contactToUse.get(0);
    	toUpdate = false;
    	if(contactToUpdate.Email != emailAddress){
    		contactToUpdate.Email = emailAddress;
    		toUpdate = true;
    	}

    	if(toUpdate = true){
    		update contactToUpdate;
    	}

	}

	@future
	private static void updateUserEmail(Id userContactId){
		user userToUpdate = [SELECT Id, ContactId,username,email,Contact.AccountId,IsPortalEnabled,IsActive FROM User WHERE Contactid =: userContactId AND isActive = true];
	}
}