/**
 * Created by danuta on 2017-04-11.
 */

public virtual with sharing class SocialBundle {

    public Id originId;

    // The id of the SocialData__c object that is associated with the content or page.
    public Id socialID;

    //The number of likes from the SocialData__c record.
    public Integer likes;

    //The number of views from the SocialData__c record.
    public Integer views;

    //My social activity likes/views
    public SocialActivity socialActivity;
}