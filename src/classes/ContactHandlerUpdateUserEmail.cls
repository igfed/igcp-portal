/**
	A trigger handler on the contact object
	keeps email in sync between the contact object and its portal user object
*/
public class ContactHandlerUpdateUserEmail implements TriggerHandlerBase.TriggerHandler {
	public ContactHandlerUpdateUserEmail() {
		
	}

	public void handle(){
		List<User> usersToUpdate = new List<User>();
		list<User> users = [select Id, Email, ContactId from user where ContactId in :Trigger.new and Contact.RecordType.DeveloperName='Portal_User'];
		if(!users.isEmpty()){
			for(User u : users){
				Contact c = (Contact)Trigger.newMap.get(u.ContactId);
				if(!String.isBlank(c.Email)){
					if(!c.Email.equalsIgnoreCase(u.email)){
						// contact email has been updated...sync with user email
						u.Email = c.Email;
						usersToUpdate.add(u);
					}
				}
			}
			if(!usersToUpdate.isEmpty()){
				update usersToUpdate;
			}
		}
	}
}