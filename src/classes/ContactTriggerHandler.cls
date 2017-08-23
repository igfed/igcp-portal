public class ContactTriggerHandler extends TriggerHandlerBase
{
    public ContactTriggerHandler(){
        TriggerHandler th = new ContactHandlerUpdateUserEmail();
        bind(Evt.afterupdate, th);
    }
}