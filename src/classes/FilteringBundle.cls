/**
 * Created by danuta on 2017-03-08.
 */

public virtual with sharing class FilteringBundle {
    public List<Filter> filters;
    public Map<Id,ContentBundle> contentBundles;
    public Map<Id,Integer> relevance;
    public Map<String, List<Id>> contentOrdering;
}