public with sharing class IGClientProfileController {

	public IGClientProfile myProfile {get; set;}
	public boolean isPortalUser {get; private set;}

	public Contact myContact {get; set;}
    private Contact myContactOrg;

	private ApexPages.StandardController theController;

	public IGClientProfileController(ApexPages.StandardController controller) {
		this.theController = controller;
		this.isPortalUser = false;
        List<Contact> cs = [select 	Id, Business_Partner_ID__c, 
        							FirstName, LastName, 
        							Email, Other_Email__c, 
        							Phone, OtherPhone, MobilePhone,
        							MailingStreet, MailingCity,
        							MailingState, MailingPostalCode,
        							MailingCountry, Preferred_Language__c,
        							Preferred_Communication__c, Preferred_Destination__c,
        							Marketing_Email_Optout__c, eDeliver_Statements__c
        					from Contact 
        						where Id in (select ContactId from User where id=:UserInfo.getUserId())
        					];

        if(!cs.isEmpty()){
            this.myContact = cs.get(0);
            cloneContact();
            this.isPortalUser = true;
        }
	}

	public PageReference save(){
		try{
            if(String.isBlank(this.myContact.Email)){
                ApexPages.addMessage(new ApexPages.message(ApexPages.severity.ERROR, 'Email cannot be empty. Please provide a valid email.'));
                this.myContact = this.myContactOrg;
            }else{
                update this.myContact;  
                cloneContact();
                ApexPages.addMessage(new ApexPages.message(ApexPages.severity.CONFIRM, 'Changes saved successfully'));
            }
		}catch(Exception e){
			ApexPages.addMessage(new ApexPages.message(ApexPages.severity.ERROR, e.getMessage()));
		}
		return null;
	}

    public PageReference cancel(){
        this.myContact = this.myContactOrg;
        return null;
    }

    public void cloneContact(){
        this.myContactOrg = this.myContact.clone();
        this.myContactOrg.Id = this.myContact.Id;
    }
}