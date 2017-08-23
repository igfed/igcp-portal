public with sharing class ec_LayoutHelper {

    public static String getResourceURL(String resourceName) {

        List<StaticResource> resourceList = [
                SELECT Name, NamespacePrefix, LastModifiedDate
                FROM StaticResource
                WHERE Name = :resourceName
        ];

        if (resourceList.size() == 1) {
            String namespace = resourceList[0].NamespacePrefix;
            String sitePrefix = Site.getPathPrefix();
            sitePrefix = sitePrefix.replace('/s', '');
            return sitePrefix + '/resource/'
                    + resourceList[0].LastModifiedDate.getTime() + '/'
                    + (namespace != null && namespace != '' ? namespace + '__' : '')
                    + resourceName;
        } else return '';
    }

}