public with sharing class IGClientDataController {
	public string bpid {get; private set;}
    public boolean isPortalUser {get; private set;}
    public IGClient.Data igData {get; private set;}
    public string selectedResourceName {get; set;}
    public boolean showAccounts {get; set;}
    public boolean showInsurances {get; set;}
    public boolean showMortgages {get; set;}
    public boolean showAccountsTable {get; set;}
    public boolean showInsurancesTable {get; set;}
    public boolean showMortgagesTable {get; set;}


    private IGClient igc;
    public IGClientDataController() {
        this.isPortalUser = false;
        List<Contact> cs = [select Id, Business_Partner_ID__c from Contact where Id in (select ContactId from User where id=:UserInfo.getUserId())];
        if(!cs.isEmpty()){
            this.bpid = cs.get(0).Business_Partner_ID__c;
            this.isPortalUser = true;
        }
        this.igc = new IGClient('IG_Client_Service');
        this.selectedResourceName = '<none>';  
    }

    public PageReference retrieveData(){
        this.igData = null;
        this.showAccounts = false;
        this.showInsurances = false;
        this.showMortgages = false;
        this.showAccountsTable = false;
        this.showInsurancesTable = false;
        this.showMortgagesTable = false;

        if(!isPortalUser){
            ApexPages.addMessage(new ApexPages.message(ApexPages.severity.ERROR,'You must be logged on as a portal user'));
            return null;    
        }
        if('<none>'.equals(this.selectedResourceName)) return null;
        
        try{
                IGClient.Response igres = igc.getCustomerDetails(this.bpid, selectedResourceName);
                handleResponse(igres);
            }catch(Exception e){
                ApexPages.addMessage(new ApexPages.message(ApexPages.severity.ERROR,'Unexpected error [' + e.getMessage() + ' (' + e.getStackTraceString() + ')]'));
            }
        return null; 
    }

    private void handleResponse(IGClient.Response igres){
        if(!igres.success){
            IGClient.Error igerr = (IGClient.Error)igres;
            ApexPages.addMessage(new ApexPages.message(ApexPages.severity.ERROR,'Error retrieving data [' + igerr.code + ', ' + igerr.error + ']'));
            return;
        }
        this.igData = (IGClient.Data)igres;
        if(this.selectedResourceName=='accounts'){
            this.igData.insurances = null;
            this.igData.mortgages = null;
            this.showAccounts = true;
        }else if(this.selectedResourceName=='insurances'){
            this.igData.accounts = null;
            this.igData.mortgages = null;
            this.showInsurances = true;
        }else if(this.selectedResourceName=='mortgages'){
            this.igData.accounts = null;
            this.igData.insurances = null;
            this.showMortgages = true;
        }else if(this.selectedResourceName=='all'){
            this.showAccounts = true;
            this.showInsurances = true;
            this.showMortgages = true;
        }
        this.showAccountsTable = (null==this.igData.accounts||this.igData.accounts.data.isEmpty())?false:true;
        this.showInsurancesTable = (null==this.igData.insurances||this.igData.insurances.data.isEmpty())?false:true;
        this.showMortgagesTable = (null==this.igData.mortgages||this.igData.mortgages.data.isEmpty())?false:true;
    }

    public List<SelectOption> getResourceNames(){
        List<SelectOption> resourceNames = new List<SelectOption>();
        resourceNames.add(new SelectOption('<none>', '<NONE>'));
        resourceNames.add(new SelectOption('accounts', 'Accounts'));
        resourceNames.add(new SelectOption('insurances', 'Insurances'));
        resourceNames.add(new SelectOption('mortgages', 'Mortgages'));
        resourceNames.add(new SelectOption('all', 'All Products'));
        return resourceNames;
    }

}