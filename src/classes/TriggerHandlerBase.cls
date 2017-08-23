public abstract class TriggerHandlerBase {
	public TriggerHandlerBase(){
    }

    /**
     *   Enum representing each of before/after CRUD events on Sobjects
     */
    public enum Evt 
    {
        afterdelete, afterinsert, afterundelete,
        afterupdate, beforedelete, beforeinsert, beforeupdate   
    }

    /*
     *   Simplistic handler to implement on any of the event. It doesn't require or enforces any pattern except the
     *   method name to be "handle()".
     */
    public interface TriggerHandler
    {
        void handle();          
    } 

    // Internal mapping of handlers
    Map<String, List<TriggerHandler>> eventHandlerMapping = new Map<String, List<TriggerHandler>>();

    /**
     *   Core API to bind handlers with events
     */
    public TriggerHandlerBase bind(Evt event, TriggerHandler eh)
    {
        List<TriggerHandler> handlers = eventHandlerMapping.get(event.name());
        if (handlers == null) 
        {
            handlers = new List<TriggerHandler>();
            eventHandlerMapping.put(event.name(), handlers);
        }
        handlers.add(eh);
        return this;
    }

    /**
     *   Invokes correct handlers as per the context of Trigger and available registered handlers
     */
    public void manage()
    {
        Evt ev = null;
        if(Trigger.isInsert && Trigger.isBefore)
        {
            ev = Evt.beforeinsert;
        }
        else if(Trigger.isInsert && Trigger.isAfter)
        {
            ev = Evt.afterinsert;
        }
        else if(Trigger.isUpdate && Trigger.isBefore)
        {
            ev = Evt.beforeupdate;
        }
        else if(Trigger.isUpdate && Trigger.isAfter)
        {
            ev = Evt.afterupdate;
        }
        else if(Trigger.isDelete && Trigger.isBefore)
        {
            ev = Evt.beforedelete;
        }
        else if(Trigger.isDelete && Trigger.isAfter)
        {
            ev = Evt.afterdelete;
        }
        else if(Trigger.isundelete)
        {
            ev = Evt.afterundelete;             
        }
        
        List<TriggerHandler> handlers = eventHandlerMapping.get(ev.name());
        
        if (handlers != null && ! handlers.isEmpty()) 
        {
            for (TriggerHandler h : handlers) 
            {
                h.handle();
            }
        }
    }
}