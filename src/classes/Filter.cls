/**
 * Created by danuta on 2017-03-06.
 */

public virtual with sharing class Filter {

        public String filterType;
        public String name;
        public Integer count;
        public List<FilterItem>children;

}