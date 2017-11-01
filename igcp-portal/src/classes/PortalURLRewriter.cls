global class PortalURLRewriter implements Site.UrlRewriter {
    global PageReference mapRequestUrl(PageReference yourFriendlyUrl){
        system.debug('SHR1--Received URL ' + yourFriendlyUrl.getURL());
        PageReference pageRef = new PageReference('/registration');
        return pageRef; 
    }
    
    global PageReference[] generateUrlFor(PageReference[] yourSalesforceUrls){
        PageReference pageRef = mapRequestUrl(yourSalesforceUrls[0]);
        system.debug('SHR2--Received URL ' + pageRef.getURL());
        return new PageReference[] {pageRef};
    }
}