({
    doInit : function(component, event, helper) {
        var langCode = $A.get("$Locale.language");
        if (langCode == 'en')langCode = 'en_US';

        helper.callServer(component, "c.getPageHeader", function(response) { 
            var rendering = JSON.parse(response).rendering;
            var siteUrl = JSON.parse(response).siteUrl;
            var el = document.createElement( 'div' );
            el.innerHTML = rendering;
            var logoURL = el.getElementsByClassName('page-header-logo')[0].innerHTML;
            component.set('v.logoURL', siteUrl + logoURL);
            var backgroundURL = el.getElementsByClassName('page-header-background')[0].innerHTML;
            component.set('v.backgroundURL', siteUrl + backgroundURL);
            var backgroundColour = el.getElementsByClassName('page-header-background-color')[0].innerHTML;
            component.set('v.backgroundColour', backgroundColour);
            component.set('v.backToHome', siteUrl);

            var styleString = '';
            if (backgroundColour) {
                styleString += 'background-color: ' + backgroundColour + '; ';
            }
            if (backgroundURL) {
                styleString += 'background-image:url(' + siteUrl + backgroundURL + '); ';
            }
            component.set('v.styleString', styleString);

        }, {'langCode': langCode });

    }
})