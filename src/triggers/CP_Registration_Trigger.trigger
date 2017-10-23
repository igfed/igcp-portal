trigger CP_Registration_Trigger on Contact (after update) {

    List<Contact> newlyRegisteredContacts = new List<Contact>();
    
    for(Contact c: Trigger.New)
    {
        if(Trigger.oldMap.get(c.Id).Portal_User_Is_Registered__c == false && c.Portal_User_Is_Registered__c == true)
        {
            newlyRegisteredContacts.add(c);
        }
    }
    
    //query on template object
    EmailTemplate et=[Select id from EmailTemplate where DeveloperName =:'TEST_New_Registration_Email'];

    //list of emails
    List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();
    
    for(Contact newReg : newlyRegisteredContacts)
    {
        //initiallize messaging method
        Messaging.SingleEmailMessage singleMail = new Messaging.SingleEmailMessage();
        
        //set object Id
        singleMail.setTargetObjectId(newReg.Id);
        
        //set template Id
        singleMail.setTemplateId(et.Id);
        
        //flag to false to stop inserting activity history
        singleMail.setSaveAsActivity(false);
        
        //add mail
        emails.add(singleMail);
        
        //This will not send email to contact  
        //emails.setTreatTargetObjectAsRecipient(false);
    }
    
    //send mail
    Messaging.sendEmail(emails);
    
}