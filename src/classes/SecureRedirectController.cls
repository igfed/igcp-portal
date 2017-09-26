public class SecureRedirectController {

  public PageReference redirectToIdP(){
      String lang = ApexPages.currentPage().getParameters().get('language');
      
      PageReference pr = new PageReference('https://fitrp3-isam.investorsgroup.com/isam/sps/IGM-SAML20-SalesForce/saml20/login');
      Map<String, String> psold = ApexPages.currentPage().getParameters();
      Map<String, String> psnew = pr.getParameters();
      for(String pold : psold.keySet()){
         psnew.put(pold, psold.get(pold));
      }
      URL u = URL.getCurrentRequestUrl();
      //psnew.put('urldomain', URL.getSalesforceBaseUrl().toExternalForm());
      //psnew.put('urlcurrent', u.toExternalForm());
      psnew.put('urlhost', u.getHost());
      pr.setRedirect(true); 
      return pr; 
  }
}