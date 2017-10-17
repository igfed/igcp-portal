/**
    This class provides logic for inbound just-in-time provisioning of single sign-on portal users
    This JIT handler is used to provision community users into Salesforce using SAML assertion
    Internal Salesforce users (non-community users) are not provisionned with this JIT handler
    For a community user to be successfully provisionned, a user should:
    - has an existing Contact record in Salesforce with all required fields set
    - has successfully registered on the portal with the portal registration flow
    - has successfully authenticated to the configured IdP
*/
global class JITHandlerIGPortalUser implements Auth.SamlJitHandler {
  
  public class JITApplicationException extends Exception {}
  public class JITSystemException extends Exception {}

  public JITHandlerIGPortalUser(){
  }

 /**
 Interface methods
 */

    /**
        This method is called when a new user is attempting to access SFDC for the first time
        This method provisions a new portal/community user into SFDC
    */
    global User createUser(Id samlSsoProviderId, Id communityId, Id portalId,
        String federationIdentifier, Map<String, String> attributes, String assertion) {
        
        // only community users provisioning
        // no SFDC users should be provisioned currently
        if(String.isBlank(communityId)){
            System.debug('createUser - Non portal user. No community id found');
            throw new JITApplicationException('You do not have access to this system [1]. Please contact your administrator.'); 
        }

        User u = new User();
        handleJit(true, u, communityId, federationIdentifier, attributes, assertion);
        
        return u;
    }

    /**
        This method is called when an existing user is attempting to access SFDC
        This method updates portal/community user info in SFDC
    */
    global void updateUser(Id userId, Id samlSsoProviderId, Id communityId, Id portalId,
        String federationIdentifier, Map<String, String> attributes, String assertion) {
        
        // no community users access
        // only SFDC users can be provisioned currently
        if(String.isBlank(communityId)){
            System.debug('updateUser - Non portal user. No community id found');
            throw new JITApplicationException('You do not have access to this system [2]. Please contact your administrator.');
        }

        User u = [SELECT Id, ContactId FROM User WHERE Id=:userId];
        handleJit(false, u, communityId, federationIdentifier, attributes, assertion);
    }

/**
Internal methods
*/
    private void handleJit(boolean isCreate, User u, Id communityId, String federationIdentifier, Map<String, String> attributes, String assertion) {
        // no user updates at this time
        if(!isCreate) return;

        // find the contact corresponding to this user 
        List<Contact> cs = [SELECT 
                                Id, FirstName, LastName, Portal_User_ID__c,
                                Email, MobilePhone, JIT_Is_Provisionnable__c, 
                                JIT_User_Type__c, Preferred_Language__c, Portal_User_Is_Registered__c
                            FROM Contact
                                WHERE
                                    Portal_User_Name__c = :federationIdentifier
                            ];

        // if no contact is found, user should not have access.
        if(cs.isEmpty()){
            System.debug('handleJit - No contact found with portal user id [' + federationIdentifier + ']');
            throw new JITApplicationException('Access denied. You do not have access to this system [3]. Please contact your administrator');
        } 
        // if there is more than one contact with the same id, it is an error. This should never happen unless there was a bug during registration 
        if(cs.size()>1){
            System.debug('handleJit - Multiple contacts found with portal user id [' + federationIdentifier + ']');
            throw new JITSystemException('Data error. Multiple contacts found with the same user id');
        }

        Contact c = cs.get(0);
        // user must be provisionnable to access the system
        if(!c.JIT_Is_Provisionnable__c){
            System.debug('handleJit - User with portal user id [' + federationIdentifier + '] is not JIT provisionnable');
            throw new JITApplicationException('Access denied. You do not have access to this system [4]. Please contact your administrator');
        }
        // user must register first before accessing the system
        if(!c.Portal_User_Is_Registered__c) {
            System.debug('handleJit - User with portal user id [' + federationIdentifier + '] has not registered on the portal');
            throw new JITApplicationException('You have not registred for access to this system [5]. Please contact your administrator');
        }
        // ensure that the contact is not already associated with a portal user...this can only happens if there was a bug or someone manually messed up the data
        List<User> existingUsers = [SELECT Id from User where ContactId=:c.Id];
        if(!existingUsers.isEmpty()){
            System.debug('handleJit - User with portal user id [' + federationIdentifier + '] is already associated with an existing portal user');
            throw new JITApplicationException('Access denied. You do not have access to this system [6]. Please contact your administrator');
        }

        // find the provisionning setting
        List<User_Provisioning_Setting__mdt> jitSettings = [SELECT
                                                                Label,
                                                                Default_LocaleSidKey__c, Default_EmailEncodingKey__c,
                                                                Default_LanguageLocaleKey__c, Default_TimeZoneSidKey__c,
                                                                User_Name_Suffix__c, User_Profile_Name__c,
                                                                User_Role_Name__c, User_Type__c
                                                            FROM User_Provisioning_Setting__mdt
                                                                WHERE
                                                                    User_Type__c = :c.JIT_User_Type__c
                                                            ];
        // there must be only one JIT configuration with the given name
        if(jitSettings.isEmpty()){
            System.debug('handleJit - Could not find JIT configuration custom meta data record for user type [' + c.JIT_User_Type__c + ']');
            throw new JITSystemException('Bad configuration. No JIT configuration found for user type [' + c.JIT_User_Type__c + ']');
        }
        if(jitSettings.size()>1){ 
            System.debug('handleJit - Found multiple JIT configuration custom meta data record for user type [' + c.JIT_User_Type__c + ']');
            throw new JITSystemException('Bad configuration. Multiple JIT configuration found for user type [' + c.JIT_User_Type__c + ']');
        }

        User_Provisioning_Setting__mdt jitSetting = jitSettings.get(0);

        // populate the user record
        String userName = this.getUserName(federationIdentifier, c, jitSetting);
        String userAlias = this.getUserAlias(federationIdentifier, c, jitSetting);
        String profileId = this.getProfileId(federationIdentifier, c, jitSetting);
        u.ContactId = c.Id;
        u.FirstName = c.FirstName;
        u.LastName = c.LastName;
        u.Email = c.Email;
        u.MobilePhone = c.MobilePhone;
        u.FederationIdentifier = federationIdentifier;
        u.UserName = userName;
        u.CommunityNickname = federationIdentifier;
        u.Alias = userAlias;
        u.ProfileId = profileId;
        u.PortalRole = jitSetting.User_Role_Name__c;
        u.LocaleSidKey = jitSetting.Default_LocaleSidKey__c;
        u.EmailEncodingKey = jitSetting.Default_EmailEncodingKey__c;
        u.LanguageLocaleKey = jitSetting.Default_LanguageLocaleKey__c;
        u.TimeZoneSidKey = jitSetting.Default_TimeZoneSidKey__c;

        System.debug('handleJit -JIT provisionning new user \r\n' + u);
    }

    private String getUserName(String federationIdentifier, Contact c, User_Provisioning_Setting__mdt jitSetting){
        String userNameSuffix = jitSetting.User_Name_Suffix__c;
        String userName = federationIdentifier;
        if(String.isBlank(userNameSuffix)){
            System.debug('getUserName - No user name suffix configured for JIT configuration custom meta data record [' + jitSetting.Label + ']'); 
            throw new JITSystemException('Bad configuration. No user name suffix configured for JIT configuration [' + jitSetting.Label + ']');
        }
        if(federationIdentifier.contains('@')){
            userName += '.' + userNameSuffix;
        }else{
            userName += '@' + userNameSuffix;
        }
        return userName;
    }

    private String getUserAlias(String federationIdentifier, Contact c, User_Provisioning_Setting__mdt jitSetting){
        String firstName = c.FirstName;
        String lastName = c.LastName;
        String alias = firstName;
        if(alias.length() > 7)
            alias = alias.substring(0, 7);
        alias += lastName.substring(0,1);
        return alias;
    }

    private ID getProfileId(String federationIdentifier, Contact c, User_Provisioning_Setting__mdt jitSetting){
        List<Profile> ps = [SELECT Id FROM Profile WHERE Name=:jitSetting.User_Profile_Name__c];
        if(ps.isEmpty()){ 
            System.debug('getUserName - Could not locate default profile [' + jitSetting.User_Profile_Name__c + '] for JIT configuration custom meta data record [' + jitSetting.Label + ']'); 
            throw new JITSystemException('Bad configuration. Bad user profile name configured for JIT configuration [' + jitSetting.Label + ']');
        }
        return ps.get(0).Id;
    }
}